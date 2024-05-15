import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import htmlPlugin from '@html-eslint/eslint-plugin';
import htmlParser from '@html-eslint/parser';

export default [
	{
		files: ['*.ts'],
		languageOptions: {
			parser: {
				parseForESLint: tsParser.parseForESLint,
			},
			ecmaVersion: 'latest',
			sourceType: 'module',
		},
		plugins: {
			'@typescript-eslint': tsPlugin,
		},
		rules: {
			'@typescript-eslint/no-unused-vars': 'error',
			indent: ['error', 'tab', { SwitchCase: 1 }],
			'max-len': 'off',
			'@typescript-eslint/explicit-module-boundary-types': 'error',
			'@typescript-eslint/explicit-function-return-type': ['error', { allowExpressions: false }],
			'@typescript-eslint/no-explicit-any': 'error',
			'linebreak-style': ['error', 'unix'],
		},
	},
	{
		files: ['*.html'],
		languageOptions: {
			parser: {
				parseForESLint: htmlParser.parseForESLint,
			},
		},
		plugins: {
			'@html-eslint': htmlPlugin,
		},
		rules: {
			'@html-eslint/require-closing-tags': 'error',
			'@html-eslint/no-duplicate-id': 'error',
		},
	},
];
