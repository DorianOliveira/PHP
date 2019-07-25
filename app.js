
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
		this.Route();
	}

	FindInRoutes(path)
	{
		for(let index in Routes)
		{
			if(index == path)
			{
				return Routes[index];
			}
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

		
		this.LoadTemplate(path);
	}

	async LoadTemplate(path)
	{
		
		let baseUrl = this.GetBaseUrl();
		let route = this.FindInRoutes(path);

		

		let finalFetchUrl = baseUrl + route;

		

		let response = await fetch(finalFetchUrl);
		let html = await response.text();

		console.log(html);

		$('#main-container').html(html);
	}
}

let app = new App();

app.Init();

