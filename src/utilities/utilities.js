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

function cleanTitle(originalTitle) {
  let cleanedTitle = originalTitle;
  keywordsToRemove.forEach((keyword) => {
    const regex = new RegExp(`\\b\\w*(${keyword})\\w*\\b|\\(|\\)`, "giu");
    cleanedTitle = cleanedTitle
      .replace(regex, "")
      .replace(/\s+/g, "-")
      .replace(/[^A-Za-z0-9\u0600-\u06FF\s()\-]/g, "")
      .replace(/-{2,}/g, "-");
  });
  return cleanedTitle;
}
module.exports = { cleanTitle };
