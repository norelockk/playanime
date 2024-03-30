

import { isBoolean, isObject, isString } from 'lodash';

import { Module } from 'vuex';

import { LogLevel } from '@/types/enums';

import { logger } from '@/hydra';
import { STORE_INITIALIZATION } from '@/hydra/constants';

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
    showing(state, payload) {
      if (!isBoolean(payload))
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

        if (isObject(payload)) {
          name = (payload as any).name;

          if ((payload as any).wait) isWaiting = true;
        } else if (isString(payload)) name = payload; 

        if (!name || !isString(name)) return;

        const done = (): void => {
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
