import { defineConfig } from 'vite';
import string from 'vite-plugin-string';

type AdjustPathsResult = {
	name: string;
	transformIndexHtml(html: string): string;
};

function adjustPaths(): AdjustPathsResult {
	return {
		name: 'adjust-paths',
		transformIndexHtml(html: string): string {
			return html.replace(/="\//g, '="');
		},
	};
}

export default defineConfig({
	publicDir: 'file',
	plugins: [string(), adjustPaths()],
	build: {
		outDir: 'dist',
		minify: 'esbuild',
		emptyOutDir: true,
	},
});
