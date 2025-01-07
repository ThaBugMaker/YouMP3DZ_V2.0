<template>
  <div class="flex flex-col min-h-screen relative">
    <Navbar />
    <section>
      <div class="container mx-auto">
        <h1 class="text-2xl">About</h1>
        <br />
        <h2 class="text-xl pb-2">Introduction</h2>
        <p>
          YouMP3 simplifies the process of converting YouTube videos into MP3
          files. With our user-friendly interface, you can quickly enter the
          YouTube video URL and convert it into a high-quality MP3 file.
          Download and enjoy your favorite audio content offline, anytime and
          anywhere.
        </p>
        <br />
        <h2 class="text-xl pb-2">Description</h2>
        <p>
          This app is designed to provide a convenient solution for converting
          YouTube videos to MP3 files and enabling users to download them for
          offline listening. It has been developed by an experienced full-stack
          developer who is passionate about creating user-friendly software.
        </p>
        <p>
          The main objective of this app is to offer a simple and easy-to-use
          tool that meets the needs of users seeking to extract audio from
          YouTube videos. By converting videos to MP3 format, users can enjoy
          their favorite content in audio form, whether it's music, podcasts,
          lectures, or other audio-based content.
        </p>
        <p>
          If you have any questions, suggestions, or feedback about the app,
          please don't hesitate to reach out. Your input is valuable and helps
          in enhancing the app's functionality and user experience. Feel free to
          contact the developer at
          <span
            ><a
              class="aboutEmail"
              style="font-size: inherit"
              href="mailto:KhalilDev@duck.com?Subject=From You2MP3 App"
              >KhalilDev@duck.com</a
            ></span
          >.
        </p>
        <p>
          Thank you for using the app and we hope you enjoy converting and
          downloading your favorite YouTube videos in MP3 format!
        </p>
        <br />
        <h2 class="text-xl pb-2">Contact</h2>
        <p>
          If you have any questions or feedback about the app, please don't
          hesitate to contact me via email or through my social media channels.
          I am always happy to hear from my users and i am committed to
          providing the best possible support.
        </p>
      </div>
    </section>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
</script>
