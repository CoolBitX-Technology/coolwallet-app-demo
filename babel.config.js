module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@': '.',
          '@src': './src',
          '@scripts': './scripts',
        },
      },
    ],
    ['@babel/plugin-transform-flow-strip-types', { loose: false }],
    ["@babel/plugin-transform-private-methods", { loose: false }],
    ["@babel/plugin-transform-private-property-in-object", { loose: false }],
    ["@babel/plugin-transform-class-properties", { loose: false }],
  ],
};
