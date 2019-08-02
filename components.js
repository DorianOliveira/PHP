import * as Config from './config.js';
import * as Collections from './collections.js';

const DataSetNames = 
{
	initModule: {
		attribute: 'data-init-module',
		selector: '[data-init-module]',
		dataKey: 'initModule'
	}
}

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
	constructor(id, title, path, resource = null)
	{
		this.ID = id;
		this.Title = title;
		this.Path = path;
		this.Resource = resource;
		this.Components = new Collections.ComponentCollection();
		this.Helper = new Helper();
	}

	async LoadComponents(callBack)
	{
		for(const component in this.Components)
		{
			let currentComponent = this.Components[component];
			let fullPath = currentComponent.Path + '/' + currentComponent.Resource;
						
			this.Components[component].Symbol = await this.Helper.Import(fullPath);
		}
	}

	GetResourceUrl()
	{
		return this.Path + '/' + this.Resource;
	}

	AddComponent(component)
	{
		this.Components.Add(component);
	}
}

export class Module extends Component
{
	constructor(id, title, path, resource)
	{
		super(id, title, path, resource);
		this.Templates = new Collections.TemplateCollection();
	}

	GetTemplate(id)
	{
		let template = this.Templates.FindByID(id);

		if(template)
			return template;

		return null;
	}

	BindTemplate(id, resource)
	{
		let newTemplate = new Template(id, resource);
		this.Templates.Add(newTemplate);
	}

	LoadTemplate(id)
	{
		//TODO
	}

	/*
	* To override
	*/
	init()
	{

	}
}


export class Page extends Component
{
	constructor(id, title, path, resource)
	{
		super(id, title, path, resource);
	}

	async Up()
	{
		let response = await this.Helper.Load(this.GetResourceUrl());
		let html = await response.text();

		this.Helper.SetHTML(Config.DefaultContainer, html);

		let module = await this.LoadComponents();

		this.InitModules();
		
	}

	InitModules()
	{
		let elements = this.Helper.GetElementsBySelector(DataSetNames.initModule.selector);

		for(let element of elements)
		{
			let dataValue =
				this.Helper.GetDataSetModule(
					element,
					DataSetNames.initModule.dataKey);


			let key = dataValue.key;
			let value = dataValue.value;

			let module = this.Components.FindById(key);

			console.log(new module.Symbol[value]().init());
		}
	}


	/*
	* Overload to avoid another page been added as a child.
	*/
	AddComponent(component)
	{
		if(component instanceof Page)
			throw Config.Exceptions.SAME_PAGE_ID();
		
		super.AddComponent(component);
	}
}


export class Template
{
	constructor(id, resource)
	{
		this.ID = id;
		this.Resource = resource;

		this.Helper = new Helper();
	}

	async GetHTML()
	{
		let response = await this.Helper.Load(this.Resource);
		return await response.text();
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
		return await import(this.GetBaseUrl() + path);
	}

	GetElementsBySelector(selector)
	{
		return document.querySelectorAll(selector);
	}

	GetDataSetModule(element, dataKey, jsonParse = true)
	{

		var dataSet = element.dataset[dataKey];

		var regex = new RegExp('\@[a-zA-Z\_\-\d]*\.');

		if(regex.test(dataSet))
		{
			

			var dataValue = dataSet.replace('@', '').split('.');

			var key = dataValue[0];
			var value = dataValue[1];

			return {key: key, value: value};
			
		}
		return null;

	}
}