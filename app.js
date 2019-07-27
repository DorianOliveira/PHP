
import {SimpleJSCore} from './simple-js-core.js';

export default class App extends SimpleJSCore
{
	constructor()
	{
		super();

		this.Route('home', 'Home', '/', '/screens/home.html');
		// this.SetRoute('levels', 'Levels', '/levels', '/screens/levels.html');
		// this.SetRoute('reference', 'Reference','/reference', '/screens/reference.html');
		// this.SetRoute('single-page', 'Home','/single', '/screens/single.html');

		this.Init();

	}
}

let app = new App();