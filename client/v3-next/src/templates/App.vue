<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');

html {
  overflow-y: auto !important;
}

.v-application {
  font-family: 'Poppins', 'Roboto', sans-serif;
}

.odometer.odometer-auto-theme,
.odometer.odometer-theme-default {
  font-family: 'Roboto', sans-serif !important;
  line-height: 1.1em;
}

.tippy-box {
  background-color: #333333c2;
  backdrop-filter: blur(12px);
  margin-left: 5px;
}

.tippy-arrow {
  display: none;
}

.tippy-content {
  font-family: 'Poppins', sans-serif;
}
</style>

<template>
  <Loading />
  <v-app>
    <Navigation />
    <v-main>
      <router-view />
      <Privacy />
    </v-main>
    <Footer />
  </v-app>
</template>

<script setup lang='ts'>
// Components
import Footer from './components/App/Footer.vue';
import Loading from './components/App/Loading.vue';
import Privacy from './components/App/Storage/Privacy.vue';
import Navigation from './components/App/Navigation.vue';

import { onMounted, onBeforeMount, Ref, ref } from 'vue';
import { Store, useStore } from 'vuex';
import { ThemeInstance, useTheme } from 'vuetify';

import { LogLevel } from '@/types/enums';

import { logger, storage } from '@/hydra';
import { APP_LOADING, STORE_INITIALIZATION } from '@/hydra/constants';
import { getExceptionMessage } from '@/hydra/utils/exceptions';

// Constants
const dark: boolean = storage.getStorageData('clientDark');
const theme: ThemeInstance = useTheme();

const store: Store<any> = useStore();
const logged: Ref<boolean> = ref(false);

// Core app logic
const initializeApp = async () => {
  store.dispatch('loading/start', APP_LOADING);

  // toggle theme
  theme.global.name.value = !!dark ? 'dark' : 'light';
  logger.log(LogLevel.Debug, 'theme set to', theme.global.name.value);

  // revert user session
  try {
    if (!logged.value)
      await store.dispatch('user/verifySession');

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
</script>../types/enums