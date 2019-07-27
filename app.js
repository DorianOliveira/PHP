import {SimpleJSCore} from './simple-js-core.js';

export default class App extends SimpleJSCore
{
	constructor()
	{
		super();

		let homeRoute = this.Route('home', 'Home', '/', '/screens/home.html');
		let levelsRoute = this.Route('levels', 'Levels', '/levels', '/screens/levels.html');
		// this.SetRoute('reference', 'Reference','/reference', '/screens/reference.html');
		// this.SetRoute('single-page', 'Home','/single', '/screens/single.html');

		

		homeRoute.Page.BindModule('reference', '/modules/reference/', 'reference.js', 'reference.html');

		this.Init();



	}
}

let app = new App();