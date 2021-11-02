const path = require('path');
const webpack = require('webpack');
const withPlugins = require('next-compose-plugins');
const uuid = require('uuid/v4');
const withTM = require('next-transpile-modules')([
  // 'imask',
  // 'axios-concurrency',
  // 'ramda',
  // 'react-spring',
  // 'uuid',
  // 'async',
  // 'async/asyncify',
  // 'async/eachLimit',
  // 'react-preview-file',
  // 'query-string',
  // 'split-on-first',
  // 'd3-ease',
  // '@abraham/reflection',
  // 'strict-uri-encode',
]);
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
const dotenv = require('dotenv');

module.exports = withPlugins([withBundleAnalyzer, withTM], {
  transpileModules: ['pretty-bytes'],
  serverRuntimeConfig: {},
  publicRuntimeConfig: {
    UNIQUE_STATIC_HASH: uuid(),
    ...dotenv.config({ path: `.env.${process.env.NODE_ENV}` }).parsed,
  },
  crossOrigin: 'anonymous',
  sassOptions: {
    prependData: `
        @import './styles/vars.scss';
        @import './styles/mixins.scss';
      `,
  },
  webpack(config, options) {
    config.resolve.alias['~'] = path.join(__dirname);

    config.plugins.push(
      new webpack.IgnorePlugin({
        resourceRegExp: /^\.\/locale$/,
        contextRegExp: /moment$/,
      })
    );

    return config;
  },
});
