import {SimpleJSCore} from './simple-js-core.js';
import {Page} from './components.js';

export default class App extends SimpleJSCore
{
	constructor()
	{
		super();

		this.Route('home', 'Home', '/', '/screens/', 'home.html');
		this.Route('levels', 'Levels', '/levels', '/screens/', 'levels.html');
		this.Route('reference', 'Reference','/reference', '/screens/', 'reference.html');
		this.Route('single-page', 'Home','/single', '/screens/', 'single.html');

		//REGISTER MODULE: pageId, moduleId, modulePath, moduleResource
		this.RegisterModule('reference', 'reference', '/modules/reference/', 'reference.js');

		//SAMPLE: Can assign same module to many pages
		//this.RegisterModule('levels', 'reference-module', '/modules/reference', 'reference.js');

		this.Init();

		
		//SAMPLE: Can add a page in another page. This throws a Exception
		//this.Pages[0].AddComponent(p);
	}
}

let app = new App();