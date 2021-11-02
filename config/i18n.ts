import axios from 'axios';
import config from './index';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

const axiosInstance = axios.create({
  baseURL: process.browser ? '' : config.RENDER_URL,
});

let data;
if (!process.browser) {
  data = require(`~/public/locales/ru-RU/common.json`);
}

let i18nConfig;

if (process.browser) {
  i18nConfig = {
    react: {
      useSuspense: false,
      wait: process.browser,
    },
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      'ru-RU': {
        common: require(`~/public/locales/ru-RU/common.json`),
      },
    },
    backend: {
      ajax: async (url, { init } = { init: {} }, cb) => {
        if (process.browser) {
          try {
            const urlVersion = `${url}?v=${publicRuntimeConfig.UNIQUE_STATIC_HASH}`;

            const res = await axiosInstance(
              urlVersion,
              Object.assign(
                {
                  transformResponse: [(data) => data],
                },
                init
              )
            );

            cb(res.data, res);

            return res;
          } catch (error) {
            cb('', error);
            return error;
          }
        } else {
          cb(data, {});
        }
      },
    },
  };
} else {
  i18nConfig = {
    react: {
      useSuspense: false,
      wait: process.browser,
    },
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      'ru-RU': {
        common: data,
      },
    },
  };
}

export default {
  defaultLanguage: 'ru-RU',
  otherLanguages: ['ru-RU'],
  fallbackLng: 'ru-RU',
  ns: ['common'],
  defaultNS: 'common',
  load: 'currentOnly',
  localePath: 'locales',
  // debug: true,
  ...i18nConfig,
};
