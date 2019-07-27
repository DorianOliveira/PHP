import * as Config from './config.js';

export class SimpleJSCore
{
	constructor()
	{
		this.Helper = new Helper();
		this.Pages = [];

		this.Routes = new RouteCollection();
		this.DefaultRoutes = new RouteCollection();

		this.SetDefaultPages();
		
	}

	Init()
	{
		this.GetRoute();
	}

	Route(id, title, route, path)
	{

		let newPage = new Page(id, title, path);

		

		this.Routes.Add(newPage.Title, route, newPage.Path, id);


		this.Pages.push(newPage);
	}

	FindInRoutes(route)
	{
		let currentRoute = this.Routes.Find(route);

		if(currentRoute != null)
			return currentRoute;

		return this.DefaultRoutes.Find('/404');
	}

	Bind(screen, module)
	{
		
	}

	async GetRoute()
	{
		let fullOrigin = this.Helper.GetBaseUrl();
		let path = location.href.substring(fullOrigin.length);
		let route = this.FindInRoutes(path);


		let htmlTemplate = await this.Helper.LoadTemplate(route.Page.Path);

		this.Helper.SetHTML('#main-container', htmlTemplate);
	}

	SetDefaultPages()
	{
		let defaultRoutes = Config.DefaultRoutes;

		for(let routeIndex in defaultRoutes)
		{
			let currentRoute = defaultRoutes[routeIndex];

			this.DefaultRoutes
				.Add('', currentRoute.route, currentRoute.path, '');
		}
	}

}

class RouteCollection extends Array
{
	constructor(...items)
	{
		super(...items);
	}
	
	Add(title, route, path, id = '')
	{
		let newPage = new Page(id, title, path);
		let newRoute = new Route(newPage, route, id);
		

		this.push(newRoute);
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

	Remove(key)
	{
		for(const index in this)
		{
			let currentRoute = this[index];

			if(currentRoute.Route == key)
			{
				this.RemoveAt(index);
			}
		}
	}

	RemoveAt(index)
	{
		this.splice(index, 1);
	}

	Clear()
	{
		//this = [];
	}		
}
class Route
{
	constructor(page, route, id = '')
	{
		this.ID = id;
		this.Route = route;
		this.Page = page;


	}
}
class Component
{
	constructor(id, title, path, modules)
	{
		this.Id = id;
		this.Title = title;
		this.Path = path;
		this.Modules = modules;

		this.Helper = new Helper();
	}

	BindModule()
	{

	}

	GetHtml()
	{
		let html = this.Helper.LoadTemplate(this.path);
		return html;
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
	async LoadTemplate(path)
	{
		let baseUrl = this.GetBaseUrl();

		let finalFetchUrl = baseUrl + path;



		let response = await fetch(finalFetchUrl);
		let html = await response.text();

		return html;
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
}
