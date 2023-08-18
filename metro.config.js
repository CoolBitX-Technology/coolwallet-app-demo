const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
const defaultConfig = getDefaultConfig(__dirname);
const path = require('path');
/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  alias: {
    '@src': path.resolve(__dirname, 'src'),
  },
  resolver: {
    resolverMainFields: ['react-native', 'browser', 'main'],
  },
};

module.exports = mergeConfig(defaultConfig, config);
