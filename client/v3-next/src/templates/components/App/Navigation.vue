<script setup lang="ts">
import { ref, Ref, computed, ComputedRef } from 'vue';
import { Store, useStore } from 'vuex';
import { ThemeInstance, useTheme } from 'vuetify';
import { Router, useRouter } from 'vue-router';

import { LogLevel } from '@/types/enums';

import { logger, storage } from '@/hydra';

import logo from '@/assets/img/logo.svg';

const store: Store<any> = useStore();
const theme: ThemeInstance = useTheme();
const router: Router = useRouter();

const rail: Ref<boolean> = ref(true);
const logged: ComputedRef<boolean> = computed(() => store.getters['user/logged']);
const userData: ComputedRef<any> = computed(() => store.getters['user/data']);

let isDark: boolean = storage.getStorageData('clientDark');

let navItems: any[] = [];

for (const route of router.getRoutes()) {
  if ('navigation' in route.meta && (route.meta.navigation as any).visible)
    navItems.push({
      path: route.path,
      icon: (route.meta.navigation as any).icon || 'mdi-folder',
      title: (route.meta.navigation as any).string || 'N/A',
      requiredAuth: (route.meta.navigation as any).requiredAuth || false,
      loggedVisible: (route.meta.navigation as any).loggedVisible || true
    });
}

navItems = navItems.sort((a, b) => a.path.length - b.path.length);

const navItemsFiltered: ComputedRef<any[]> = computed(() => {
  if (logged.value)
    return navItems;

  return navItems.filter(item => !item.requiredAuth);
});

const toggleTheme = (): void => {
  isDark = !isDark;
  storage.setStorageData('clientDark', isDark);

  theme.global.name.value = isDark ? 'dark' : 'light';

  logger.log(LogLevel.Debug, 'theme switched to', theme.global.name.value);
};

</script>

<template>
  <v-navigation-drawer
    color="transparent"
    style="backdrop-filter: blur(12px);"
    v-model:rail="rail"
  >
    <v-list>
      <v-list-item :prepend-avatar="logo" />
    </v-list>

    <v-divider />

    <v-list density="compact" nav>
      <v-list-item
        :to="item.path"
        :prepend-icon="item.icon"
        v-for="item in navItemsFiltered"
        v-tippy="{ content: $t(item.title), placement: 'left' }"
      />
    </v-list>

    <v-divider />

    <v-list density="compact" nav>
      <span v-if="logged">
        <v-list-item
          :to="'/users/' + userData.id"
          prepend-icon="mdi-account"
        />
      </span>
    </v-list>

    <v-divider />

    <v-list density="compact" nav>
      <v-list-item
        @click="toggleTheme"
        :prepend-icon="theme.global.name.value === 'light' ? 'mdi-moon-waning-crescent' : 'mdi-weather-sunny'"
        v-tippy="{ content: $t(`NAVIGATION.OPTIONS.THEME.${theme.global.name.value === 'dark' ? 'LIGHT' : 'DARK'}`), placement: 'left' }"
      />
    </v-list>
  </v-navigation-drawer>
</template>../../../types/enums