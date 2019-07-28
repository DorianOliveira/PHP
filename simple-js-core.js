import * as Config from './config.js';
import {Route, Helper, Component, Module, Page, ModuleCollection, PageCollection, RouteCollection} from './components.js';

export class SimpleJSCore
{
	constructor()
	{
		this.Helper = new Helper();
		this.Pages = new PageCollection();
		this.Modules = new ModuleCollection();
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
		let newRoute = this.Routes.Add(newPage, route, path, id);



		this.Pages.push(newPage);

		return newRoute;
	}

	RegisterModule(pageId, moduleId, modulePath, moduleResource)
	{
		let newModule = new Module();

		newModule.ID = moduleId;
		newModule.Path = modulePath;
		newModule.Resource = moduleResource;

		this.Modules.Add(newModule);

		this.Pages
			.FindById(pageId)
				.Components.Add(newModule);

	}

	FindInRoutes(route)
	{
		let currentRoute = this.Routes.Find(route);

		if(currentRoute != null)
			return currentRoute;

		return this.DefaultRoutes.Find('/404');
	}


	async GetRoute()
	{
		let fullOrigin = this.Helper.GetBaseUrl();
		let path = location.href.substring(fullOrigin.length);
		let route = this.FindInRoutes(path);
		


		route.Page.LoadTemplate();
		

		route.Page.LoadComponents();


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