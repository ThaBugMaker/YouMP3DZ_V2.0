import { ref } from "vue";

const isLoading = ref(true);
const loadingTime = ref(0);

export const useYoutubeInfo = async (videoID: string) => {
  const url = import.meta.env.VITE_RAPIDAPI_BASE_URL + videoID;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": import.meta.env.VITE_RAPIDAPI_KEY,
      "x-rapidapi-host": import.meta.env.VITE_RAPIDAPI_HOST,
    },
  };

  // Start measuring the time
  const startTime = performance.now();

  try {
    const response = await fetch(url, options);
    const result = await response.json();

    const endTime = performance.now();
    loadingTime.value = endTime - startTime;

    isLoading.value = false; // Set loading to false once data is fetched

    return { title: result.title };
  } catch (error) {
    const endTime = performance.now();
    loadingTime.value = endTime - startTime;

    console.error(error);
    isLoading.value = false;
    return {
      title: "Error",
      message: "Failed to fetch video information.",
      error,
    };
  }
};
