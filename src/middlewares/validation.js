const ytdl = require("ytdl-core");
const { errorHandler, CustomError } = require("./errorHandler");

// Middleware function to check if the URL is valid
const validateUrl = async (req, res, next) => {
  // Get the video URL from the request body
  let url = req.body.url;
  let info;

  try {
    // Get the video ID from the URL using ytdl-core
    const videoId = ytdl.getURLVideoID(url);
    const isValid = ytdl.validateID(videoId);
    info = await ytdl.getInfo(url);
    const isPrivate = info.videoDetails.isPrivate;

    // If the video ID is undefined or null, the URL is invalid
    if (!isValid) {
      throw new CustomError("Invalid YouTube ID", 400);
    }
    if (isPrivate) {
      throw new CustomError("The video is private.", 401);
    }
    // Check if the video is available
    if (info.error) {
      const errorMessage = `Video not found or unavailable: ${url}`;
      throw new CustomError(errorMessage);
    }
  } catch (err) {
    // Handle different types of errors
    if (err instanceof TypeError) {
      return errorHandler(
        new CustomError("Invalid YouTube URL", 400),
        req,
        res,
        next
      );
    }
    // Check if the error is a custom error from the YouTube API.
    if (err.message === "Video unavailable") {
      // Return a 404 status code and the message "Video unavailable".
      return errorHandler(
        new CustomError("Video unavailable.", 404),
        req,
        res,
        next
      );
    }
    // Check if video is no longer available for public access or removed.
    if (err.statusCode === 410) {
      return errorHandler(
        new CustomError(
          "This video is no longer available for public access.",
          410
        ),
        req,
        res,
        next
      );
    }

    // If the error is not a specific type, handle it as a generic internal server error
    return errorHandler(err, req, res, next);
  }

  req.query.url = url;
  req.query.info = info;

  next();
};

// Define a middleware function for handling 404 errors
function handle404(req, res) {
  // Render the "404" view using EJS and set the response status to 404
  res.status(404).render("404", { pageTitle: "YouMP3DZ - Page Not Found" });
}

// Export the middleware functions for use in other parts of the application
module.exports = {
  validateUrl,
  handle404,
};
