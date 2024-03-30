import Environment from '../../../env';

import { App } from 'vue';
import { createStore, Store } from 'vuex';

import { logger } from '../../base';
import { modules } from '../../imports';
import { LogLevel } from '../../../typings/enums';
import { normalize } from '../../base/utils/string';
import { getExceptionMessage } from '../../base/utils/exceptions';

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