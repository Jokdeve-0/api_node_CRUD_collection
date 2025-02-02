class AppError extends Error {

  constructor(message, origin, code, details = {}) {
    super(message);
    this.origin = origin;
    this.code = code;
    this.details = details;
  }

  setMessage(message){
    this.message = message;
  }

  errorDetails(){
    return {
      message: this.message,
      origin: this.origin,
      code: this.code,
      stack: this.stack
    };
  }

}

class AuthError extends AppError {
  constructor(message,origin,details = {}) {
    super(message, origin, 'AUTH_ERROR', details);
  }
}

class DatabaseError extends AppError {
  constructor(message,origin,details = {}) {
    super(message, origin, 'DB_ERROR', details);
  }
}

export { AppError, AuthError, DatabaseError };
