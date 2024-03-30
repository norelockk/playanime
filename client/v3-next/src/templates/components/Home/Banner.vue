<script setup lang='ts'>
import { Swiper } from 'swiper/vue';
import 'swiper/css';

import { Autoplay } from 'swiper/modules';
// import { computed, ComputedRef, ref, Ref } from 'vue';
defineProps({
  height: {
    type: String,
    required: false,
    default: '480px'
  },
  options: {
    type: Object,
    required: false,
    default: {
      loop: true,
      speed: 800,
      modules: [ Autoplay ],
      direction: 'horizontal',
      slidesPerView: 0,
      resistanceRatio: 0.6,
      autoplay: {
        delay: 8000
      } 
    }
  }
});
</script>

<template>
  <swiper
    observer
    :loop="options.loop"
    :speed="options.speed"
    :resistanceRatio="options.resistanceRatio"
    :autoplay="options.autoplay"
    :modules="options.modules"
    :direction="options.direction"
    :style="`height: ${height};`"
  >
    <slot />
  </swiper>
</template>