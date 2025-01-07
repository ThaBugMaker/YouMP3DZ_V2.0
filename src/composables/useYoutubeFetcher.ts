// composables/useYoutubeFetcher.ts
import { ref } from "vue";
import { useYoutubeInfo } from "./useYoutubeInfo";

export const useYoutubeFetcher = () => {
  const isLoading = ref<boolean>(true);
  const videoID = ref<string | null>(null);
  const videoTitle = ref<string | null>(null);

  const fetchVideoInfo = async (videoID: string) => {
    isLoading.value = true;
    try {
      const videoInfo = await useYoutubeInfo(videoID);
      if (videoInfo.title) {
        videoTitle.value = videoInfo.title;
        return true; // Success
      }
      return false; // Failed to fetch title
    } catch (error) {
      console.error("Error fetching video info:", error);
      return false; // Error occurred
    } finally {
      isLoading.value = false;
    }
  };

  return {
    isLoading,
    videoID,
    videoTitle,
    fetchVideoInfo,
  };
};
