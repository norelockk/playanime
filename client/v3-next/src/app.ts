// Dependencies
import { isFunction } from 'lodash';
import { init as initSentry, browserTracingIntegration, replayIntegration } from '@sentry/vue';

// Environment
import environment from '@/env';

// Typings
import { LogLevel } from '@/types/enums';

// Base
import { app, element, logger } from '@/hydra';
import { getExceptionMessage } from '@/hydra/utils/exceptions';

// Modules
import locale from '@/i18n';
import store from '@/store';
import router from '@/router';

const modules: Function[] = [store, router, locale];
const initialized: number = Date.now();

export default function loadApp(): void {
  // iniitalize sentry
  initSentry({
    app,
    dsn: environment.DATA.SENTRY_DSN,
    integrations: [
      replayIntegration({
        blockAllMedia: false
      }),
      browserTracingIntegration(),
    ],
    tracesSampleRate: 1,
    tracePropagationTargets: environment.DATA.SENTRY_TRACING,
    replaysSessionSampleRate: environment.PRODUCTION ? 1 : 0,
    replaysOnErrorSampleRate: environment.PRODUCTION ? 1 : 0,
  });

  // load app modules
  const len: number = modules.length;
  let loaded: number = 0;

  for (let i = 0; i < len; i++) {
    const now: number = Date.now();
    const module: Function = modules[i];

    if (!isFunction(module)) {
      logger.log(LogLevel.Warning, `module at index ${i} is not an function, skipping`);
      continue;
    }

    try {
      const moduleCalled: boolean = module(app);
      moduleCalled && (
        loaded++,
        logger.log(LogLevel.Success, `app module '${module.name}' finished loading in ${Date.now() - now} ms`)
      );
    } catch (error) {
      logger.log(LogLevel.Error, `app module '${module.name}' failed loading: ${getExceptionMessage(error as Error)}`, error);
    }
  }

  // finally mount it to element

  if (loaded >= len) {
    try {
      app.mount(element);

      logger.log(LogLevel.Event, `app loaded successfully in ${Date.now() - initialized} ms`);
    } catch (error) {
      logger.log(LogLevel.Error, `app failed mounting: ${getExceptionMessage(error as Error)}`, error);
      throw error;
    }

    logger.log(LogLevel.Success, 'hello wowld!!! OwO');
  }
}