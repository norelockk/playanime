import { App } from 'vue';
import { createStore, Store } from 'vuex';

import Environment from '@/env';

import { modules } from '@/imports';

import { LogLevel } from '@/types/enums';

import { logger } from '@/hydra';
import { normalize } from '@/hydra/utils/string';
import { getExceptionMessage } from '@/hydra/utils/exceptions';

const store = (app: App) => {
  const store: Store<any> = createStore({ strict: true, devtools: Environment.DEVELOPMENT });

  for (const path in modules) {
    if (Object.prototype.hasOwnProperty.call(modules, path)) {
      const name = normalize('path', path);
      const module = (modules[path] as any).default;

      try {
        module && (
          store.registerModule(name, module),
          logger.log(LogLevel.Step, `'${name}' module has been registered in store`)
        );
      } catch (error) {
        logger.log(LogLevel.Error, `error while registering '${name}' store module: ${getExceptionMessage(error as Error)}`, (error as Error)!.stack);
        throw error;
      }
    }
  }

  app.use(store);

  return true;
};

export default store;