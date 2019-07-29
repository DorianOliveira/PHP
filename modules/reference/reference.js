import {Module} from './../../../components.js';
import {ModuloExemplo} from './../../../modules/modulo-exemplo/modulo-exemplo.js';

export class Reference extends Module
{
	print()
	{
		let b = new ModuloExemplo();

		b.print();
		console.log('Module Reference Working!');
	}

	init()
	{

	}

	constructor()
	{
		super();
		this.BindTemplate('reference', 'reference.html');
		
	}
}

let a = new Reference();
a.print();


