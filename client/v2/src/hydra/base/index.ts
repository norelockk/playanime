import { App, createApp, defineAsyncComponent } from 'vue';
import { plugin as VueTippy } from 'vue-tippy';

import { LogLevel } from '../../typings/enums';
import { AuthorizationApi, UsersApi } from './api';

import Logger from './tools/logger';
import HydraStorage from './storage';
import vuetify from '../app/modules/vuetify';

export const app: App<Element> = createApp(defineAsyncComponent(() => import('../../templates/App.vue')));

export const auth: AuthorizationApi = new AuthorizationApi();
export const users: UsersApi = new UsersApi();

export const logger: Logger = new Logger({ logLevel: LogLevel.Debug });
export const storage: HydraStorage = new HydraStorage();
export const element: HTMLElement = document.querySelector('#app') ?? document.getElementById('app')!;

app.use(VueTippy, { directive: 'tippy', defaultProps: { placement: 'bottom', animation: 'scale', allowHTML: true } });
app.use(vuetify);