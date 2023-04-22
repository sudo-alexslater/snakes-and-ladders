import type { Config } from 'jest';

const config: Config = {
	clearMocks: true,
	testEnvironment: 'node',
	testMatch: ['**/unit-tests/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[tj]s?(x)', '**/*.steps.[jt]s?(x)'],
	transform: {
		'^.+\\.tsx?$': 'ts-jest',
	},
	coverageDirectory: './coverage',
};

export default config;
