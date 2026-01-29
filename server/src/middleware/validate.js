// src/middleware/validate.js
import logger from '../config/logger.js';

/**
 * Validation middleware factory
 * @param {Object} schema - Joi schema to validate against
 * @returns {Function} Express middleware
 */
export const validate = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false, // Return all errors, not just the first one
      stripUnknown: true // Remove unknown fields
    });

    if (error) {
      const errors = error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message
      }));

      logger.warn('Validation failed', { 
        path: req.path, 
        errors,
        body: req.body 
      });

      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors
      });
    }

    // Replace req.body with validated and sanitized value
    req.body = value;
    next();
  };
};

/**
 * Validate MongoDB ObjectId
 */
export const validateObjectId = (paramName = 'id') => {
  return (req, res, next) => {
    const id = req.params[paramName];
    
    // MongoDB ObjectId is 24 hex characters
    if (!/^[0-9a-fA-F]{24}$/.test(id)) {
      logger.warn('Invalid ObjectId', { 
        path: req.path, 
        paramName,
        value: id 
      });
      
      return res.status(400).json({
        success: false,
        message: `Invalid ${paramName} format`
      });
    }
    
    next();
  };
};

export default validate;