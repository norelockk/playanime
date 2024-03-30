import { isArray, isFunction } from 'lodash';

import { App } from 'vue';
import { Store, useStore } from 'vuex';
import { createRouter, createWebHashHistory, createWebHistory, RouteMeta, Router } from 'vue-router';

import { middlewares, routes } from '../../imports';

import { logger } from '../../base';
import { LogLevel } from '../../../typings/enums';
import { normalize } from '../../base/utils/string';
import { getExceptionMessage } from '../../base/utils/exceptions';

const router = (app: App) => {
  const router: Router = createRouter({ routes: [], strict: true, history: import.meta.env.DEV ? createWebHashHistory(import.meta.env.BASE_URL) : createWebHistory(import.meta.env.BASE_URL) });

  // Register middlewares
  const _middlewares: { [key: string]: any } = {};

  for (const path in middlewares) {
    if (Object.prototype.hasOwnProperty.call(middlewares, path)) {
      const name = normalize('path', path);
      const locale = (middlewares[path] as any).default;

      try {
        locale && (
          _middlewares[name] = locale,
          logger.log(LogLevel.Step, `${name} middleware has been loaded in memory`)
        );
      } catch (error) {
        logger.log(LogLevel.Error, `error while loading ${name} middleware in memory: ${getExceptionMessage(error as Error)}`, (error as Error)!.stack);
        throw error;
      }
    }
  }

  // Register routes
  for (const path in routes) {
    if (Object.prototype.hasOwnProperty.call(routes, path)) {
      const name = normalize('path', path);
      const route = (routes[path] as any).default;

      try {
        route && (
          router.addRoute(name, route),
          logger.log(LogLevel.Step, `'${name}' route has been registered in router`)
        );
      } catch (error) {
        logger.log(LogLevel.Error, `error while registering '${name}' router module: ${getExceptionMessage(error as Error)}`, (error as Error)!.stack);
        throw error;
      }
    }
  }

  // Apply middleware to routes
  router.beforeEach(async (to, from, next) => {
    const matched = to.matched;
    const length: number = matched.length;

    for (let index = 0; index < length; index++) {
      const meta = matched[index].meta as RouteMeta;

      if (meta) {
        const store: Store<any> = useStore();

        // handling loading screen (when async function etc)
        if ('loading' in meta) {
          try {
            await store.dispatch('loading/start', meta.loading);
          } catch (e) {
            throw new Error(`Error on starting loading ${meta.loading}`);
          }
        }

        // handling middleware
        if ('middleware' in meta) {
          let middleware = meta.middleware as string[];

          if (typeof middleware === 'string')
            middleware = [middleware];
          else if (!isArray(middleware))
            throw new Error('Invalid route middleware type');

          for (const middlewareName of middleware) {
            if (!(middlewareName in _middlewares)) throw new Error(`Middleware '${middlewareName}' is not registered`);

            const middlewareFunction = _middlewares[middlewareName];
            if (!isFunction(middlewareFunction)) throw new Error(`Middleware '${middlewareName}' is not a function`);

            return middlewareFunction(to, from, next);
          }
        }
      }
    }

    return next();
  });

  app.use(router);

  return true;
};

export default router;