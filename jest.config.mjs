import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
  dir: './src',
})

/** @type {import('jest').Config} */
const config = {
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  moduleDirectories: ['node_modules', '<rootDir>/'],
  setupFiles: ['<rootDir>/src/config/jest.setup.ts'],
  testEnvironment: 'jest-environment-jsdom',
  coveragePathIgnorePatterns: ['node_modules', 'src/__generated__', 'src/mocks'],
  coverageDirectory: '<rootDir>/coverage/',
}
export default createJestConfig(config)
