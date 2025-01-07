<template>
  <main class="min-h-screen relative">
    <Navbar />

    <section class="flex flex-col gap-4 items-center">
      <p class="text-sm text-center lg:text-lg py-1 -mb-2">
        <span id="remaining">50</span> Downloads remaining within the next hour.
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
              class="flex items-center justify-between gap-2 select-none ml-2 transition bg-secondary p-3 text-[11px] lg:text-sm lg:p-4 rounded-lg text-dark font-semibold cursor-pointer active:bg-primary active:text-light lg:hover:bg-primary lg:hover:text-light"
            >
              Convert
              <Upload class="h-4 w-4" />
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
      <!-- This is a container for the YouTube video and its related information -->
      <div class="flex flex-col items-center justify-center py-2">
        <iframe
          class="w-[90%] mx-auto rounded-lg lg:mb-3"
          id="video-iframe"
          :src="`https://www.youtube-nocookie.com/embed/${videoID}`"
          frameborder="0"
          allow="encrypted-media; gyroscope; picture-in-picture;"
        ></iframe>
        <!-- <iframe
          class="w-full mx-auto rounded-lg bg-primary"
          id="video-iframe"
          frameborder="0"
          allow="encrypted-media;"
        ></iframe> -->
        <p class="pb-4 text-sm pt-2 md:text-[16px]">{{ videoTitle }}</p>
        <div
          class="ad border border-dark dark:border-white w-full h-40 grid place-content-center"
        >
          AD HERE ! ! <br />
        </div>
        <div class="py-4">
          <button
            id="#downloadBtn"
            class="hidden select-none items-center transition bg-secondary p-3 text-[11px] lg:text-sm lg:p-4 rounded-lg text-dark font-semibold cursor-pointer active:bg-primary active:text-light lg:hover:bg-primary lg:hover:text-light"
            type="button"
            ref="downloadBtn"
          >
            Download MP3 <Download class="ml-2 h-4 w-4" />
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
import { ref } from "vue";
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import { Download, Upload } from "lucide-vue-next";
import { validateUrl } from "@/composables/useFormValidation";
import { useApi } from "@/composables/useApi";
const inputValue = ref<string>("");
const downloadBtn = ref<HTMLButtonElement>();
const videoTitle = ref<string>("Rick Astley - Never Gonna Give You Up");
const videoID = ref<string>("dQw4w9WgXcQ");

const convert = async () => {
  const ytUrl = inputValue.value;
  const isValid = validateUrl(ytUrl);
  if (isValid) {
    alert("Still in development.");
  } else {
    return alert("Invalid URL");
  }
};
</script>
