<style scoped></style>

<script setup lang='ts'>

import { defineAsyncComponent } from 'vue';


const player = defineAsyncComponent(() => import('../../components/hydra/Player.vue'));
</script>

<template>
  <div>
    <player></player>
  </div>
</template>