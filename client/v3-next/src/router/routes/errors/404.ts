import { RouteRecordRaw } from 'vue-router';

const _404: RouteRecordRaw = {
  path: '/:pathMatch(.*)',
  meta: {
    visible: true
  },
  component: () => import('../../../templates/views/errors/404.vue')
};

export default _404;