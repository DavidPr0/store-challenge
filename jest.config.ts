// jest.config.ts

import nextJest from "next/jest";
import type { Config } from "jest";

// Forneça o diretório raiz da sua app Next
const createJestConfig = nextJest({
  dir: "./",
});

// Configurações personalizadas de Jest
const customJestConfig: Config = {
  testEnvironment: "jest-environment-jsdom",
  // Se quiser gerar cobertura de testes
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageReporters: ["lcov", "text"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};

// Exporte a config final
export default createJestConfig(customJestConfig);
