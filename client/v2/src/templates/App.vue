<style>
/* Global styling here */

/*
  Fonts to use:
  - FA (icons)
  - Poppins
*/

@import url('https://pro.fontawesome.com/releases/v5.15.4/css/all.css');
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

:root {
  /* Font colors */
  --font-color-10: hsl(0, 0%, 10%);
  --font-color-15: hsl(0, 0%, 15%);
  --font-color-65: hsl(0, 0%, 65%);
  --font-color-70: hsl(0, 0%, 70%);
  --font-color-75: hsl(0, 0%, 75%);
  --font-color-80: hsl(0, 0%, 80%);
  --font-color-85: hsl(0, 0%, 85%);
  --font-color-90: hsl(0, 0%, 90%);
  --font-color-95: hsl(0, 0%, 95%);
  --font-color-100: hsl(0, 0%, 100%);

  /* Background colors */
  --background-color-5: hsl(0, 0%, 5%);
  --background-color-10: hsl(0, 0%, 10%);
  --background-color-10-035: hsla(0, 0%, 10%, 0.35);
  --background-color-10-08: hsla(0, 0%, 10%, 0.8);
  --background-color-15: hsl(0, 0%, 15%);
  --background-color-20: hsl(0, 0%, 20%);
  --background-color-20-085: hsl(0, 0%, 20%, 0.85);
  --background-color-25: hsl(0, 0%, 25%);
  --background-color-30: hsl(0, 0%, 30%);
  --background-color-35: hsl(0, 0%, 35%);
  --background-color-40: hsl(0, 0%, 40%);
  --background-color-55: hsl(0, 0%, 55%);
  --background-color-55-05: hsla(0, 0%, 55%, 0.5);
  --background-color-60: hsl(0, 0%, 60%);
  --background-color-100: hsl(0, 0%, 100%);

  /* Theme colors */
  --theme-primary-color: hsla(180, 100%, 69%);
  --theme-primary-color-selection: hsla(180, 92.5%, 69%);
  --theme-secondary-color: hsl(300, 100%, 69%);

  /* Border radius */
  --border-radius-primary: 8px;
  --border-radius-secondary: 25px;

  /* Transitions */
  --transition-primary: .3s ease-in-out;

  /* Box shadows */
  --box-shadow-primary: 0px 2px 6px 0px var(--background-color-10);

  /* Decks */
  --anime-deck-img-gradient: linear-gradient(to bottom, rgba(0, 0, 0, 0) 15%, rgba(0, 0, 0, 0.95) 100%);
  --anime-deck-active-button-background: #EBEBEB;
  --anime-deck-active-button-font-color: #242424;
  --anime-deck-disable-button-background: #898989;
  --anime-deck-disable-button-font-color: #242424;

  /* Colors for info, etc */
  --information-color: hsl(211, 100%, 35%);
  --error-color: hsl(0, 73%, 54%);
  --score-rating-color: hsl(47, 100%, 50%);
  --likes-rating-color: hsl(341, 100%, 69%);
  --success-color: hsl(130, 67%, 39%);
}

html {
  font-size: 20px;
  font-family: 'Poppins', sans-serif;
  color: var(--font-color-100);
}

body {
  overflow-x: hidden;
  background: var(--background-color-15);
}

*,
*::after,
*::before {
  margin: 0;
  padding: 0;
  outline: none;
  box-sizing: border-box;
  scroll-behavior: smooth;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

::selection {
  color: var(--theme-primary-color-selection);
  background-color: var(--background-color-5);
}

::-moz-selection {
  color: var(--theme-primary-color-selection);
  background-color: var(--background-color-5);
}


::-webkit-selection {
  color: var(--theme-primary-color-selection);
  background-color: var(--background-color-5);
}

.content {
  margin: 0 auto;
  padding: 0 20px;
  width: 100%;
  max-width: 1550px;
  position: relative;
  min-height: calc(100vh - 60px);
}

.content-overlay {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0px;
  left: 0px;
  background: var(--background-color-10-035);
  z-index: 1;
  opacity: 0;
  visibility: hidden;
  transition: all var(--transition-primary);
  -webkit-transition: all var(--transition-primary);
  -moz-transition: all var(--transition-primary);
  -ms-transition: all var(--transition-primary);
  -o-transition: all var(--transition-primary);
  backdrop-filter: blur(3px);
  z-index: 30;
}

.content-overlay.active {
  opacity: 1;
  visibility: visible;
}

.content-overlay.active+.nav .mobile-nav-wrapper {
  bottom: -60px;
}

.noscroll {
  overflow-y: hidden;
  height: 100vh;
}

@media (max-width:639px) {
  .content {
    margin-top: 90px;
  }
}

button.remove-button {
  background: var(--error-color);
  color: var(--font-color-95);
}

button.confirm-button {
  background: var(--theme-primary-color);
  color: var(--font-color-10);
}
</style>

<template>
  <Loading />
  <Navbar />
  <div class="content">
    <router-view />
  </div>
  <Footer />
  <Privacy />
</template>

<script setup lang='ts'>
// Components
import Navbar from './components/app/Navbar.vue';
import Footer from './components/app/Footer.vue';
import Loading from './components/app/Loading.vue';
import Privacy from './components/storage/Privacy.vue';

import { onMounted, onBeforeMount, Ref, ref } from 'vue';
import { Store, useStore } from 'vuex';

const store: Store<any> = useStore();
const logged: Ref<boolean> = ref(false);

// Constants
import { APP_LOADING, STORE_INITIALIZATION } from '../hydra/base/constants';
import { logger } from '../hydra/base';
import { LogLevel } from '../typings/enums';
import { getExceptionMessage } from '../hydra/base/utils/exceptions';

// Core app logic
const initializeApp = async () => {
  store.dispatch('loading/start', APP_LOADING);

  // revert user session
  try {
    if (!logged.value)
      await store.dispatch('user/verify');

    logged.value = store.getters['user/logged'];
  } catch (e) {
    logger.log(LogLevel.Error, `user data verification failed: ${getExceptionMessage(e as Error)}`);
  }

  logger.log(LogLevel.Debug, 'current user data:', { logged: logged.value, data: store.getters['user/data'] });
  store.dispatch('loading/finish', APP_LOADING);
};

const initializedApp = () => {
  store.dispatch('privacy/init');

  store.dispatch('loading/finish', STORE_INITIALIZATION);
};

onMounted(initializedApp);
onBeforeMount(initializeApp);
</script>