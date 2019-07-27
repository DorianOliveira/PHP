import * as Config from './config.js';

export class SimpleJSCore
{
	constructor()
	{
		this.Helper = new Helper();
		this.Routes = [];
		this.Pages = [];
		this.DefaultRoutes = [];

		this.SetDefaultPages();
	}

	Init()
	{
		this.GetRoute();
	}

	Route(id, title, route, path)
	{

		let newPage = new Page(id, title, path);
		let newRoute = new Route(route, newPage);
			
		this.Routes.push(newRoute);
		this.Pages.push(newPage);
	}

	FindInRoutes(route)
	{
		for(let index in this.Routes)
		{
			let currentRoute = this.Routes[index];

			console.log(currentRoute);

			if(currentRoute.Route == route)
			{
				return this.Routes[index];
			}
		}

		return this.DefaultRoutes['/404'];
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

		for(let routeIndex in this.defaultRoutes)
		{
			let currentRoute = this.defaultRoutes[routeIndex];

			let route = new Route(routeIndex, currentRoute);

			this.DefaultRoutes[routeIndex] = route;
		}
	}

}


class Route
{
	constructor(route, page, id = '')
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
