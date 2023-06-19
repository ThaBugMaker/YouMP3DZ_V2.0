const ytdl = require("ytdl-core");

// Middleware function to check if the URL is valid
const validateUrl = async (req, res, next) => {
  // Get the video URL from the request body
  let url = req.body.url;

  try {
    // Get the video ID from the URL using ytdl-core
    const videoId = ytdl.getURLVideoID(url);
    const isValid = ytdl.validateID(videoId);
    info = await ytdl.getInfo(url);
    const isPrivate = info.videoDetails.isPrivate;

    // If the video ID is undefined or null, the URL is invalid
    if (!isValid) {
      return res.status(400).json({ message: "Invalid YouTube ID" });
    }
    if (isPrivate) {
      return res.status(401).json({ message: "The video is private." });
    }
    // Check if the video is available

    if (info.error) {
      throw new Error(`Video not found or unavailable: ${url}`);
    }

    // Call the next middleware function in the chain
  } catch (err) {
    // Handle different types of errors
    if (err instanceof TypeError) {
      return res.status(400).json({ message: "Invalid YouTube URL" });
    }
    // Check if the error is a custom error from the YouTube API.
    if (err.message === "Video unavailable") {
      // Return a 404 status code and the message "Video unavailable".
      return res.status(404).json({ message: "Video unavailable." });
    }
    if (err.statusCode === 410) {
      return res.status(410).json({
        message: "This video is no longer available for public access.",
      });
    } else {
      console.log("UNKOWN ERROR");
      // console.error(err.stack);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
  res.locals.url = url;

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
