<style>
.video-js .vjs-time-control {
  display: block;
}

.player-context,
.player-tattoo {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  position: absolute;
}

.player-tattoo {
  pointer-events: none;
}

.player-context-logo {
  border-radius: 5px;
  background: url(../../../../assets/img/logo.svg);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: bottom;
  background-color: #13131355;
  backdrop-filter: blur(12px);
  width: 31px;
  height: 31px;
}

.player-context-element-inner {
  display: flex;
}

.player-context-text {
  border-radius: 5px;
  background-color: #13131355;
  backdrop-filter: blur(12px);
  margin-left: 3px;
  padding: 4px 6px 4px 6px;
  color: #fff;
  font-size: 14px;
  font-family: monospace;
}

.player-controls {
  left: 0;
  right: 0;
  width: 100%;
  height: 3.5rem;
  bottom: 0;
  position: absolute;
  background-color: transparent;
}
</style>

<script setup lang="ts">
import 'video.js/dist/video-js.css';
import '@silvermine/videojs-quality-selector/dist/css/quality-selector.css';
import '@silvermine/videojs-chromecast/dist/silvermine-videojs-chromecast.css';

import { ref, Ref } from 'vue';
import { Store, useStore } from 'vuex';

import Player from 'video.js/dist/types/player';
import videojs from 'video.js';
import { VideoPlayer } from '@videojs-player/vue';
import cc from '@silvermine/videojs-chromecast';
import qs from '@silvermine/videojs-quality-selector';

import { logger, storage } from '@/hydra';
import { LogLevel, PlayerTattooDestroyReason } from '@/types/enums';

import { setupPlayerTattoo, destroyPlayerTattoo } from './Components/Tattoo';
import { setupPlayerContext, destroyPlayerContext } from './Components/Context';

import Wrapper from './Components/Wrapper.vue';

const store: Store<any> = useStore();

// Refs
const player: Ref<Player | null> = ref(null);
const playerParent: Ref<ParentNode | null> = ref(null);
const playerEl: Ref<HTMLVideoElement | null> = ref(null);

// Computed
// const logged: ComputedRef<boolean> = computed(() => store.getters['user/logged']);

// Storage data
let muted: boolean = storage.getStorageData('clientPlayerMuted');
let volume: number = storage.getStorageData('clientPlayerVolume');

// Player props
defineProps({
  animeEpisodeId: {
    type: String
  }
});

cc(videojs, { preloadWebComponents: true });
qs(videojs);

function onPlayerMounted(data: { player: Player, video: HTMLVideoElement }): void {
  if (!player.value && !playerEl.value && !playerParent.value) {
    player.value = data.player;
    playerEl.value = data.video;
    playerParent.value = playerEl.value.parentNode;
  }

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

  // if (logged.value)
  // createPlayerContext(player.value!, playerParent.value);

  setupPlayerTattoo({ user: store.getters['user/data'], episode: {}, player: player.value as Player })
  setupPlayerContext(player.value!);


  logger.log(LogLevel.Event, 'player init', { muted, volume });
}

function onPlayerUnmounted() {
  destroyPlayerTattoo(PlayerTattooDestroyReason.PlayerDisposed);
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
  <wrapper>
    <video-player
      :options="{
        fluid: true,
        plugins: {
          chromecast: {
            addButtonToControlBar: true,
          }
        },
        controls: true,
        autoplay: true,
        techOrder: ['chromecast', 'html5'],
        controlBar: {
          children: ['playToggle', 'volumePanel', 'currentTimeDisplay', 'progressControl', 'remainingTimeDisplay', 'qualitySelector', 'pictureInPictureToggle', 'fullscreenToggle']
        }
      }"
      @mounted="onPlayerMounted"
      @unmounted="onPlayerUnmounted"
      @volumechange="onPlayerVolumeChanged" 
    >
      <!-- <template v-slot="{ player, state }">
        <div class="player-controls">
          {{ state }}
        </div>
      </template> -->
    </video-player>
  </wrapper>
</template>../../../../types/enums./Components/Wrapper.vue