<style>
.video-js .vjs-time-control {
  display: block;
}
</style>

<script setup lang="ts">
import 'video.js/dist/video-js.css';
import '@silvermine/videojs-quality-selector/dist/css/quality-selector.css';
import '@silvermine/videojs-chromecast/dist/silvermine-videojs-chromecast.css';

import { ref, Ref } from 'vue';
import videojs from 'video.js';

// Quality selector plugin
import qs from '@silvermine/videojs-quality-selector';
qs(videojs);

// Chromecast plugin
import cc from '@silvermine/videojs-chromecast';
cc(videojs, { preloadWebComponents: true })

// Player types
import Player from 'video.js/dist/types/player';

// Player component
import { VideoPlayer } from '@videojs-player/vue';

// Player addons
import { createPlayerContext, destroyPlayerContext } from './PlayerAddons/Context';

// Hydra
import { logger, storage } from '../../../hydra/base';
import { LogLevel } from '../../../typings/enums';

// Refs
const player: Ref<Player | null> = ref(null);
const playerEl: Ref<HTMLVideoElement | null> = ref(null);

// Storage data
let muted: boolean = storage.getStorageData('clientPlayerMuted');
let volume: number = storage.getStorageData('clientPlayerVolume');

// Player props
defineProps({
  animeEpisodeId: {
    type: String 
  }
});

function onPlayerMounted(data: { player: Player, video: HTMLVideoElement }): void {
  if (!player.value && !playerEl.value) {
    player.value = data.player;
    playerEl.value = data.video;
  }

  createPlayerContext(player.value!);

  player.value!.muted(muted || volume === 0);
  player.value!.volume(volume);

  player.value!.src([
    {
      src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      label: 'test1'
    },
    {
      src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      label: 'test2'
    },
  ]);

  logger.log(LogLevel.Event, 'player init', {muted, volume});
}

function onPlayerUnmounted() {
  destroyPlayerContext();

  logger.log(LogLevel.Event, 'player destroy');
}

function onPlayerVolumeChanged(): void {
  if (player.value === null) return;

  const mute: boolean = player.value.muted() as boolean;
  if (muted !== mute) {
    storage.setStorageData('clientPlayerMuted', mute);
    muted = mute;
  }

  const vol: number = player.value.volume() as number;
  if (volume !== vol) {
    storage.setStorageData('clientPlayerVolume', vol);
    volume = vol;
  }
}
</script>

<template>
  <video-player
    :options="{
      plugins: {
        chromecast: {
          addButtonToControlBar: true,
        }
      },
      controls: true,
      autoplay: true,
      techOrder: ['chromecast', 'html5'],
      controlBar: {
        children: ['playToggle', 'volumePanel', 'currentTimeDisplay', 'progressControl', 'qualitySelector', 'pictureInPictureToggle', 'fullscreenToggle']
      }
    }"
    @mounted="onPlayerMounted"
    @unmounted="onPlayerUnmounted"
    @volumechange="onPlayerVolumeChanged"
  />
</template>./PlayerMixins/Context