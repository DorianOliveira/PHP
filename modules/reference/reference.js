import {Module} from './../../../components.js';
import {ModuloExemplo} from './../../../modules/modulo-exemplo/modulo-exemplo.js';

export class Reference extends Module
{
	async print()
	{

		let html = await this.Templates[0].GetHTML();

		console.log(this.Templates[0]);
		//console.log(html);
	}

	init()
	{

	}

	constructor()
	{
		super();

		this.BindTemplate('reference', '/modules/reference/reference.html');

		//console.log(this);

		
		this.print();
	}


}

new Reference();

