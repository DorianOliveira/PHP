import * as Config from './config.js';

export class Route
{
	constructor(page, route, id = '')
	{
		this.ID = id;
		this.Route = route;
		this.Page = page;
	}
}
export class Component
{
	constructor(id, title, path, resource, components = null)
	{
		this.ID = id;
		this.Title = title;
		this.Path = path;
		this.Resource = resource;

		this.Components = new ComponentCollection();

		if(components != null)
			this.Components = components;

		this.Helper = new Helper();
	}

	
	GetHtml()
	{
		let html = this.Helper.LoadTemplate(this.path);
		return html;
	}

	async LoadComponents()
	{
		for(const component in this.Components)
		{
			let currentComponent = this.Components[component];
			let fullPath = currentComponent.Path + '/' + currentComponent.Resource;
			
			
			this.Helper.Import(fullPath);
		}
	}

	async LoadTemplate()
	{
		let response = await this.Helper.Load(this.Path);
		let html = await response.text();

		this.Helper.SetHTML(Config.DefaultContainer, html);
	}
}

export class Module extends Component
{
}

export class Page extends Component
{
	constructor(id, title, path, resource, template, components = null)
	{
		super(id, title, path, resource, template, components);
		this.Template = template;
	}

	GetTemplate()
	{
		return this.GetHtml();
	}
}

export class Helper
{
	async Load(path)
	{
		let baseUrl = this.GetBaseUrl();
		let finalFetchUrl = baseUrl + path;

		return await fetch(finalFetchUrl);
	}

	GetBaseUrl()
	{
		return  location.origin + Config.BaseURL;
	}

	SetHTML(selector, html)
	{
		document
			.querySelector(selector)
			.innerHTML = html;
	}

	async Import(path)
	{

		await import(this.GetBaseUrl() + path);
	}
}

class Collections extends Array
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

class DefaultCollection extends Collections
{
	Add(item)
	{
		this.add(item);
	}
}

export class ComponentCollection extends DefaultCollection
{
}

export class ModuleCollection extends DefaultCollection
{
}

export class PageCollection extends DefaultCollection
{
	constructor(...items)
	{
		super(...items);
	}

	FindById(ID)
	{
		let index =
			this.findIndex(function(page){
				return page.ID == ID;
			});


		return this[index];

	}

}

export class RouteCollection extends DefaultCollection
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