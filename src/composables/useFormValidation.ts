import { extractYouTubeVideoID } from "@/utils/utils";

export const validateUrl = (url: string) => {
  const videoInfo = extractYouTubeVideoID(url);
  if (!videoInfo) {
    console.log("Invalid YouTube URL");
    return false;
  } else {
    return true;
  }
};
