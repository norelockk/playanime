import { App, createApp, defineAsyncComponent } from 'vue';
import { plugin as VueTippy } from 'vue-tippy';

import vuetify from '@/vuetify';

import Logger from './tools/logger';
import HydraStorage from './storage';

import { LogLevel } from '@/types/enums';

import { AnimeApi, AuthorizationApi, UsersApi } from './api';

export const app: App<Element> = createApp(defineAsyncComponent(() => import('@/templates/App.vue')));

export const auth: AuthorizationApi = new AuthorizationApi();
export const users: UsersApi = new UsersApi();
export const anime: AnimeApi = new AnimeApi();

export const logger: Logger = new Logger({ logLevel: LogLevel.Debug });
export const storage: HydraStorage = new HydraStorage();
export const element: HTMLElement = document.querySelector('#app') ?? document.getElementById('app')!;

app.use(vuetify);
app.use(VueTippy, { directive: 'tippy', defaultProps: { placement: 'bottom', animation: 'shift-toward', allowHTML: true } });