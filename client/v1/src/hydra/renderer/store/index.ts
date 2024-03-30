const storeModules = require.context('./modules', false, /\.ts$/, 'sync');

import Vue from 'vue';
import Vuex, { Store, ModuleTree } from 'vuex';

import { LogLevel } from '@/types/hydra.enums';

import logger from '@/hydra/base/tools/logger';
import { rmdts } from '@/hydra/base/utils/string';

Vue.use(Vuex);

class HydraStore extends Store<any> {
  private static modules: ModuleTree<any> = {};

  constructor() {
    storeModules.keys().forEach(module => HydraStore.modules[rmdts(module)] = (storeModules(module)).default);

    super({
      strict: true,
      modules: HydraStore.modules
    });

    logger.log(LogLevel.Info, 'store constructed', HydraStore.modules);
  }
}

const store: HydraStore = new HydraStore;

export default store;