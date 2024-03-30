import { Store } from 'vuex';
import { NavigationGuardNext, Route } from 'vue-router';

import logger from '@/hydra/base/tools/logger';
import { LogLevel } from '@/types/hydra.enums';

export default function protectedMiddleware(to: Route, from: Route, next: NavigationGuardNext<Vue>, store: Store<any>): void {
  if (!store.getters['user/logged']) {
    logger.log(LogLevel.Warning, `User is not logged while trying to access ${typeof to.name === 'string' ? `'${to.name}'` : 'unnamed'} route, redirecting to login page`);
    return next({ path: '/login', query: { redirect: from.fullPath }});
  }

  return next();
}