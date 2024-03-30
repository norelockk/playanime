// renderer components
const App = async () => await import('@/templates/App.vue');
import store from './store';
import router from './router';

// dependencies
import Vue from 'vue';
import VueTippy, { TippyComponent } from 'vue-tippy';
import { browserTracingIntegration, init as initSentry, replayIntegration } from '@sentry/vue';

// tools
import logger from '../base/tools/logger';

// types
import { LogLevel } from '@/types/hydra.enums';

// environment
import Environment, { HydraEnvironment } from '../environment';

// config
Vue.config.async = !!HydraEnvironment.production
Vue.config.silent = !!HydraEnvironment.production
Vue.config.devtools = !!HydraEnvironment.development
Vue.config.productionTip = !!HydraEnvironment.development

// third-party components
Vue.use(VueTippy, { directive: 'tooltip' });
Vue.component('tooltip', TippyComponent);

// sentry
initSentry({
  Vue,
  dsn: Environment.APP_SENTRY_DSN,
  integrations: [
    replayIntegration({
      maskAllText: false,
      blockAllMedia: false
    }),
    browserTracingIntegration(),
  ],
  tracesSampleRate: 1,
  tracePropagationTargets: Environment.APP_SENTRY_TARGETS,
  replaysSessionSampleRate: !!HydraEnvironment.development ? 1 : 0.1,
  replaysOnErrorSampleRate: 1
});

export default class Renderer extends Vue {
  // static properties
  private static readonly element: HTMLElement = document.getElementById('app') ?? document.querySelector('#app')!;

  constructor() {
    super({
      el: Renderer.element,
      store,
      router,
      render: apply => apply(App)
    });

    logger.log(LogLevel.Info, 'renderer constructed');
  }
}