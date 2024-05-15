import { DirectiveResult } from 'lit/directive.js';
import { UnsafeHTMLDirective } from 'lit/directives/unsafe-html.js';

declare global {
	type HTMLResult = DirectiveResult<typeof UnsafeHTMLDirective>;
}

declare module '*.css' {
	const content: string;
	export default content;
}

declare module '*.html' {
	const content: string;
	export default content;
}
