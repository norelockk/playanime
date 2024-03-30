import { global } from './hydra/base';
import { LogLevel } from './types/hydra.enums';

import Hydra from './hydra';
import logger from './hydra/base/tools/logger';

function load(): void {
  try {
    eval('let a = {}; a?.b;')
  } catch (x) {
    return alert('browser does not support ES6'), void window.location.replace('about:blank');
  }

  // Application data
  const obj: { [key: string]: any } = {
    // Application informations
    __VIBESTREAM_APP__                    : true,
    __VIBESTREAM_APP_VER__                : [24, 0, 0],
    __VIBESTREAM_APP_VER_CN__             : 'indev',

    // Application settings
    __VIBESTREAM_API_PATH__               : '/api/v1/',
    __VIBESTREAM_RELAY_PATH__             : '/relay/v1'
  };

  function* resolveProperties() {
    for (const key of Object.keys(obj))
      yield { key, value: obj[key] };
  }

  for (const data of resolveProperties()) {
    try {
      const defined = !!Object.defineProperty(global, data.key, {
        get: function() {
          return data.value;
        },
        set: function() {
          throw new ReferenceError('You cannot modify our application-based variables');
        }
      });

      if (defined) {
        logger.log(LogLevel.Step, 'define', data.key, 'with value:', JSON.stringify(data.value));
      }
    } catch (error: any) {
      throw new ReferenceError(error);
    }
  }

  const hydra: Hydra = new Hydra;

  hydra && logger.log(LogLevel.Debug, 'hydra initialized');
};

global.onload = load;