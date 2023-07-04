// Import the Express.js library and create a new router instance
const express = require("express");
const router = express.Router();
const path = require('path');
// Import  middlewares and controllers
const limiter = require("../middlewares/rateLimiter.js");
const { validateUrl, denied, handle404 } = require("../middlewares/validation");
const { streamAudio, getAudioStream } = require("../controllers/streamer");

// CORE ENDPOINTS
router.post("/download", validateUrl, limiter, streamAudio);
router.get("/download/:filename", getAudioStream);

/* ******** TAMPLETS ******** */

// Route handler for the root path
router.get("/", (req, res) => {
  res.render("home", { pageTitle: "YouMP3DZ - Home" });
});

// Define a GET route for the "/docs" path
router.get("/docs", (req, res) => {
  // Render the "docs" view using EJS
  res.render("docs", { pageTitle: "YouMP3DZ - Documentation" });
});

// Define a GET route for the "/about" path
router.get("/about", (req, res) => {
  // Render the "about" view using EJS
  res.render("about", { pageTitle: "YouMP3DZ - About Us" });
});
// Define a GET route for the "/tos" path
router.get("/terms-and-privacy", (req, res) => {
  // Render the "tos" view using EJS
  res.render("terms-and-privacy", {
    pageTitle: "YouMP3DZ - Terms of Use and Data Privacy Policy",
  });
});

// Define a GET route for the "/github" path
router.get("/github", (req, res) => {
  // Redirect the user to the GitHub repository for the application
  res.redirect("https://github.com/ThaBugMaker/YouMP3DZ_V2.0.git");
});

// Define a GET route for the "/tos" path
router.get("/public", (req, res) => {
  res.status(403).render("denied", {
    pageTitle: "YouMP3DZ - Access Forbidden",
  });
});
router.get('/robots.txt', (req, res) => {
  res.sendFile(path.join(__dirname, '../../robots.txt'));
});


// Use the handle404 middleware to handle all 404 errors
router.use(handle404);
// Export the router object for use in other parts of the application
module.exports = router;
