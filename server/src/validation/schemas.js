// src/validation/schemas.js
import Joi from 'joi';

/**
 * Authentication Schemas
 */
export const registerSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .lowercase()
    .trim()
    .messages({
      'string.email': 'Please provide a valid email address',
      'any.required': 'Email is required'
    }),
  
  password: Joi.string()
    .min(8)
    .max(128)
    .required()
    .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)'))
    .messages({
      'string.min': 'Password must be at least 8 characters long',
      'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, and one number',
      'any.required': 'Password is required'
    }),
  
  role: Joi.string()
    .valid('admin', 'member')
    .required()
    .messages({
      'any.only': 'Role must be either admin or member',
      'any.required': 'Role is required'
    })
});

export const loginSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .lowercase()
    .trim()
    .messages({
      'string.email': 'Please provide a valid email address',
      'any.required': 'Email is required'
    }),
  
  password: Joi.string()
    .required()
    .messages({
      'any.required': 'Password is required'
    }),
  
  role: Joi.string()
    .valid('admin', 'member')
    .required()
    .messages({
      'any.only': 'Role must be either admin or member',
      'any.required': 'Role is required'
    })
});

/**
 * Project Schemas
 */
export const createProjectSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(200)
    .required()
    .trim()
    .messages({
      'string.min': 'Project name must be at least 3 characters',
      'string.max': 'Project name cannot exceed 200 characters',
      'any.required': 'Project name is required'
    }),
  
  description: Joi.string()
    .max(2000)
    .allow('', null)
    .trim()
    .messages({
      'string.max': 'Description cannot exceed 2000 characters'
    }),
  
  date: Joi.date()
    .iso()
    .min('now')
    .allow(null)
    .messages({
      'date.min': 'Project date cannot be in the past',
      'date.format': 'Please provide a valid date'
    }),
  
  location: Joi.string()
    .max(500)
    .allow('', null)
    .trim()
    .messages({
      'string.max': 'Location cannot exceed 500 characters'
    }),
  
  leader: Joi.string()
    .max(100)
    .allow('', null)
    .trim()
    .messages({
      'string.max': 'Leader name cannot exceed 100 characters'
    }),
  
  committee: Joi.string()
    .max(100)
    .allow('', null)
    .trim()
    .messages({
      'string.max': 'Committee name cannot exceed 100 characters'
    })
});

export const updateProjectSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(200)
    .trim()
    .messages({
      'string.min': 'Project name must be at least 3 characters',
      'string.max': 'Project name cannot exceed 200 characters'
    }),
  
  description: Joi.string()
    .max(2000)
    .allow('', null)
    .trim(),
  
  date: Joi.date()
    .iso()
    .allow(null),
  
  location: Joi.string()
    .max(500)
    .allow('', null)
    .trim(),
  
  leader: Joi.string()
    .max(100)
    .allow('', null)
    .trim(),
  
  committee: Joi.string()
    .max(100)
    .allow('', null)
    .trim(),
  
  status: Joi.string()
    .valid('active', 'inactive', 'finished', 'archived', 'trashed')
    .messages({
      'any.only': 'Invalid status value'
    })
}).min(1); // At least one field must be provided

/**
 * Task Schemas
 */
export const createTaskSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(200)
    .required()
    .trim()
    .messages({
      'string.min': 'Task name must be at least 3 characters',
      'string.max': 'Task name cannot exceed 200 characters',
      'any.required': 'Task name is required'
    }),
  
  description: Joi.string()
    .max(2000)
    .allow('', null)
    .trim()
    .messages({
      'string.max': 'Description cannot exceed 2000 characters'
    }),
  
  status: Joi.string()
    .valid('todo', 'in-progress', 'finished')
    .default('todo')
    .messages({
      'any.only': 'Status must be one of: todo, in-progress, finished'
    }),
  
  priority: Joi.string()
    .valid('High', 'Medium', 'Low')
    .default('Medium')
    .messages({
      'any.only': 'Priority must be one of: High, Medium, Low'
    }),
  
  committee: Joi.string()
    .max(100)
    .allow('', null)
    .trim(),
  
  dueDate: Joi.date()
    .iso()
    .allow(null)
    .messages({
      'date.format': 'Please provide a valid due date'
    }),
  
  link: Joi.string()
    .uri()
    .max(500)
    .allow('', null)
    .trim()
    .messages({
      'string.uri': 'Please provide a valid URL',
      'string.max': 'Link cannot exceed 500 characters'
    }),
  
  project: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .required()
    .messages({
      'string.pattern.base': 'Invalid project ID format',
      'any.required': 'Project ID is required'
    }),
  
  assignedTo: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .allow(null)
    .messages({
      'string.pattern.base': 'Invalid user ID format'
    })
});

export const updateTaskSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(200)
    .trim(),
  
  description: Joi.string()
    .max(2000)
    .allow('', null)
    .trim(),
  
  status: Joi.string()
    .valid('todo', 'in-progress', 'finished'),
  
  priority: Joi.string()
    .valid('High', 'Medium', 'Low'),
  
  committee: Joi.string()
    .max(100)
    .allow('', null)
    .trim(),
  
  dueDate: Joi.date()
    .iso()
    .allow(null),
  
  link: Joi.string()
    .uri()
    .max(500)
    .allow('', null)
    .trim(),
  
  assignedTo: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .allow(null)
}).min(1); // At least one field must be provided