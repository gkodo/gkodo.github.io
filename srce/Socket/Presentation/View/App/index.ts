import { CSSResult, html, LitElement, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';

import rawComponentCSS from './index.scss?inline';

import '/srce/Socket/Presentation/Component/Template/App/Layout';

const tagName: string = 'gk-app';
const componentCSS: CSSResult = unsafeCSS(rawComponentCSS);

@customElement(tagName)
export default class GkApp extends LitElement {
	static override styles: CSSResult = componentCSS;

	override render(): HTMLResult {
		return html`
			<gk-app-layout>
				<div slot="header">Header for GKodo</div>
				<div slot="navbar">Navbar</div>
				<div slot="content">Content</div>
				<div slot="sidebar">Sidebar</div>
				<div slot="footer">Footer</div>
			</gk-app-layout>
		`;
	}
}

export { GkApp };
