export default {
  transform: {
    "^.+\\.js$": "babel-jest" // Use babel-jest to transform ES modules
  },
  transformIgnorePatterns: [
    "/node_modules/" // Ignore node_modules directory
  ],
  testEnvironment: 'node', // Set test environment to node
  globals: {
    'ts-jest': {
      useESM: true, // Enable ES module support for ts-jest
    },
  },
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1', // Map module paths correctly
  },
};
