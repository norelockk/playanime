import { RouteRecordRaw } from 'vue-router';

const countdown: RouteRecordRaw = {
  path: '/countdown',
  meta: {
    navigation: {
      icon: 'mdi-clock',
      string: 'NAVIGATION.HOME',
      visible: true,
      requiredAuth: true
    }
  },
  component: () => import('../../templates/views/Countdown.vue')
};

export default countdown;