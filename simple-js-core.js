import * as Config from './config.js';
import * as Collections from './collections.js';
import {Route, Helper, Component, Module, Page} from './components.js';


export class SimpleJSCore
{
	constructor()
	{
		this.Helper = new Helper();
		this.Pages = new Collections.PageCollection();
		this.Modules = new Collections.ModuleCollection();
		this.Routes = new Collections.RouteCollection();
		this.DefaultRoutes = new Collections.RouteCollection();

		this.SetDefaultPages();
	}

	Init()
	{
		this.GetRoute();
	}

	Route(id, title, route, path, resource)
	{
		let newPage = new Page(id, title, path, resource);
		let findRoute = this.Routes.FindById(id);

		if(findRoute)
			throw Config.Exceptions.SAME_ROUTE_ID_ERROR(id);

		let newRoute = this.Routes.Add(newPage, route, path, id);

		this.Pages.push(newPage);

		return newRoute;
	}

	RegisterModule(pageId, moduleId, modulePath, moduleResource)
	{
		let newModule = new Module();

		let findPage = this.Pages.FindById(pageId);

		if(findPage)
		{
			let findModule = findPage.Components.FindById(moduleId);

			if(findModule)
			{
				//throw 'Is not allowed more than one module with same id at the same Page. Id ['+ moduleId + '] has been added in the [' + pageId + ']';
				throw Config.Exceptions.SAME_MODULE_ID_ERROR(moduleId, pageId);
			}

			newModule.ID = moduleId;
			newModule.Path = modulePath;
			newModule.Resource = moduleResource;

			this.Pages
			 	.FindById(pageId)
			 		.Components.Add(newModule);
			
		}
		else
		{
			throw Config.Exceptions.PAGE_NOT_FOUND(pageId);
		}
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
		
		//route.Page.LoadComponents();
		route.Page.Up();
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