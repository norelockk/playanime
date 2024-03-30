<script setup lang="ts">
import { ref } from 'vue';

const now = ref(new Date());
</script>

<template>
  <div>
    <span v-text='now.getFullYear()'></span>
  </div>
</template>