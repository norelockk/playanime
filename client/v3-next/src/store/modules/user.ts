import { isBoolean, isObject, isString } from 'lodash';

import { Module } from 'vuex';

import { auth } from '@/hydra';

interface ModuleState {
  data: object;
  token: string | null;
  logged: boolean;
}

const module: Module<ModuleState, {}> = {
  state: {
    data: {},
    token: null,
    logged: false
  },
  getters: {
    data: state => state.data,
    token: state => state.token,
    logged: state => state.logged
  },
  mutations: {
    data(state, payload) {
      if (!isObject(payload))
        return;

      if (state.data === payload)
        return; 

      state.data = payload;
    },
    token(state, payload) {
      if (!isString(payload))
        return; 

      if (state.token === payload) 
        return;

      state.token = payload;
    },
    logged(state, payload) {
      if (!isBoolean(payload))
        return;

      if (state.logged === payload)
        return; 

      state.logged = payload;
    }
  },
  actions: {
    async verifySession({ commit }) {
      return new Promise<void>(async (resolve, reject) => {
        try {
          const data = await auth.verify()!;

          if (data.user && data.user !== null) {
            commit('data', data.user);
            commit('token', data.token);
            commit('logged', true);
          }
        } catch (e) {
          reject(e);
        }

        resolve();
      });
    }
  },
  namespaced: true
};

export default module;