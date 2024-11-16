class CustomError extends Error {
    constructor(message) {
      super(message);
      this.name = this.constructor.name;
    }
  }
  
  class NotFoundError extends CustomError {
    constructor(message = 'Resource not found') {
      super(message);
      this.statusCode = 404;
      this.code = 'NOT_FOUND';
    }
  }
  
  class ValidationError extends CustomError {
    constructor(message = 'Validation failed') {
      super(message);
      this.statusCode = 400;
      this.code = 'VALIDATION_ERROR';
    }
  }
  
  class UnauthorizedError extends CustomError {
    constructor(message = 'Unauthorized access') {
      super(message);
      this.statusCode = 401;
      this.code = 'UNAUTHORIZED';
    }
  }
  
  module.exports = {
    CustomError,
    NotFoundError,
    ValidationError,
    UnauthorizedError
  };
  