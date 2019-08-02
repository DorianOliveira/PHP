import {Module} from './../../../components.js';
import {ModuloExemplo} from './../../../modules/modulo-exemplo/modulo-exemplo.js';

export class Reference extends Module
{
	async print()
	{
		let html = await this.Templates[0].GetHTML();
	}

	init()
	{
		console.log('Reference iniciado com sucesso!');
	}

	constructor()
	{
		super();

		this.BindTemplate('reference', '/modules/reference/reference.html');
		this.print();
	}
}



