module.exports = {
  preset: 'react-native',
  moduleNameMapper: {
    '\\.svg': '<rootDir>/src/__mocks__/svgMock.ts', // ref: https://github.com/kristerkari/react-native-svg-transformer#usage-with-jest
  },
};
