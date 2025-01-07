<script setup lang="ts"></script>

<template>
  <Transition name="fade" mode="out-in">
    <router-view></router-view>
  </Transition>
</template>
<style>
.fade-enter-from {
  opacity: 0;
}
.fade-enter-active {
  transition: opacity 250ms;
}
.fade-leave-to {
  opacity: 0;
}
.fade-leave-active {
  transition: opacity 250ms;
}
</style>
