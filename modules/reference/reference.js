import {Module} from './../../components.js';

export class Reference extends Module
{
	print()
	{
		console.log('Module Reference Working!');
	}
}

let a = new Reference();
a.print();
