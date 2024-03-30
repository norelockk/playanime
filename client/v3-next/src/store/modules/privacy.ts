import { isBoolean } from 'lodash';

import { Module } from 'vuex';

import { LogLevel } from '@/types/enums';

import { logger, storage } from '@/hydra';

interface ModuleState {
  showing: boolean;
}

const module: Module<ModuleState, {}> = {
  state: {
    showing: false
  },
  getters: {
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
    init({ commit }) {
      const b = storage.getStorageData('clientPrivacyAccept');

      if (!!b)
        commit('showing', false);
      else
        commit('showing', true);
    },
    async accept({ commit, getters }) {
      try {
        await storage.setStorageData('clientPrivacyAccept', true);

        if (getters.showing)
          commit('showing', false);

        logger.log(LogLevel.Success, 'user accepted privacy');
      } catch (e) {
        logger.log(LogLevel.Error, 'fail while accepting privacy', e);
      }
    },
  },
  namespaced: true
};

export default module;