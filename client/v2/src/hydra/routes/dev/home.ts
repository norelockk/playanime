import { RouteRecordRaw } from 'vue-router';

const home: RouteRecordRaw = {
  path: '/home',
  meta: {
    visible: true
  },
  component: () => import('../../../templates/views/main/Home.vue')
};

export default home;