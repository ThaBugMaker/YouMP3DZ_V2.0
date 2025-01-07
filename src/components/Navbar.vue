<template>
  <div class="w-full mx-auto bg-primary">
    <nav
      class="container mx-auto flex px-4 items-center justify-between py-2 lg:py-1"
    >
      <!-- Logo -->
      <div class="flex items-center justify-center cursor-pointer">
        <img
          class="w-[100%] max-w-[50px] lg:max-w-[70px]"
          src="/assets/images/YouMP3120.png"
          alt="App Logo"
        />
        <h1 class="font-semibold text-xl md:text-3xl">
          <router-link to="/">YouMP<span>3</span>Dz</router-link>
        </h1>
      </div>

      <!-- Hamburger Button -->
      <div
        class="block relative md:hidden w-10 h-10 cursor-pointer"
        @click="toggleMenu"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="text-secondary w-8 top-1 left-1 absolute"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </div>

      <!-- Navigation Links for Larger Screens -->
      <ul class="hidden md:flex items-center space-x-2">
        <li>
          <router-link class="flex items-center justify-center" to="/">
            <Home class="text-xs mr-1" />Home</router-link
          >
        </li>
        <li>
          <router-link class="flex items-center justify-center" to="/docs">
            <BookOpenText class="text-xs mr-1" />Docs</router-link
          >
        </li>
        <li>
          <router-link class="flex items-center justify-center" to="/about">
            <Info class="text-xs mr-1" />About</router-link
          >
        </li>

        <li class="github">
          <a
            class="flex center"
            href="https://github.com/ThaBugMaker/YouMP3DZ_V2.0"
            target="_blank"
          >
            <Github /> Github
          </a>
        </li>
        <DarkModeToggle />
      </ul>
    </nav>

    <!-- Sidemenu -->
    <div
      class="fixed top-0 left-0 h-full w-[70%] bg-primary shadow-lg z-50 transform transition-transform"
      :class="{ '-translate-x-full': !isMenuOpen, 'translate-x-0': isMenuOpen }"
    >
      <button
        @click="toggleMenu"
        class="p- w-10 h-10 text-secondary text-2xl absolute top-4 right-4 rounded cursor-pointer"
        aria-label="Close Menu"
      >
        ✕
      </button>
      <ul
        class="mt-16 space-y-4 px-6 text-light text-lg flex flex-col items-center justify-between h-[50%]"
      >
        <li>
          <router-link class="flex items-center justify-center" to="/">
            <Home class="text-xs mr-1" />Home</router-link
          >
        </li>
        <li>
          <router-link class="flex items-center justify-center" to="/docs">
            <BookOpenText class="text-xs mr-1" />Docs</router-link
          >
        </li>
        <li>
          <router-link class="flex items-center justify-center" to="/about">
            <Info class="text-xs mr-1" />About</router-link
          >
        </li>
        <li class="github">
          <a
            class="flex center"
            href="https://github.com/ThaBugMaker/YouMP3DZ_V2.0"
            target="_blank"
          >
            <Github /> Github
          </a>
        </li>
        <DarkModeToggle />
      </ul>
      <Footer class="text-[10px] absolute bottom-0" />
    </div>

    <!-- Overlay (for closing the sidemenu by clicking outside) -->
    <div
      v-if="isMenuOpen"
      class="fixed inset-0 bg-black bg-opacity-10 z-40"
      @click="toggleMenu"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import DarkModeToggle from "@/components/DarkModeToggle.vue";
import Footer from "@/components/Footer.vue";
import { Home, BookOpenText, Info, Github } from "lucide-vue-next";

// Toggle menu state
const isMenuOpen = ref(false);
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
</script>

<style scoped>
/* Animation for sliding menu */
.transform {
  transition: transform 0.3s ease-in-out;
}
</style>
