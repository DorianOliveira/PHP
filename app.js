
import {SimpleJSCore} from './simple-js-core.js';

export default class App extends SimpleJSCore
{
	constructor()
	{
		super();

		this.Route('/', '/screens/home.html');
		this.Route('/levels', '/screens/levels.html');
		this.Route('/reference', '/screens/reference.html');
		this.Route('/single', '/screens/single.html');

		this.Init();

	}
}

let app = new App();

