export default class App
{
	Init()
	{
		
		this.Route();		

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
		let base = '/screens';
		let baseUrl = this.GetBaseUrl();

		let finalFetchUrl = baseUrl + base + path + '.php';

		let response = await fetch(finalFetchUrl);

		let html = await response.text();

		$('#main-container').html(html);
	
	}


}

let app = new App();

app.Init();

