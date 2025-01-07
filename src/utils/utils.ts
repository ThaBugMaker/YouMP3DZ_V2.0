// utils.ts
export function extractYouTubeVideoID(link: string): string {
  // Check if URL matches YouTube URL patterns
  const pattern1 = /^(https?:\/\/)?(www\.)?youtube\.com\/watch\?v=([^&]+).*$/;
  const pattern2 = /^(https?:\/\/)?(www\.)?youtu\.be\/([^&]+).*$/;
  const pattern3 =
    /^(https?:\/\/)?(www\.)?(m\.)?youtube\.com\/watch\?si=[^&]+&v=([^&]+).*$/;

  // Check if the URL matches either pattern
  if (pattern1.test(link) || pattern2.test(link) || pattern3.test(link)) {
    // If the URL matches, extract the video ID
    const match =
      link.match(pattern1) || link.match(pattern2) || link.match(pattern3);
    // If match is null, return false
    if (match) {
      // Extract the video ID based on the matched pattern
      const urlPath = match[3];
      const mobileUrlPath = match[4];
      const pathPart = urlPath.split("?");
      let videoID: string;

      // Check if it's a standard YouTube URL or has a mobile subdomain
      if (!mobileUrlPath) {
        // If standard URL, extract video ID from the path
        videoID = pathPart[0];
      } else {
        // If mobile URL, extract video ID directly
        videoID = mobileUrlPath;
      }

      // Return the extracted video ID
      return videoID;
    }
  }
  return "Invalid YouTube URL";
}
