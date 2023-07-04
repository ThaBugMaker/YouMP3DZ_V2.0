// Error handling middleware
function errorHandler(err, req, res, next) {
  // Handle specific types of errors
  if (err instanceof CustomError) {
    // Handle specific error type
    return res.status(err.statusCode).json({ error: err.message });
  }

  // Handle other types of errors
  console.error(err);

  // Return a generic error response
  res.status(500).json({ error: "Internal Server Error" });
}

// Custom error class
class CustomError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = { errorHandler, CustomError };
