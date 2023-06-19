const express = require("express");
const path = require("path");
const compression = require("compression");
const router = require("./src/routes/Routes");
require("dotenv").config();

const app = express();

// Set the static file directory path
app.use(express.static(path.join(__dirname, "public")));

// Use the JSON middleware to parse incoming JSON data
app.use(express.json());

// Use the URL encoded middleware to parse incoming URL-encoded data with the qs library
app.use(express.urlencoded({ extended: true }));

// Enable gzip compression middleware based on the client's request headers
app.use((req, res, next) => {
  if (
    req.headers["accept-encoding"] &&
    req.headers["accept-encoding"].includes("gzip")
  ) {
    // Enable gzip compression if the client supports it
    compression()(req, res, next);
  } else {
    // Proceed without compression
    next();
  }
});
// Set the views directory path
app.set("views", path.join(__dirname, "views"));

// Set the view engine to use EJS
app.set("view engine", "ejs");

// Use the router middleware to handle incoming requests
app.use("/", router);

// Start the Express.js application and listen for incoming requests on the specified port
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
