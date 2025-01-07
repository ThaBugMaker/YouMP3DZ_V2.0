<template>
  <footer>
    <div class="text-[10px] lg:text-xs">
      <span class="flex justify-evenly items-center">
        <p class="text-[10px] lg:text-xs lg:flex-1">
          &copy; 2023 - {{ new Date().getFullYear() }}
          <b><a href="/">YouMP3DZ</a></b>
          All rights reserved.
        </p>
        <p class="underline underline-offset-2">
          <router-link to="/terms-and-privacy">Terms of use</router-link>
        </p>
      </span>
      <span class="foo" style="margin-top: -20px; font-size: 0.85rem">
        <!-- <p>Made in Algeria 🇩🇿</p> -->
      </span>
    </div>
  </footer>
</template>

<script setup lang="ts"></script>
