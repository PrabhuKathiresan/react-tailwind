/** @type {import('jest').Config} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',

  // Look for .test.tsx files
  testMatch: ['**/*.test.tsx', '**/*.test.ts'],

  // For React + TSX
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],

  // Mock styles & assets
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(svg)$': '<rootDir>/tests/__mocks__/svgMock.js',
  },

  setupFilesAfterEnv: ['<rootDir>/tests/setupTests.ts'],
}
