<style scoped>
.countdown {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  position: fixed;
  text-align: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  color: var(--font-color-100);
}

.coming-soon {
  font-weight: 200;
  text-transform: lowercase;
  letter-spacing: 0.7cap;
}

@keyframes ukon-wave {
  50% {
    margin-bottom: 200px;
  }
}

@keyframes glitch-anim-1 {
  0% {
    opacity: 1;
    transform: translate3d(10px, 0, 0);
    -webkit-clip-path: polygon(0 2%, 100% 2%, 100% 5%, 0 5%);
    clip-path: polygon(0 2%, 100% 2%, 100% 5%, 0 5%);
  }

  2% {
    -webkit-clip-path: polygon(0 15%, 100% 15%, 100% 15%, 0 15%);
    clip-path: polygon(0 15%, 100% 15%, 100% 15%, 0 15%);
  }

  4% {
    -webkit-clip-path: polygon(0 10%, 100% 10%, 100% 20%, 0 20%);
    clip-path: polygon(0 10%, 100% 10%, 100% 20%, 0 20%);
  }

  6% {
    -webkit-clip-path: polygon(0 1%, 100% 1%, 100% 2%, 0 2%);
    clip-path: polygon(0 1%, 100% 1%, 100% 2%, 0 2%);
  }

  8% {
    -webkit-clip-path: polygon(0 33%, 100% 33%, 100% 33%, 0 33%);
    clip-path: polygon(0 33%, 100% 33%, 100% 33%, 0 33%);
  }

  10% {
    -webkit-clip-path: polygon(0 44%, 100% 44%, 100% 44%, 0 44%);
    clip-path: polygon(0 44%, 100% 44%, 100% 44%, 0 44%);
  }

  12% {
    -webkit-clip-path: polygon(0 50%, 100% 50%, 100% 20%, 0 20%);
    clip-path: polygon(0 50%, 100% 50%, 100% 20%, 0 20%);
  }

  14% {
    -webkit-clip-path: polygon(0 70%, 100% 70%, 100% 70%, 0 70%);
    clip-path: polygon(0 70%, 100% 70%, 100% 70%, 0 70%);
  }

  16% {
    -webkit-clip-path: polygon(0 80%, 100% 80%, 100% 80%, 0 80%);
    clip-path: polygon(0 80%, 100% 80%, 100% 80%, 0 80%);
  }

  18% {
    -webkit-clip-path: polygon(0 50%, 100% 50%, 100% 55%, 0 55%);
    clip-path: polygon(0 50%, 100% 50%, 100% 55%, 0 55%);
  }

  20% {
    -webkit-clip-path: polygon(0 70%, 100% 70%, 100% 80%, 0 80%);
    clip-path: polygon(0 70%, 100% 70%, 100% 80%, 0 80%);
  }

  21.9% {
    opacity: 1;
    transform: translate3d(10px, 0, 0);
  }

  22%,
  100% {
    opacity: 0;
    transform: translate3d(0, 0, 0);
    -webkit-clip-path: polygon(0 0, 0 0, 0 0, 0 0);
    clip-path: polygon(0 0, 0 0, 0 0, 0 0);
  }
}

@keyframes glitch-anim-2 {
  0% {
    opacity: 1;
    transform: translate3d(calc(-1 * 10px), 0, 0);
    -webkit-clip-path: polygon(0 25%, 100% 25%, 100% 30%, 0 30%);
    clip-path: polygon(0 25%, 100% 25%, 100% 30%, 0 30%);
  }

  3% {
    -webkit-clip-path: polygon(0 3%, 100% 3%, 100% 3%, 0 3%);
    clip-path: polygon(0 3%, 100% 3%, 100% 3%, 0 3%);
  }

  5% {
    -webkit-clip-path: polygon(0 5%, 100% 5%, 100% 20%, 0 20%);
    clip-path: polygon(0 5%, 100% 5%, 100% 20%, 0 20%);
  }

  7% {
    -webkit-clip-path: polygon(0 20%, 100% 20%, 100% 20%, 0 20%);
    clip-path: polygon(0 20%, 100% 20%, 100% 20%, 0 20%);
  }

  9% {
    -webkit-clip-path: polygon(0 40%, 100% 40%, 100% 40%, 0 40%);
    clip-path: polygon(0 40%, 100% 40%, 100% 40%, 0 40%);
  }

  11% {
    -webkit-clip-path: polygon(0 52%, 100% 52%, 100% 59%, 0 59%);
    clip-path: polygon(0 52%, 100% 52%, 100% 59%, 0 59%);
  }

  13% {
    -webkit-clip-path: polygon(0 60%, 100% 60%, 100% 60%, 0 60%);
    clip-path: polygon(0 60%, 100% 60%, 100% 60%, 0 60%);
  }

  15% {
    -webkit-clip-path: polygon(0 75%, 100% 75%, 100% 75%, 0 75%);
    clip-path: polygon(0 75%, 100% 75%, 100% 75%, 0 75%);
  }

  17% {
    -webkit-clip-path: polygon(0 65%, 100% 65%, 100% 40%, 0 40%);
    clip-path: polygon(0 65%, 100% 65%, 100% 40%, 0 40%);
  }

  19% {
    -webkit-clip-path: polygon(0 45%, 100% 45%, 100% 50%, 0 50%);
    clip-path: polygon(0 45%, 100% 45%, 100% 50%, 0 50%);
  }

  20% {
    -webkit-clip-path: polygon(0 14%, 100% 14%, 100% 33%, 0 33%);
    clip-path: polygon(0 14%, 100% 14%, 100% 33%, 0 33%);
  }

  21.9% {
    opacity: 1;
    transform: translate3d(calc(-1 * 10px), 0, 0);
  }

  22%,
  100% {
    opacity: 0;
    transform: translate3d(0, 0, 0);
    -webkit-clip-path: polygon(0 0, 0 0, 0 0, 0 0);
    clip-path: polygon(0 0, 0 0, 0 0, 0 0);
  }
}

