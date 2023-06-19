const ytdl = require("ytdl-core");
const { PassThrough, Readable } = require("stream");

const keywordsToRemove = [
  "clip",
  "official",
  "Officiel",
  "Officielle",
  "lyrics",
  "lyric",
  "paroles",
  "parole",
  "by",
  "quality",
  "Explicit",
];

let completeFileName;
let audioStream;

async function streamAudio(req, res) {
  const url = res.locals.url;
  try {
    info = await ytdl.getInfo(url);
    // Extract the original audio name
    const originalTitle = info.videoDetails.title;

    // Create a new variable to hold the cleaned title
    let cleanedTitle = originalTitle;

    keywordsToRemove.forEach((keyword) => {
      const regex = new RegExp(`\\b\\w*(${keyword})\\w*\\b|\\(|\\)`, "giu");
      cleanedTitle = cleanedTitle
        .replace(regex, "")
        .replace(/\s+/g, "-")
        .replace(/[^\w\s()\-]/g, "")
        .replace(/-{2,}/g, "-");
    });

    const extension = "mp3";
    completeFileName = `${cleanedTitle}-YouMP3DZ.${extension}`;

    audioStream = ytdl(url, {
      quality: "highestaudio",
    });

    res.set({
      "x-post-flag": true,
      "Custom-Data": JSON.stringify({
        originalTitle,
        fileName: completeFileName,
      }),
    });

    res.status(201).json({
      url: `/download/${completeFileName}`,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "An error occurred while processing the request.",
      error: err.message,
    });
  }
}
async function getAudioStream(req, res) {
  const hasPosted = req.headers["x-post-flag"] === "true";
  try {
    if (hasPosted) {
      // console.log(hasPosted);
      // Check if the file is in the browser localStorage
      res.set({
        "Content-Disposition": `attachment; filename=${completeFileName}`,
        "Cache-Control": "public, max-age=31536000",
        "Content-Type": "audio/mpeg",
      });
      audioStream.pipe(res);
    } else {
      res.status(403).render("denied");
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "An error occurred while processing the request.",
      error: err.message,
    });
  }
}

module.exports = { streamAudio, getAudioStream };
