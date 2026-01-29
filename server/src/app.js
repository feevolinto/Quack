// src/app.js
import express from "express";
import cors from "cors";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";
import rateLimit from "express-rate-limit";
import morgan from "morgan";
import logger from "./config/logger.js";
import errorHandler, { notFound } from "./middleware/errorHandler.js";

// Routes
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import boardRoutes from "./routes/board.routes.js";
import taskRoutes from "./routes/task.routes.js";
import projectRoutes from "./routes/project.routes.js";

const app = express();

// =====================================================
// SECURITY MIDDLEWARE
// =====================================================

// Set security HTTP headers
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
  crossOriginEmbedderPolicy: false
}));

// CORS configuration
const corsOptions = {
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Body parser - MUST come BEFORE mongoSanitize
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Data sanitization against NoSQL query injection - AFTER body parsers
app.use(mongoSanitize({
  onSanitize: ({ req, key }) => {
    logger.warn(`Request sanitized: ${key}`, { ip: req.ip });
  },
}));

// Data sanitization against XSS
app.use(xss());

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

// Apply rate limiting to all routes
app.use('/api/', limiter);

// Stricter rate limit for auth routes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 requests per 15 minutes
  message: 'Too many login attempts, please try again later.',
  skipSuccessfulRequests: true, // Don't count successful requests
});

// =====================================================
// LOGGING
// =====================================================

// HTTP request logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  // Custom morgan format for production
  app.use(morgan('combined', {
    stream: {
      write: (message) => logger.info(message.trim())
    }
  }));
}

// Request logging middleware
app.use((req, res, next) => {
  logger.info('Incoming request', {
    method: req.method,
    path: req.path,
    ip: req.ip,
    userAgent: req.get('user-agent')
  });
  next();
});

// =====================================================
// ROUTES
// =====================================================

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is healthy",
    timestamp: new Date().toISOString()
  });
});

// Test route
app.get("/test", (req, res) => {
  logger.info("TEST ROUTE HIT");
  res.json({ 
    success: true,
    message: "Server is working!" 
  });
});

// API routes
app.use("/api/auth", authLimiter, authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/boards", boardRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/projects", projectRoutes);

// =====================================================
// ERROR HANDLING
// =====================================================

// 404 handler
app.use(notFound);

// Global error handler
app.use(errorHandler);

// Unhandled promise rejection handler
process.on('unhandledRejection', (err) => {
  logger.error('Unhandled Promise Rejection', {
    message: err.message,
    stack: err.stack
  });
  
  if (process.env.NODE_ENV === 'production') {
    // In production, log and continue
    logger.error('Server continuing despite unhandled rejection');
  } else {
    // In development, crash to make issues obvious
    process.exit(1);
  }
});

// Uncaught exception handler
process.on('uncaughtException', (err) => {
  logger.error('Uncaught Exception', {
    message: err.message,
    stack: err.stack
  });
  
  // Always exit on uncaught exception
  process.exit(1);
});

export default app;