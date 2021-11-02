import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

const config = {
  DEV: publicRuntimeConfig.ENV !== 'production',

  RENDER_URL: publicRuntimeConfig.NEXT_PUBLIC_BASE_URL,

  SITE_URL: publicRuntimeConfig.NEXT_PUBLIC_BASE_URL,
  API_URL: publicRuntimeConfig.NEXT_PUBLIC_API_URL,

  GRAPHQL: {
    uri: publicRuntimeConfig.NEXT_PUBLIC_GRAPHQL_API_URI,
  },

  reCaptchaKey: publicRuntimeConfig.NEXT_PUBLIC_RECAPTCHA_KEY,

  bugsnag: {
    apiKey: publicRuntimeConfig.BUGSNAG_API_KEY,
  },

  appElement: '#__next',

  GA_TRACKING_ID: publicRuntimeConfig.GA_TRACKING_ID,
  YM_TRACKING_ID: publicRuntimeConfig.YM_TRACKING_ID,
  GTM_TRACKING_ID: publicRuntimeConfig.GTM_TRACKING_ID,
  FB_PIXEL_ID: publicRuntimeConfig.FB_PIXEL_ID,
};

export default config;
