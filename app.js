
const Routes = 
{
	'/' : '/screens/home.html',
	'/levels': '/screens/levels.html',
	'/reference': '/screens/reference.html',
	'/single' : '/screens/single.html'
}

const DefaultRoutes = 
{
	'/404' : '/404.html'
}

export default class App
{
	Init()
	{
		console.log('teste');
		this.Route();
	}

	FindInRoutes(path)
	{
		for(let index in Routes)
		{
			let currentRoute = Routes[index];

			if(currentRoute == path)
				return currentRoute;
		}

		return DefaultRoutes['/404'];
	}

	GetBaseUrl()
	{
		return  location.origin + '/projetos/php2';
	}

	Route()
	{
		let fullOrigin = this.GetBaseUrl();
		let path = location.href.substring(fullOrigin.length);

		console.log(path);

		this.LoadTemplate(path);
	}

	async LoadTemplate(path)
	{
		
		let baseUrl = this.GetBaseUrl();
		let route = this.FindInRoutes(path);

		console.log(route);

		let finalFetchUrl = baseUrl + route;

		let response = await fetch(finalFetchUrl);
		let html = await response.text();

		$('#main-container').html(html);
	}
}

let app = new App();

app.Init();