.countdown .norelock .glitch {
  position: absolute;
  top: calc(-1 * 5px);
  left: calc(-1 * 10px);
  width: calc(100% + 10px * 2);
  height: calc(100% + 5px * 2);
  background: url('../../assets/img/ukon_2.png') no-repeat center;
  background-color: transparent;
  transform: translate3d(0, 0, 0);
  background-blend-mode: none;
}

.countdown .norelock .glitch:nth-child(n+2) {
  opacity: 0;
}

.countdown .norelock .glitch:nth-child(n+2) {
  animation-duration: 3s;
  animation-delay: 2s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

.countdown .norelock .glitch:nth-child(2) {
  background-color: transparent;
  background-blend-mode: none;
  animation-name: glitch-anim-1;
}

.countdown .norelock .glitch:nth-child(3) {
  background-color: transparent;
  background-blend-mode: none;
  animation-name: glitch-anim-2;
}

.countdown .norelock .glitch:nth-child(4) {
  background-color: transparent;
  background-blend-mode: none;
  animation-name: glitch-anim-3;
}

.countdown .norelock {
  position: absolute;
  margin-bottom: 100px;
  margin-right: 60px;
  width: 100%;
  height: 100%;
  zoom: 0.95;
  animation: ukon-wave 3.5s infinite ease-in-out;
  /* background: url('../../assets/img/ukon_2.png') no-repeat center; */
  opacity: 0.65;
  /* filter: grayscale(1); */

  filter: hue-rotate(280deg);
}

@media screen and (max-width: 639px) {
  .odometer {
    display: none;
  }

  .countdown .norelock {
    display: none;
  }

  .coming-soon {
    font-size: calc(16px + 0.977vw);
  }
}
</style>

<script setup lang='ts'>
/// <reference types="node" />

// Components
import Odometer from '../components/additional/Odometer.vue';

// Dependencies
import { onDeactivated, ref } from 'vue';

// Utils
import { convertSecondsToTime } from '../../hydra/base/utils/number';
// import { AuthorizationApi } from '../../hydra/base/api';
import { createInterval } from '../../hydra/base/utils/delay';

// Constants
const FIND_ODOMETER_MAX_RETRIES: number = 6;

// FIX #1: Find Odometer dependency if it dosen't work
const odometerLoaded = (): boolean => {
  let retries: number = 0;

  if (!odometer.value) {
    retries++;

    if (retries >= FIND_ODOMETER_MAX_RETRIES)
      return false;

    setTimeout(odometerLoaded, 150);
  }

  return true;
};

// Refs
const time = ref<string | number>(0);
const odometer = ref<typeof Odometer | null>(null);

// Countdown date
const date = new Date('April 22, 2024 16:20:00').getTime();

// Destroy countdown timer and if time isn't 0, clear it to 0
const destroyCountdown = (): void => {
  time.value !== 0 && (time.value = 0);
};

// Is Odometer loaded?
const loaded: boolean = odometerLoaded();

// Countdown calculation
const calculate = (): void => {
  if (!loaded)
    return;

  const now: number = Date.now();
  const remaining: number = date - now;

  if (remaining <= 0) {
    destroyCountdown();
    return;
  }

  time.value = convertSecondsToTime(remaining / 1000);
};

calculate();
createInterval(calculate, 1000);

onDeactivated(() => destroyCountdown());
</script>

<template>
  <div class='countdown'>
    <div class='norelock'>
      <div class='glitch'></div>
      <div class='glitch'></div>
      <div class='glitch'></div>
    </div>

    <Odometer ref='odometer' style='font-size: 3rem; text-align: center; font-weight: 600;' :value='time'
      format='dd:dd:dd:dd' />

    <p class='coming-soon' v-text='$t("COMING_SOON")'></p>
  </div>
</template>