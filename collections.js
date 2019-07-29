import {Route, Component, Module, Page} from './components.js';

export class Collections extends Array
{
	constructor(...items)
	{
		super(...items);
	}

	removeAt(index)
	{
		this.splice(index, 1);
	}

	add(item)
	{
		this.push(item);
	}
}


export class DefaultCollection extends Collections
{
	constructor(...items)
	{
		super(...items);
	}

	Add(item)
	{
		this.add(item);
	}
}
export class TemplateCollection extends DefaultCollection
{
	FindById(ID)
	{
		let index =
			this.findIndex(function(template){

				return template.ID == ID;
			});

		return this[index];
	}
}

export class ComponentCollection extends DefaultCollection
{
	constructor(...items)
	{
		super(...items);
	}

	FindById(ID)
	{
		let index =
			this.findIndex(function(component){

				return component.ID == ID;
			});

		return this[index];
	}
}

export class ModuleCollection extends ComponentCollection
{
}

export class PageCollection extends ComponentCollection
{
	constructor(...items)
	{
		super(...items);
	}
}

export class RouteCollection extends ComponentCollection
{
	constructor(...items)
	{
		super(...items);
	}
	
	Add(page, route, path, id = '')
	{
		let newRoute = new Route(page, route, id);

		this.add(newRoute);

		return newRoute;
	}

	Find(key)
	{
		for(const index in this)
		{
			let currentRoute = this[index];

			if(currentRoute.Route == key)
			{
				
				return currentRoute;
			}
		}

		return null;
	}

	//CHECK
	Remove(key)
	{
		for(const index in this)
		{
			let currentRoute = this[index];

			if(currentRoute.Route == key)
			{
				this.removeAt(index);
			}
		}
	}
}