import { RouteRecordRaw } from 'vue-router';

const home: RouteRecordRaw = {
  path: '/home',
  meta: {
    navigation: {
      icon: 'mdi-home',
      string: 'NAVIGATION.HOME',
      visible: true
    }
  },
  component: () => import('../../templates/views/Home.vue')
};

export default home;