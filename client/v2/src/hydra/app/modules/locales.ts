import { isEmpty } from 'lodash';

import { App } from 'vue';
import { createI18n, I18n } from 'vue-i18n';

import { locales } from '../../imports';

import { logger, storage } from '../../base';
import { normalize } from '../../base/utils/string';

import { LogLevel } from '../../../typings/enums';
import { getExceptionMessage } from '../../base/utils/exceptions';

const storageLang: string = storage.getStorageData('clientLanguage');
const currentUserLocale: string = navigator.language.includes('-') ? navigator.language.split('-')[0] : 'en';

const locale = (app: App) => {
  // Set client language if not stored
  const pass = !!(typeof storageLang !== 'string' || isEmpty(storageLang));
  const l = pass ? currentUserLocale : storageLang;

  // Parse and load locales
  const messages: { [key: string]: any } = {};

  for (const path in locales) {
    if (Object.prototype.hasOwnProperty.call(locales, path)) {
      const name = normalize('path', path);
      const locale = (locales[path] as any).default;

      try {
        locale && (
          messages[name] = locale,
          logger.log(LogLevel.Step, `${name} locale has been loaded in memory`)
        );
      } catch (error) {
        logger.log(LogLevel.Error, `error while loading ${name} locale in memory: ${getExceptionMessage(error as Error)}`, (error as Error)!.stack);
        throw error;
      }
    }
  }

  if (pass) {
    logger.log(LogLevel.Info, 'set store user language to', currentUserLocale);
    storage.setStorageData('clientLanguage', currentUserLocale);
  }
  
  logger.log(LogLevel.Debug, 'current used locale', l);

  // Initialize i18n
  const i18n: I18n = createI18n({
    locale: l,
    messages,
    fallbackLocale: 'en'
  });

  app.use(i18n);

  return true;
};

export default locale;