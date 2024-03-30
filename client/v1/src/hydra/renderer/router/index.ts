const routes = require.context('./routes', false, /\.ts$/, 'sync');
const middlewares = require.context('./middleware', false, /\.ts$/, 'sync');

const middleware: { [key: string]: any } = {};

import { isArray, isFunction } from 'lodash';

import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

import { LogLevel } from '@/types/hydra.enums';

import store from '../store';
import logger from '@/hydra/base/tools/logger';
import { rmdts } from '@/hydra/base/utils/string';

Vue.use(VueRouter);

class HydraRouter extends VueRouter {
  private static routes: Array<RouteConfig> = [];

  constructor() {
    routes.keys().forEach(route => HydraRouter.routes.push(routes(route).default));
    middlewares.keys().forEach(middle => middleware[rmdts(middle)] = (middlewares(middle)).default);

    super({
      routes: HydraRouter.routes,
      linkExactActiveClass: 'active',
    });

    this.beforeEach(async (to, from, next) => {
      for (let index = 0; index < to.matched.length; index++) {
        const matched = to.matched[index];

        if (matched) {
          const { meta } = matched;

          if (meta) {
            if ('loading' in meta && typeof meta.loading === 'string') {
              try {
                await store.dispatch('loading/start', meta.loading);
              } catch (e) {
                throw new ReferenceError(`Starting loading '${meta.loading}' failed: ${e}`)
              }
            } 

            if ('middleware' in meta) {
              let use = meta.middleware as string[];

              if (typeof use === 'string')
                use = [use];
              else if (!isArray(use))
                throw new ReferenceError('Invalid middleware use type');

              for (const name of use) {
                if (!(name in middleware)) throw new ReferenceError(`Middleware '${name}' is not registered`);

                const fn = middleware[name];
                if (!isFunction(fn)) throw new ReferenceError(`Middleware '${name}' is not a function`);

                return fn(to, from, next, store);
              }
            }
          }
        }
      }

      return next();
    });

    logger.log(LogLevel.Info, 'router constructed', HydraRouter.routes);
  }
}

const router: HydraRouter = new HydraRouter;

export default router;