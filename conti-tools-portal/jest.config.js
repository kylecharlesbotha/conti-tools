module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  globals: {
    'ts-jest': {
      tsconfig: {
        allowJs: true
      }
    }
  },
  verbose: true,
  moduleFileExtensions: ['js', 'ts', 'tsx'],
  testMatch: ['**/*.test.+(ts|tsx|js)', '**/__tests__/*.+(ts|tsx|js)'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  },
  testPathIgnorePatterns: [
    '/node_modules/',
    '(/__tests__/.*|(\\.|/)(test|spec))\\.d.ts$'
  ]
};
