import {SimpleJSCore} from './simple-js-core.js';

export default class App extends SimpleJSCore
{
	constructor()
	{
		super();

		this.Route('home', 'Home', '/', '/screens/home.html');
		this.Route('levels', 'Levels', '/levels', '/screens/levels.html');
		this.Route('reference', 'Reference','/reference', '/screens/reference.html');
		this.Route('single-page', 'Home','/single', '/screens/single.html');

		//SAMPLE: Calling same template in a different path
		this.Route('reference2', 'Reference','/reference/levels', '/screens/levels.html');

		//REGISTER MODULE: pageId, moduleId, modulePath, moduleResource
		this.RegisterModule('reference', 'reference-module', '/modules/reference/teste', 'reference.js');
		
		//SAMPLE: Can assign same module to many pages
		//this.RegisterModule('levels', 'reference-module', '/modules/reference', 'reference.js');

		this.Init();
	}
}

let app = new App();