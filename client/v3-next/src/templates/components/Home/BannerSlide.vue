<style scoped>
.gradient {
  pointer-events: none;
}

.v-theme--light .gradient .top {
  top: 0px;
  left: 0px;
  width: 100%;
  height: 130px;
  position: absolute;
  /* backdrop-filter: blur(2px); */
  background: linear-gradient(180deg, #f0f0f0 0%, rgba(240, 240, 240, 0.97917) 4.7%, rgba(240, 240, 240, 0.95603) 8.9%, rgba(240, 240, 240, 0.9296) 12.8%, rgba(240, 240, 240, 0.898904) 16.56%, rgba(240, 240, 240, 0.862963) 20.37%, rgba(240, 240, 240, 0.8208) 24.4%, rgba(240, 240, 240, 0.771437) 28.83%, rgba(240, 240, 240, 0.713896) 33.84%, rgba(240, 240, 240, 0.6472) 39.6%, rgba(240, 240, 240, 0.57037) 46.3%, rgba(240, 240, 240, 0.48243) 54.1%, rgba(240, 240, 240, 0.3824) 63.2%, rgba(240, 240, 240, 0.269304) 73.76%, rgba(240, 240, 240, 0.142163) 85.97%, rgba(240, 240, 240, 0) 100%);
}

.v-theme--light .gradient .middle {
  top: 0px;
  left: 0px;
  width: 100%;
  bottom: 0px;
  position: absolute;
  /* backdrop-filter: blur(2px); */
  background: linear-gradient(90deg, #f0f0f0 0%, rgba(240, 240, 240, 0.987259) 18.7%, rgba(240, 240, 240, 0.951407) 34.9%, rgba(240, 240, 240, 0.896) 48.8%, rgba(240, 240, 240, 0.824593) 60.56%, rgba(240, 240, 240, 0.740741) 70.37%, rgba(240, 240, 240, 0.648) 78.4%, rgba(240, 240, 240, 0.549926) 84.83%, rgba(240, 240, 240, 0.450074) 89.84%, rgba(240, 240, 240, 0.352) 93.6%, rgba(240, 240, 240, 0.259259) 96.3%, rgba(240, 240, 240, 0.175407) 98.1%, rgba(240, 240, 240, 0.104) 99.2%, rgba(240, 240, 240, 0.0485926) 99.76%, rgba(240, 240, 240, 0.0127407) 99.97%, rgba(240, 240, 240, 0) 100%);
}

.v-theme--light .gradient .bottom {
  width: 100%;
  height: 100px;
  bottom: 0px;
  position: absolute;
  transform: rotate(180deg);
  -ms-transform: rotate(180deg);
  -moz-transform: rotate(180deg);
  /* backdrop-filter: blur(2px); */
  -webkit-transform: rotate(180deg);
  background: linear-gradient(180deg, #f0f0f0 0%, rgba(240, 240, 240, 0.97917) 4.7%, rgba(240, 240, 240, 0.95603) 8.9%, rgba(240, 240, 240, 0.9296) 12.8%, rgba(240, 240, 240, 0.898904) 16.56%, rgba(240, 240, 240, 0.862963) 20.37%, rgba(240, 240, 240, 0.8208) 24.4%, rgba(240, 240, 240, 0.771437) 28.83%, rgba(240, 240, 240, 0.713896) 33.84%, rgba(240, 240, 240, 0.6472) 39.6%, rgba(240, 240, 240, 0.57037) 46.3%, rgba(240, 240, 240, 0.48243) 54.1%, rgba(240, 240, 240, 0.3824) 63.2%, rgba(240, 240, 240, 0.269304) 73.76%, rgba(240, 240, 240, 0.142163) 85.97%, rgba(240, 240, 240, 0) 100%);
}

.v-theme--dark .gradient .top {
  top: 0px;
  left: 0px;
  width: 100%;
  height: 130px;
  position: absolute;
  /* backdrop-filter: blur(2px); */
  background: linear-gradient(180deg, #141416 0%, rgba(20, 20, 22, 0.97917) 4.7%, rgba(20, 20, 22, 0.95603) 8.9%, rgba(20, 20, 22, 0.9296) 12.8%, rgba(20, 20, 22, 0.898904) 16.56%, rgba(20, 20, 22, 0.862963) 20.37%, rgba(20, 20, 22, 0.8208) 24.4%, rgba(20, 20, 22, 0.771437) 28.83%, rgba(20, 20, 22, 0.713896) 33.84%, rgba(20, 20, 22, 0.6472) 39.6%, rgba(20, 20, 22, 0.57037) 46.3%, rgba(20, 20, 22, 0.48243) 54.1%, rgba(20, 20, 22, 0.3824) 63.2%, rgba(20, 20, 22, 0.269304) 73.76%, rgba(20, 20, 22, 0.142163) 85.97%, rgba(20, 20, 22, 0) 100%);
}

.v-theme--dark .gradient .middle {
  top: 0px;
  left: 0px;
  width: 100%;
  bottom: 0px;
  position: absolute;
  /* backdrop-filter: blur(2px); */
  background: linear-gradient(90deg, #141416 0%, rgba(20, 20, 22, 0.987259) 18.7%, rgba(20, 20, 22, 0.951407) 34.9%, rgba(20, 20, 22, 0.896) 48.8%, rgba(20, 20, 22, 0.824593) 60.56%, rgba(20, 20, 22, 0.740741) 70.37%, rgba(20, 20, 22, 0.648) 78.4%, rgba(20, 20, 22, 0.549926) 84.83%, rgba(20, 20, 22, 0.450074) 89.84%, rgba(20, 20, 22, 0.352) 93.6%, rgba(20, 20, 22, 0.259259) 96.3%, rgba(20, 20, 22, 0.175407) 98.1%, rgba(20, 20, 22, 0.104) 99.2%, rgba(20, 20, 22, 0.0485926) 99.76%, rgba(20, 20, 22, 0.0127407) 99.97%, rgba(20, 20, 22, 0) 100%);
}

.v-theme--dark .gradient .bottom {
  width: 100%;
  height: 100px;
  bottom: 0px;
  position: absolute;
  transform: rotate(180deg);
  -ms-transform: rotate(180deg);
  -moz-transform: rotate(180deg);
  /* backdrop-filter: blur(2px); */
  -webkit-transform: rotate(180deg);
  background: linear-gradient(180deg, #141416 0%, rgba(20, 20, 22, 0.97917) 4.7%, rgba(20, 20, 22, 0.95603) 8.9%, rgba(20, 20, 22, 0.9296) 12.8%, rgba(20, 20, 22, 0.898904) 16.56%, rgba(20, 20, 22, 0.862963) 20.37%, rgba(20, 20, 22, 0.8208) 24.4%, rgba(20, 20, 22, 0.771437) 28.83%, rgba(20, 20, 22, 0.713896) 33.84%, rgba(20, 20, 22, 0.6472) 39.6%, rgba(20, 20, 22, 0.57037) 46.3%, rgba(20, 20, 22, 0.48243) 54.1%, rgba(20, 20, 22, 0.3824) 63.2%, rgba(20, 20, 22, 0.269304) 73.76%, rgba(20, 20, 22, 0.142163) 85.97%, rgba(20, 20, 22, 0) 100%);
}

.banner-wrapper {
  position: absolute;
  left: 0px;
  right: 0px;
}

.banner-container {
  width: 100%;
  margin-inline-end: auto;
  margin-inline-start: auto;
  padding-inline-end: 2.3rem;
  padding-inline-start: 2.3rem;
}

.banner-header {
  width: 60%;
  font-size: 3rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  white-space: normal;
}

.banner-subheader {
  font-weight: 400;
  width: 55%;
  font-size: 1rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 6;
  white-space: normal;
}

.v-theme--dark .banner-subheader {
  color: #bcbcbc;
}
</style>

<script setup lang='ts'>
import { isEmpty } from 'lodash';
import { anime } from '@/hydra';
import { SwiperSlide } from 'swiper/vue';
import { computed, ComputedRef, onMounted, ref, Ref } from 'vue';

import defaultBanner from '@/assets/img/default-banner.png';

const props = defineProps({
  animeId: {
    type: String,
    required: false,
  },
  height: {
    type: String,
    default: '510px'
  }
});

const loaded: Ref<boolean> = ref(false);
const computedLoaded: ComputedRef<boolean> = computed(() => loaded.value);

const data: Ref<any> = ref(null);
const computedData: ComputedRef<any> = computed(() => data.value);

async function getAnimeData(): Promise<any> {
  if (props.animeId === 'blank' || isEmpty(props.animeId))
    return;

  return await anime.getAnimeById(props.animeId!);
}

onMounted(async () => {
  try {
    data.value = await getAnimeData();
    if (data.value)
      loaded.value = true;
  } catch (e) {
    console.log(e);
  }
});
</script>

<template>
  <swiper-slide>
    <v-parallax
      :src="!computedData ? defaultBanner : isEmpty(computedData.backgroundUrl) ? defaultBanner : computedData.backgroundUrl"
      class="banner"
      :style="'height: ' + height"
    >
      <span class="gradient">
        <span class="top"></span>
        <span class="middle"></span>
        <span class="bottom"></span>
      </span>

      <div class="d-flex flex-column fill-height justify-center align-center">
        <div class="banner-wrapper">
          <div class="banner-container">
            <v-skeleton-loader
              type="article"
              color="transparent"
              :loading="!computedLoaded"
              style="width: 90vw;"
            >
              <div>
                <v-chip class="mb-2" color="red">New</v-chip>
                <h3 class="banner-header" v-text="computedData.title"></h3>
                <h5 class="banner-subheader mt-2" v-text="computedData.description"></h5>
                <div class="mt-6">
                  <v-btn elevation="0" color="primary" prepend-icon="mdi-eye">
                    <span>Watch</span>
                  </v-btn>
                  <v-btn elevation="0" color="pink" class="ml-2" prepend-icon="mdi-heart">
                    <span>Favorite</span>
                  </v-btn>
                </div>
              </div>
            </v-skeleton-loader>
          </div>
        </div>
      </div>
    </v-parallax>
  </swiper-slide>
</template>