module.exports = {
  roots: ['./'],
  moduleDirectories: ['node_modules', '<rootDir>'],
  testMatch: ['<rootDir>/src/__tests__/**/?(*.)+(spec|test).+(ts|tsx|js)'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
}
