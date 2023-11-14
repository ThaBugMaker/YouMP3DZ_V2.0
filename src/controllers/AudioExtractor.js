const ytdl = require("ytdl-core");

async function extractAudio(url) {
  // console.log("Extracting audio started...");
  let urlParts;
  // Updating the url...
   if (url.includes("m.youtube")) {
    urlParts = url.split("v=");
    let videoID = urlParts[1].split("&")[0];
    url = `https://youtu.be/${videoID}`;
  }
  if (url.includes("v=")) {
    // Case where 'v=' is present, like in a watch URL
    urlParts = url.split("?v=");
    url = `${urlParts[0]}?v=${urlParts[1].split("&si=")[0]}`;
  } else {
    // Case where 'v=' is not present, like in a non-watch URL
    urlParts = url.split("?");
    url = urlParts[0];
  }
  return (audioStream = ytdl(url, { quality: "highestaudio" }));
}

// Export the function to be used in other modules
module.exports = { extractAudio };
