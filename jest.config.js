module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/__mocks__/fileMock.js',
  },
  transform: {
     "^.+\\.(js|jsx|ts|tsx)$": "babel-jest"
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testMatch: [
    '<rootDir>/src/**/*.test.(ts|tsx|js|jsx)',
  ],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
  },
};
