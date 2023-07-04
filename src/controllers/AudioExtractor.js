const ytdl = require("ytdl-core");

async function extractAudio(url) {
  console.log("Extracting audio started...");
  return (audioStream = ytdl(url, { quality: "highestaudio" }));
}

// Export the function to be used in other modules
module.exports = { extractAudio };
