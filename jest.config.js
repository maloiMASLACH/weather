module.exports = {
  testEnvironment: 'jsdom',

  transform: {
    ".(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "./mocks/file-mock.js",
    '.(css|less)$': './mocks/style-mock.js',
    '^.+\\.(js|jsx|ts|tsx|mjs)$': 'babel-jest',
  },
  testMatch: ['**/__tests__/*.test.js?(x)'],
};