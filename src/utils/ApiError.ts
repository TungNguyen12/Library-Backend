export class ApiError {
  constructor(
    public code: number,
    public message: string
  ) {
    this.code = code
    this.message = message
  }

  static badRequest(message: string): ApiError {
    return new ApiError(400, message)
  }

  static unauthorized(message: string): ApiError {
    return new ApiError(401, message)
  }

  static forbidden(message: string): ApiError {
    return new ApiError(403, message)
  }

  static notFound(message: string): ApiError {
    return new ApiError(404, message)
  }

  static methodNotAllowed(message: string): ApiError {
    return new ApiError(405, message)
  }

  static internal(message: string): ApiError {
    return new ApiError(500, message)
  }
}
