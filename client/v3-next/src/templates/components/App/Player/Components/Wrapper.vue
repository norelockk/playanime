<style scoped>
.player {
  width: 100%;
  position: relative;
}

.player-inside {
  max-width: 100%;
}
</style>

<script setup lang="ts"></script>

<template>
  <div class="player">
    <div class="player-inside">
      <slot />
    </div>
  </div>
</template>