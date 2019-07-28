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

	constructor()
	{
		super();
	}
}

let a = new Reference();
a.print();


