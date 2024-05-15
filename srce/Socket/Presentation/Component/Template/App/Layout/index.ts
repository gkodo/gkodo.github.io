import { CSSResult, LitElement, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

import rawComponentCSS from './index.scss?inline';
import rawComponentHTML from './index.html?raw';

const tagName: string = 'gk-app-layout';
const componentCSS: CSSResult = unsafeCSS(rawComponentCSS);
const componentHTML: HTMLResult = unsafeHTML(rawComponentHTML);

@customElement(tagName)
export default class GkAppLayout extends LitElement {
	static override styles: CSSResult = componentCSS;

	override render(): HTMLResult {
		return componentHTML;
	}
}

export { GkAppLayout };
