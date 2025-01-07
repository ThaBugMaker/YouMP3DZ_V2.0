import { extractYouTubeVideoID } from "@/utils/utils";

const validateUrl = (url: string) => {
  const videoInfo = extractYouTubeVideoID(url);
  if (videoInfo.includes("Invalid YouTube URL")) {
    return false;
  } else {
    return videoInfo;
  }
};

// Validate if the YouTube video ID is valid (length of 11)
export const validateID = (url: string) => {
  const videoID = validateUrl(url); // Get the video ID from the URL
  if (!videoID) return false; // Return false if URL is invalid
  if (videoID.length !== 11) return false; // Return false if video ID length is not 11
  return videoID; // Return the valid video ID
};
