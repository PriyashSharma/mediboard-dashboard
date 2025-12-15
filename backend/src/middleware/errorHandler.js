import { AppError } from '../utils/AppError.js'

export function notFoundHandler(req, res, next) {
  next(new AppError(404, `Route ${req.originalUrl} not found`))
}

export function globalErrorHandler(error, req, res, _next) {
  const statusCode = error.statusCode || 500
  const message =
    error instanceof AppError
      ? error.message
      : 'An unexpected error occurred. Please try again later.'

  if (statusCode >= 500) {
    console.error('Unhandled Error:', error)
  }

  res.status(statusCode).json({
    success: false,
    message,
    details: error.details,
  })
}
