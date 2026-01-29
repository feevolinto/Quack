// src/controllers/authController.js
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import logger from "../config/logger.js";
import { catchAsync, AppError } from "../middleware/errorHandler.js";

/**
 * Generate JWT token
 */
const generateToken = (userId, role) => {
  return jwt.sign(
    { id: userId, role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE || '7d' }
  );
};

/**
 * REGISTER new user
 */
export const register = catchAsync(async (req, res, next) => {
  const { email, password, role } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({ email: email.toLowerCase() });
  if (existingUser) {
    logger.warn('Registration attempt with existing email', { email });
    return next(new AppError('Email already registered', 400));
  }

  // Hash password
  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await User.create({
    email: email.toLowerCase(),
    password: hashedPassword,
    role
  });

  logger.info('New user registered', { 
    userId: user._id, 
    email: user.email, 
    role: user.role 
  });

  // Generate token
  const token = generateToken(user._id, user.role);

  res.status(201).json({
    success: true,
    message: 'Registration successful',
    token,
    user: {
      id: user._id,
      email: user.email,
      role: user.role
    }
  });
});

/**
 * LOGIN user
 */
export const login = catchAsync(async (req, res, next) => {
  const { email, password, role } = req.body;

  // Find user by email
  const user = await User.findOne({ email: email.toLowerCase() });
  
  if (!user) {
    logger.warn('Login attempt with non-existent email', { email });
    return next(new AppError('Invalid email or password', 401));
  }

  // Check if role matches
  if (user.role !== role) {
    logger.warn('Login attempt with wrong role', { 
      email, 
      attemptedRole: role, 
      actualRole: user.role 
    });
    return next(new AppError(`This account is registered as ${user.role}, not ${role}`, 401));
  }

  // Verify password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  
  if (!isPasswordValid) {
    logger.warn('Login attempt with incorrect password', { email });
    return next(new AppError('Invalid email or password', 401));
  }

  logger.info('User logged in successfully', { 
    userId: user._id, 
    email: user.email, 
    role: user.role 
  });

  // Generate token
  const token = generateToken(user._id, user.role);

  res.status(200).json({
    success: true,
    message: 'Login successful',
    token,
    user: {
      id: user._id,
      email: user.email,
      role: user.role
    }
  });
});

/**
 * GET current user (verify token)
 */
export const getMe = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('-password');
  
  if (!user) {
    logger.warn('Token verification failed - user not found', { userId: req.user.id });
    return next(new AppError('User not found', 404));
  }

  res.status(200).json({
    success: true,
    user: {
      id: user._id,
      email: user.email,
      role: user.role
    }
  });
});