

import { Module } from 'vuex';
import { STORE_INITIALIZATION } from '../../hydra/base/constants';
import { logger } from '../base';
import { LogLevel } from '../../typings/enums';

interface ModuleState {
  delay: number;
  showing: boolean;
}

let queue: Record<string, boolean> = {
  [STORE_INITIALIZATION]: true,
};

const module: Module<ModuleState, {}> = {
  state: {
    delay: 500,
    showing: true
  },
  getters: {
    delay: state => state.delay,
    showing: state => state.showing
  },
  mutations: {
    delay(state, payload) {
      if (typeof payload !== 'number')
        return;

      if (state.delay === payload)
        return;

      state.delay = payload;
    },
    showing(state, payload) {
      if (typeof payload !== 'boolean')
        return;

      if (state.showing === payload)
        return;

      state.showing = payload;
    }
  },
  actions: {
    async start({ commit, getters }, name) {
      return new Promise<void>(resolve => {
        if (Object.keys(queue).length) {
          if (name in queue) {
            logger.log(LogLevel.Warning, `loading process '${name}' is already queued`);
            return;
          }
        } else {
          commit('showing', true);
        }

        logger.log(LogLevel.Info, `loading process '${name}' started`);

        queue[name] = true;

        setTimeout(resolve, getters.delay);
      });
    },
    async finish({ commit, getters }, payload) {
      return new Promise<void>(resolve => {
        let name: string = '';
        let isWaiting: boolean = false;

        if (typeof payload === 'object') {
          name = payload.name;

          if (payload.wait) isWaiting = true;
        } else if (typeof payload === 'string') name = payload; 

        if (!name || typeof name !== 'string') return;

        const done = () => {
          if (name in queue) delete queue[name];
          if (!Object.keys(queue).length) {
            commit('showing', false);
          }

          setTimeout(resolve, getters.delay);
        };

        if (isWaiting) setTimeout(done, getters.delay);
        else done();

        logger.log(LogLevel.Info, `loading process '${name}' finished`);
      });
    },
    async finishAll({ commit, getters }) {
      return new Promise<void>(resolve => {
        if (Object.keys(queue).length > 0) queue = {};

        commit('showing', false);
        setTimeout(resolve, getters.delay);

        logger.log(LogLevel.Info, `finished all loading processes`);
      });
    }
  },
  namespaced: true
};

export default module;
