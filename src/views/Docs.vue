<template>
  <div class="flex flex-col min-h-screen relative">
    <Navbar />
    <section>
      <div class="container py-4">
        <h1 class="text-2xl mb-2">Documentation</h1>
        <br />
        <h2 class="text-xl mb-4">Introduction</h2>
        <p>
          Welcome to the documentation for our YouMP3 app, the ultimate YouTube
          to MP3 converter! We're here to guide you through using the app
          effectively and unlocking its amazing features. Don't worry, it's as
          easy as pie, unless you're one of those rare individuals who still
          struggles with copying and pasting YouTube links. But hey, we believe
          in you! Let's dive in and rock your offline listening experience with
          YouMP3!
        </p>
        <br />
        <h2 class="text-xl mb-4">How to Use</h2>
        <h4 class="text-lg mb-4">Instructions</h4>
        <ol style="padding-left: 15px">
          <li>
            Open the application in your web browser by visiting the URL where
            it is hosted.
          </li>
          <li>
            On the home page, you will see an input field where you can paste a
            YouTube link.
          </li>
          <li>
            Copy a YouTube link from the YouTube website or app, and paste it
            into the input field.
          </li>
          <li>
            Click the "Convert" button to initiate the conversion process.
          </li>
          <li>
            The application will make a request to the Backend server to fetch
            the video and convert it to an MP3 file.
          </li>
          <li>
            Please allow a few moments for conversion process to complete, as
            this may vary depending on your internet speed. We appreciate your
            understanding
          </li>
          <li>
            Once the conversion process is complete, you will be prompted to
            download the MP3 file.
          </li>
          <li>Click the download button to save the file to your computer.</li>
          <li>
            You can also view a small iframe of the video on the page, along
            with its title.
          </li>
          <li style="margin-left: 7px">
            To learn more about the application or its developer, you can visit
            the " About" and "Docs" pages using the links in the navigation
            menu.
          </li>
        </ol>
        <br />
        <h2 class="text-xl mb-4">Troubleshooting</h2>
        <p>
          If you encounter any issues with the app, please check your internet
          connection and try again. If the problem persists, please contact us
          via email or through our social media channels.
        </p>
      </div>
      <br /><br />
    </section>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
</script>
