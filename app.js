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


		this.Pages.FindById('reference')
		 	.BindModule(
		 		'reference',
		 		'/modules/reference/',
		 		'reference.js',
		 		'reference.html');



		this.Init();



	}
}

let app = new App();