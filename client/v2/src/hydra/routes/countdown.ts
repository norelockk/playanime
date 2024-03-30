import { RouteRecordRaw } from 'vue-router';

const countdown: RouteRecordRaw = {
  path: '/',
  meta: {
    visible: false
  },
  component: () => import('../../templates/views/Countdown.vue')
};

export default countdown;