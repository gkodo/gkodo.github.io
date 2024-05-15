// noinspection JSUnusedGlobalSymbols
// noinspection JSCheckFunctionSignatures

const releaseConfig = {
	branches: ['RLS/Main'],
	plugins: [
		'@semantic-release/commit-analyzer',
		'@semantic-release/release-notes-generator',
		'@semantic-release/changelog',
		[
			'@semantic-release/npm',
			{
				npmPublish: false,
			},
		],
		[
			'@semantic-release/git',
			{
				assets: ['package.json', 'CHANGELOG.md'],
			},
		],
	],
};

const ciEnvironment = process.env.CI_ENVIRONMENT;
switch (ciEnvironment) {
	case 'github':
		releaseConfig.plugins.push([
			'@semantic-release/github',
			{
				releaseTitle: '${process.env.BRANCH}/${process.env.DATETIME}',
				assets: [
					{path: 'dist.zip', label: 'Build distributable'},
					{path: 'CHANGELOG.md', label: 'Changelog'},
					{path: 'LICENSE.md', label: 'License'},
				],
			},
		]);
		break;
	case 'gitlab':
		releaseConfig.plugins.push([
			'@semantic-release/gitlab',
			{
				releaseTitle: '${process.env.BRANCH}/${process.env.DATETIME}',
				assets: [
					{path: 'dist.zip', label: 'Build distributable'},
					{path: 'CHANGELOG.md', label: 'Changelog'},
					{path: 'LICENSE.md', label: 'License'},
				],
			},
		]);
		break;
	default:
		console.log(`Unknown CI environment: ${ciEnvironment}`);
}

export default releaseConfig;
