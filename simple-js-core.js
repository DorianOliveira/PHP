import * as Config from './config.js';
import {Route, Helper, Component, Module, Page, ModuleCollection, PageCollection, RouteCollection} from './components.js';


export class SimpleJSCore
{
	constructor()
	{
		this.Helper = new Helper();
		this.Pages = new PageCollection();

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

		let newRoute = this.Routes.Add(newPage.Title, route, newPage.Path, id);
		this.Pages.push(newPage);

		return newRoute;
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


		//let htmlTemplate = await this.Helper.LoadTemplate(route.Page.Path);

		
		route.Page.LoadTemplate();
		route.Page.LoadModules();

		//this.LoadModules();
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