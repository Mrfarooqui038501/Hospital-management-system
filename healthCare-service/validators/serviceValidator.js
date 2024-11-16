const { body, header } = require('express-validator');
const { ValidationError } = require('../utils/errors');

const serviceValidationRules = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Service name is required')
    .isLength({ max: 100 })
    .withMessage('Service name cannot exceed 100 characters'),
  
  body('description')
    .trim()
    .notEmpty()
    .withMessage('Description is required')
    .isLength({ max: 500 })
    .withMessage('Description cannot exceed 500 characters'),
  
  body('price')
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),
  
  body('category')
    .trim()
    .notEmpty()
    .withMessage('Category is required')
    .isIn(['OPD', 'DENTAL', 'CARDIOLOGY', 'DERMATOLOGY', 'PEDIATRICS', 'OTHER'])
    .withMessage('Invalid category'),
  
  body('isAvailable')
    .optional()
    .isBoolean()
    .withMessage('isAvailable must be a boolean'),
  
  body('waitingTime')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Waiting time must be a positive integer')
];

exports.validateService = async (data) => {
  const errors = await Promise.all(serviceValidationRules.map(validation => validation.run(data)))
   const validationErrors = errors
    .filter(error => error.errors.length > 0)
    .map(error => error.errors[0]);
     
 

  return data;
};