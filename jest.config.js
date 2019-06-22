module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: [
    '**/src/**/__tests__/*.test.ts'
  ],
  collectCoverageFrom: [
    'src/**/*.ts'
  ],
  setupFiles: ['./testSetup.js'],
  rootDir: 'src',
  moduleNameMapper: {
    // '^store': '<rootDir>/store',
    // '^services/(.+)': '<rootDir>/services/$1',
    // '^utils/(.+)': '<rootDir>/utils/$1'
  }
};
