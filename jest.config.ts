import type { Config } from 'jest';

const config: Config = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: ['<rootDir>/src'],
    testMatch: ['**/*.test.ts'],
    transform: {
        '^.+\\.tlb$': '<rootDir>/scripts/jest-raw.cjs',
        '^.+\\.ts$': [
            'ts-jest',
            {
                useESM: true,
            },
        ],
    },
    transformIgnorePatterns: ['node_modules/(?!(tlb-rest-server)/)'],
    collectCoverageFrom: ['src/**/*.ts', '!src/**/*.test.ts', '!src/**/*.d.ts'],
    coverageDirectory: 'coverage',
    coverageReporters: ['text', 'lcov', 'html'],
    extensionsToTreatAsEsm: ['.ts'],
    moduleNameMapper: {
        '^(.+\\.tlb)\\?raw$': '$1',
        '^(\\.{1,2}/.*)\\.js$': '$1',
    },
};

export default config;
