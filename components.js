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
	constructor(id, title, path, modules = null)
	{
		this.ID = id;
		this.Title = title;
		this.Path = path;
		

		this.Modules = new ModuleCollection();

		if(modules != null)
			this.Modules = modules;

		this.Resource = '';
		this.Template = ''

		this.Helper = new Helper();
	}

	BindModule(id, path, resource, template)
	{
		let newModule = new Module();

		newModule.ID = id;
		newModule.Path = path;
		newModule.Resource = resource;
		newModule.Template = template;

		this.Modules.Add(newModule);
	}

	GetHtml()
	{
		let html = this.Helper.LoadTemplate(this.path);
		return html;
	}

	async LoadModules()
	{
		for(const module in this.Modules)
		{
			let currentModule = this.Modules[module];
			let fullPath = currentModule.Path + currentModule.Resource;

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
	constructor(id, title, path, modules = null)
	{
		super(id, title, path, modules);
	}

	GetTemplate()
	{
		return this.GetHtml();
	}
}

export class Page extends Component
{
	constructor(id, title, path, modules = null)
	{
		super(id, title, path, modules);
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
		const dynamicImport = await import(Config.BaseURL + path);
		const importedModule = dynamicImport.default;
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

export class ModuleCollection extends Collections
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

export class PageCollection extends Collections
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

export class RouteCollection extends Collections
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