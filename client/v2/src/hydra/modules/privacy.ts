

import { Module } from 'vuex';
import { logger, storage } from '../../hydra/base';
import { LogLevel } from '../../typings/enums';

interface ModuleState {
  showing: boolean;
}

const module: Module<ModuleState, {}> = {
  state: {
    showing: true
  },
  getters: {
    showing: state => state.showing
  },
  mutations: {
    showing(state, payload) {
      if (typeof payload !== 'boolean') 
        return; 

      if (state.showing === payload) 
        return; 

      state.showing = payload;
    }
  },
  actions: {
    init({ commit, getters }) {
      const b = storage.getStorageData('clientPrivacyAccept');

      if (!!b && getters.showing) commit('showing', false);
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