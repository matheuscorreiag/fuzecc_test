module.exports = {
  preset: "jest-expo",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },
  collectCoverageFrom: [
    "hooks/**/*.ts",
    "hooks/**/*.tsx",
    "libs/**/*.ts",
    "libs/**/*.tsx",
    "components/**/*.ts",
    "components/**/*.tsx",
    "!**/*.d.ts",
    "!**/__tests__/**",
  ],
  coverageDirectory: "coverage",
  coverageReporters: ["text", "lcov", "html"],
};
