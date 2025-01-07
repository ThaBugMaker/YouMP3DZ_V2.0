<template>
  <main ref="topEl" class="min-h-screen relative">
    <Navbar />

    <section class="flex flex-col gap-4 items-center">
      <p class="text-sm text-center lg:text-lg py-1 -mb-2">
        <span>{{ remaining }}</span> Downloads remaining within the next hour.
      </p>
      <!-- This is a container for the form -->
      <div class="text-sm text-center md:p-4 md:w-full">
        <form
          @submit.prevent="convert"
          class="form relative overflow-hidden dark:bg-darkBgLighter bg-lightBgLighter rounded-lg sm:w-3/2 md:w-3/4 lg:w-3/4 xl:w-3/4 mx-auto px-4 lg:px-6 py-3"
        >
          <!-- This is the form where the user inputs the Youtube URL -->
          <label for="link" class="block mb-2 text-start text-sm lg:text-lg"
            >Enter youtube url:</label
          >
          <!-- This is a container for the input elements on the page -->
          <div
            class="dark:bg-darkBg bg-lightBg p-2 mb-1 w-full lg:w-full rounded-lg flex items-center justify-between"
          >
            <!-- This is the input field where the user enters the Youtube URL -->
            <input
              v-model="inputValue"
              class="p-3 lg:p-4 rounded-lg w-full outline-2 focus-within:outline dark:focus-within:outline-darkBg text-dark lg:m-2"
              type="url"
              name="url"
              id="yt-link"
              placeholder="https://youtu.be/WILNIXZr2oc"
              autocorrect="off"
              autocapitalize="off"
              spellcheck="false"
              autofocus="true"
              aria-autocomplete="none"
              required
            />
            <!-- This is the submit button to initiate the conversion process -->
            <button
              type="submit"
              id="submitBtn"
              class="flex items-center justify-center gap-2 select-none ml-2 transition bg-secondary p-3 text-[11px] lg:text-sm lg:p-4 rounded-lg text-dark font-semibold cursor-pointer active:bg-primary active:text-light lg:hover:bg-primary lg:hover:text-light"
              :disabled="btnLoading"
            >
              <!-- Show Loader Circle when loading -->
              <span v-if="btnLoading" class="flex justify-center items-center">
                <LoaderCircle class="h-5 w-5 animate-spin" />
              </span>

              <!-- Show Convert Text and Icon when not loading -->
              <span v-else class="flex items-center gap-2">
                Convert
                <Upload class="h-4 w-4" />
              </span>
            </button>
          </div>
          <!-- Add Errors Here -->
          <!-- This is where errors will be displayed if any occur -->
          <div class="text-[.5rem] md:text-xs flex items-center justify-end">
            <input
              type="checkbox"
              name="agree"
              class="mr-1 size-2 md:size-3 cursor-pointer"
              checked
              disabled
            />
            <label for="agree"
              >I agree to&nbsp;
              <router-link
                class="text-primary underline cursor-pointer"
                to="/terms-and-privacy"
              >
                Terms of service</router-link
              ></label
            >
          </div>
        </form>
      </div>
      <div class="flex flex-col items-center justify-center py-2 w-full">
        <!-- This is a container for the YouTube video and its related information -->
        <div
          class="relative w-full sm:w-[50%] h-40 sm:h-52 lg:h-48 lg:w-[60%] mx-auto rounded-lg lg:mb-3"
        >
          <!-- Skeleton Loader -->
          <div
            v-if="isLoading"
            class="absolute top-0 left-0 w-full lg:w-[60%] lg:translate-x-36 h-full bg-lightBgLighter dark:bg-darkBgLighter animate-pulse rounded-lg"
          >
            <!-- Optional: Add a "play" icon or a placeholder for a more accurate loader -->
            <div class="flex justify-center items-center w-full h-full">
              <span class="text-white text-3xl">▶️</span>
            </div>
          </div>

          <!-- Actual iframe -->
          <iframe
            v-if="!isLoading"
            class="mx-auto w-full sm:w-[90%] sm:h-52 lg:h-48 lg:w-[60%] rounded-lg lg:mb-3"
            :src="`https://www.youtube-nocookie.com/embed/${
              videoID || 'dQw4w9WgXcQ'
            }`"
            frameborder="0"
            allow="encrypted-media;"
            loading="lazy"
          ></iframe>
        </div>

        <p class="pb-4 text-sm pt-2 md:text-[16px]">{{ videoTitle }}</p>
        <div
          class="ad border border-dark dark:border-white w-72 sm:w-96 h-40 grid place-content-center rounded-lg"
        >
          AD HERE ! ! <br />
        </div>
        <div class="py-4">
          <button
            :class="{
              'bg-primary text-dark': countdown > 0,
              'bg-secondary text-dark cursor-pointer': countdown === 0,
            }"
            class="flex select-none items-center transition p-3 text-[11px] lg:text-sm lg:p-4 rounded-lg font-semibold active:bg-primary active:text-light lg:hover:bg-primary lg:hover:text-light"
            type="button"
            :disabled="countdown > 0"
            @click="startDownload"
            ref="downloadBtn"
          >
            <span v-if="countdown > 0">Download in {{ countdown }}s</span>
            <span v-else>Download MP3</span>
            <Download class="ml-2 h-4 w-4" />
          </button>
        </div>
      </div>
      <p
        class="text-sm text-light bg-primary rounded-lg p-2 w-fit lg:max-w-[70%] opacity-60"
      >
        <b>Disclaimer:<br /></b
        ><span class="text-secondary">&nbsp;&nbsp;YouMP3DZ</span> is intended
        for personal use only. Users are responsible for ensuring that their use
        of the app complies with copyright laws.
        <br />
        <span class="text-secondary">&nbsp;&nbsp;YouMP3DZ</span> does not host
        or distribute any copyrighted content. If you believe your
        copyright-protected material is being infringed, Please contact us.
      </p>
    </section>
    <Footer />
  </main>
</template>

<script setup lang="ts">
// import packages
import { ref, onMounted, nextTick } from "vue";
// import components
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
// import icons
import { Download, LoaderCircle, Upload } from "lucide-vue-next";
// import composable functions
import { validateID } from "@/composables/useFormValidation";
import { useYoutubeFetcher } from "@/composables/useYoutubeFetcher";
import { useApi } from "@/composables/useApi";

// Refs
const topEl = ref();
const downloadBtn = ref<HTMLButtonElement>();
const inputValue = ref<string>("");
const btnLoading = ref(false);
const countdown = ref<number>(5);
const remaining = ref<number>(50);
// variables
const { isLoading, videoID, videoTitle, fetchVideoInfo } = useYoutubeFetcher();
let countdownInterval: number | undefined;
let downloadURL: string;
// Functions
// Start the countdown
const startCountdown = () => {
  countdown.value = 5; // Start countdown from 5
  countdownInterval = setInterval(() => {
    if (countdown.value > 0) {
      countdown.value -= 1;
    } else {
      clearInterval(countdownInterval);
    }
  }, 1000);
};

const reset = () => {
  inputValue.value = "";
  downloadBtn.value?.classList.replace("flex", "hidden"); // Hide button
  clearInterval(countdownInterval); // Clear any running countdown
  btnLoading.value = false;
};

const startDownload = () => {
  // Your download logic here
  console.log("Downloading...");
  nextTick(() => {
    topEl.value.scrollIntoView({ behavior: "smooth" });
    window.location.href = downloadURL;
    remaining.value = Number(localStorage.getItem("storedRemaining"));
  });
  reset();
};

const convert = async () => {
  const url = inputValue.value;
  const _videoID = validateID(url);

  if (!_videoID) {
    alert("Invalid URL");
    return;
  }

  const id = _videoID;
  const success = await fetchVideoInfo(id);

  if (success) {
    const _downloadBtn = downloadBtn.value;
    videoID.value = id;
    btnLoading.value = true;

    try {
      // Ensure the API call is not sent twice
      console.log("Calling useApi...");
      const downloadData = await useApi(url);

      if (downloadData) {
        console.log("Download data:", downloadData);
        downloadURL = downloadData.url;
      } else {
        alert("Failed to fetch download URL");
        return;
      }
    } catch (error) {
      console.error("Error fetching download URL:", error);
      alert("Error fetching download URL");
      return;
    }

    // Reset button visibility to hidden before showing it again
    _downloadBtn?.classList.replace("hidden", "flex");
    _downloadBtn?.scrollIntoView({ behavior: "smooth" });

    // Start countdown when video info is fetched
    startCountdown();
  } else {
    alert("Failed to fetch video information");
  }
};

onMounted(() => {
  const storedRemaining = Number(localStorage.getItem("storedRemaining"));
  if (storedRemaining) {
    remaining.value = storedRemaining;
  } else {
    remaining.value = 50;
  }
  // Ensure button is hidden initially
  downloadBtn.value?.classList.replace("flex", "hidden");
  // reset();
  setTimeout(() => {
    isLoading.value = false;
    videoTitle.value = "Rick Astley - Never Gonna Give You Up ";
    console.clear();
  }, 5000);
});
</script>
