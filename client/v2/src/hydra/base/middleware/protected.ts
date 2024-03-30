import { Store, useStore } from 'vuex';
import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

import { logger } from '..';
import { LogLevel } from '../../../typings/enums';

export default function protectedMiddleware(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) {
  const store: Store<any> = useStore();

  if (!store.getters['user/logged']) {
    logger.log(LogLevel.Warning, `User is not logged while trying to access '${to.name as string}' route, redirecting to login page`);

    return next({ path: '/login', query: { redirect: from.fullPath }});
  }

  return next();
}