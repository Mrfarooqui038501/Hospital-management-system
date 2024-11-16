const logger = require('../config/logger');
const { CustomError } = require('../utils/errors');

const errorHandler = (err, req, res, next) => {
  logger.error(err.message, { stack: err.stack });

  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({
      error: {
        message: err.message,
        code: err.code
      }
    });
  }

  res.status(500).json({
    error: {
      message: 'Internal server error',
      code: 'INTERNAL_SERVER_ERROR'
    }
  });
};

module.exports = errorHandler;