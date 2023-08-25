export class APIError extends Error {
  status: number;
  constructor(status:number, message:string) {
    super(message);
    this.status = status;
    this.message = message.includes('Cast to ObjectId failed') ? 'you have entered an invalid id'
      : message.includes('Cast to Decimal128 failed') ? `There's a problem with user's data, refer to webmaster.` : message;
  }
}

export class BadRequestError extends APIError {
  constructor(message?:string) {
    super(400, message || 'Bad Request');
  }
}

export class UnauthorizedError extends APIError {
  constructor(message?:string) {
    super(401, message || 'Unauthorized');
  }
}

export class AccessDeniedError extends APIError {
  constructor(message?:string) {
    super(401, message || 'Access denied');
  }
}

export class ForbiddenError extends APIError {
  constructor(message?:string) {
    super(403, message || 'Forbidden');
  }
}

export class NotFoundError extends APIError {
  constructor(message?:string) {
    super(404, message || 'Not found');
  }
}

export class MethodNotAllowedError extends APIError {
  constructor(message?:string) {
    super(405, message || 'Method Not Allowed');
  }
}

export class TimeoutError extends APIError {
  constructor(message?:string) {
    super(408, message || 'Request timeout');
  }
}

export class ConflictError extends APIError {
  constructor(message?:string) {
    super(409, message || 'Conflict');
  }
}

export class UnSupportedMediaTypeError extends APIError {
  constructor(message?:string) {
    super(415, message || 'Unsupported Media Type');
  }
}

export class ExpectationFailedError extends APIError {
  constructor(message?:string) {
    super(417, message || 'Expectation Failed');
  }
}

export class UnProcessableEntityError extends APIError {
  constructor(message?:string) {
    super(422, message || 'Unprocessable Entity');
  }
}

export class InternalServerError extends APIError {
  constructor(message?:string) {
    super(500, message || 'Internal Server Error');
  }
}

export const apiErrors = {
  BadRequestError,
  UnauthorizedError,
  AccessDeniedError,
  ForbiddenError,
  NotFoundError,
  MethodNotAllowedError,
  TimeoutError,
  ConflictError,
  UnSupportedMediaTypeError,
  ExpectationFailedError,
  UnProcessableEntityError,
  InternalServerError
};
