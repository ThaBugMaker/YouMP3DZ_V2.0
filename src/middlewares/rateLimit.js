const rateLimit = require("express-rate-limit");

// Create the rate limiter middleware
const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 50, // limit each IP to 15 requests per windowMs,
  message: "Rate limit exceeded. Please try again later.",
  // headers: true,
});

module.exports = limiter;
