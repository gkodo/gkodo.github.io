// noinspection JSUnusedGlobalSymbols
// noinspection JSCheckFunctionSignatures

function getCurrentDatetime() {
	const date = new Date();

	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const day = String(date.getDate()).padStart(2, '0');
	const hours = String(date.getHours()).padStart(2, '0');
	const minutes = String(date.getMinutes()).padStart(2, '0');
	const seconds = String(date.getSeconds()).padStart(2, '0');

	return `${year}.${month}.${day}.${hours}.${minutes}.${seconds}`;
}

async function prepareReleaseName(options, context) {
	if (!context.env.branch || context.env.branch.trim() === '') {
		context.env.branch = 'RLS/Main';
	}

	if (!context.env.datetime || context.env.datetime.trim() === '') {
		context.env.datetime = getCurrentDatetime();
	}

	context.nextRelease.name = `${context.env.branch}/${context.env.datetime}`;
}

const modifyReleaseNamePlugin = {
	prepare: prepareReleaseName,
};

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
				assets: ['dist.zip', 'CHANGELOG.md', 'LICENSE.md'],
			},
		]);
		break;
	case 'gitlab':
		releaseConfig.plugins.push([
			'@semantic-release/gitlab',
			{
				assets: ['dist.zip', 'CHANGELOG.md', 'LICENSE.md'],
			},
		]);
		break;
	default:
		console.log(`Unknown CI environment: ${ciEnvironment}`);
}

releaseConfig.plugins.push(modifyReleaseNamePlugin);

export default releaseConfig;
