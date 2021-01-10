// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

module.exports = {
  preset: 'ts-jest/presets/js-with-babel',
  name: 'crypto frontend',
  displayName: 'crypto frontend',
  rootDir: '.',
  testMatch: [
    path.join(
      '<rootDir>',
      path.relative('.', __dirname),
      '/**/?(*.)spec.ts?(x)'
    ),
  ],
  globals: {
    'ts-jest': {
      tsConfig: path.join(__dirname, 'tsconfig.json'),
      babelConfig: path.join('<rootDir>', 'babel.config.js'),
    },
  },
  modulePathIgnorePatterns: ['/cypress/'],
}
