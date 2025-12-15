export function apiResponse(res, { statusCode = 200, message, data = null, meta = null }) {
  return res.status(statusCode).json({
    success: statusCode >= 200 && statusCode < 300,
    message,
    data,
    meta,
  })
}
