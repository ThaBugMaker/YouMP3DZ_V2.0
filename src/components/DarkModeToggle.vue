<template>
  <div>
    <input
      @click="toggleDarkMode"
      type="checkbox"
      class="checkbox"
      id="checkbox"
      :checked="isDark"
    />
    <label for="checkbox" class="checkbox-label">
      <Moon class="fa-moon" />
      <SunMedium class="fa-sun" />
      <span class="ball"></span>
    </label>
  </div>
</template>

<script setup lang="ts">
import { useDarkMode } from "@/composables/useDarkMode";
import { Moon, SunMedium } from "lucide-vue-next";
const { isDark, toggleDarkMode } = useDarkMode();
</script>

<style scoped></style>
