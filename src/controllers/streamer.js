const { extractAudio } = require("./AudioExtractor");
const { cleanTitle } = require("../utilities/utilities");

let completeFileName, audioStream, encodedFileName;

async function streamAudio(req, res) {
  const { url, info } = req.query;

  try {
    // Extract the original audio name
    let originalTitle = info.videoDetails.title;

    // Passing the originalTitle to cleanTitle function,
    // .. it removes (spaces,symboles and keywords) then returns a cleanedTi
    let cleanedTitle = cleanTitle(originalTitle);

    // Making a custom filename by add the app name and the file extension.
    completeFileName = `${cleanedTitle}-YouMP3DZ.mp3`;

    // Call the extractAudio function to get the audio stream
    audioStream = await extractAudio(url);

    // Encoding the Filename and the originalTitle to be sent in the headers
    encodedFileName = encodeURIComponent(completeFileName);
    let encodedTitle = encodeURIComponent(originalTitle);

    // Setting the headers to client
    res.set({
      // X-POST-FLAG is a custom header has a boolean value to LET or PREVENT client-Side
      // from requesting the File.
      "x-post-flag": true,
      // Custom-Data SENDING original title & filename encoded
      "Custom-Data": JSON.stringify({
        originalTitle: encodedTitle,
        fileName: encodedFileName,
      }),
    });
    // sending response to client with satatus of 201:Created and json data that has
    // download url
    res.status(201).json({
      // The Download URL
      url: `/download/${encodedFileName}`,
    });
  } catch (err) {
    // Catchs the errors if there is ERRORS
    console.error({
      message: `Internal Error Caught in audioStream Function`,
      ERROR: err,
    });
    // Sending Internal Server Error Response to the client
    res.status(500).json({
      message: "Oops! We encountered an error while processing your request.",
    });
  }
}

// This function is triggred by GET /download/FILENAME.MP3 Endpoint
// AND its Responsible For Sending The File to client.
async function getAudioStream(req, res) {
  // Declaring The X-POST-FLAG Header
  const hasPosted = req.headers["x-post-flag"] === "true";
  try {
    // IF XPOSTFLAG is Present And TRUE...
    if (hasPosted && audioStream) {
      // Setting the headers to be sent to the client
      res.set({
        "Content-Disposition": `attachment; filename=${encodedFileName}`,
        "Cache-Control": "public, max-age=31536000",
        "Content-Type": "audio/mpeg",
      });
      // Pipe/Attache the file to the response AkA sending File...
      audioStream.pipe(res);
      // Reset the audioStream
      audioStream = "";
    } else {
      // Else IF XPOSTFLAG is Absent or set to FALSE...
      // ... Then send ACCESS DENIED Status and Render DENIED Page!
      res.status(403).render("denied");
    }
  } catch (err) {
    // Catchs the errors if there is ERRORS
    console.error({
      message: `Internal Error Caught in getAudioStream Function`,
      ERROR: err,
    });
    // Sending Internal Server Error Response to the client
    res.status(500).json({
      message: "Oops! We encountered an error while processing your request.",
    });
  }
}
// EXPORTING THE FUNCTIONS TO BE IMPORTED AND USED IN ROUTER.JS FILE
module.exports = { streamAudio, getAudioStream };
