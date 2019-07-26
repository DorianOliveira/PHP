import * as Config from './config.js';

export class SimpleJSCore
{
	constructor()
	{
		this.Routes = [];
	}

	Init()
	{
		this.GetRoute();
	}

	Route(path, template)
	{
		let route = {
			route: path,
			path: template
		};
		
		this.Routes.push(route);
	}

	FindInRoutes(path)
	{
		for(let index in this.Routes)
		{
			let currentRoute = this.Routes[index];

			if(currentRoute.route == path)
			{
				return this.Routes[index].path;
			}
		}

		return DefaultRoutes['/404'];
	}

	GetBaseUrl()
	{
		return  location.origin + Config.BaseURL;
	}

	GetRoute()
	{
		let fullOrigin = this.GetBaseUrl();
		let path = location.href.substring(fullOrigin.length);
		
		this.LoadTemplate(path);
	}

	async LoadTemplate(path)
	{
		
		let baseUrl = this.GetBaseUrl();
		let route = this.FindInRoutes(path);

		let finalFetchUrl = baseUrl + route;
		let response = await fetch(finalFetchUrl);
		let html = await response.text();

		document.getElementById('main-container').innerHTML = html;

	}
}
