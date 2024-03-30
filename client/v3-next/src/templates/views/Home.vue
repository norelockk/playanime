<script setup lang="ts">
import { ref, Ref, computed, ComputedRef, defineAsyncComponent, onMounted } from 'vue';
import { isEmpty } from 'lodash';

import { anime } from '@/hydra';

const blankies = [{}];

const latestAnime: Ref<any> = ref(null);
const computedLatestAnime: ComputedRef<any[]> = computed(() => latestAnime.value);

const Banner = defineAsyncComponent(() => import('@/templates/components/Home/Banner.vue'));
const BannerSlide = defineAsyncComponent(() => import('@/templates/components/Home/BannerSlide.vue'));

onMounted(async () => {
  try {
    const animes = await anime.getLatestAnime();

    if (animes)
      latestAnime.value = animes;
  } catch (e) {
    console.log(e);
  }
})
</script>

<template>
  <banner :height="'480px'">
    <banner-slide
      v-if="!computedLatestAnime || isEmpty(computedLatestAnime)"
      v-for="_ in blankies"
      anime-id="blank"
    />

    <banner-slide
      v-else
      v-for="(anime, index) in computedLatestAnime"
      :key="index"
      :anime-id="anime.id"
    />
  </banner>
</template>