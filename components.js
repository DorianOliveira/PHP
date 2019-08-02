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

	async LoadComponents()
	{
		for(const component in this.Components)
		{
			let currentComponent = this.Components[component];
			let fullPath = currentComponent.Path + '/' + currentComponent.Resource;
						
			let a = await this.Helper.Import(fullPath);

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

		this.InitModules();
	}

	InitModules()
	{
		for(const component in this.Components)
		{
			let currentComponent = this.Components[component];

			// let dataInitModule = this.Helper.GetElementDataSet(
			//  	DataSetNames.initModule.selector,
			//  	DataSetNames.initModule.dataKey);

			let elements = this.Helper.GetElementsBySelector(DataSetNames.initModule.selector);

			for(const element in elements)
			{
				let currentElement = elements[element];

				let dataValue =
					this.Helper.GetDataSet(
						currentElement,
						DataSetNames.initModule.dataKey);

				console.log(currentComponent.ID);

				console.log(dataValue[currentComponent.ID]);
			}

			//let module = this.Components.FindById(dataInitModule);

			
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

	GetDataSet(element, dataKey, jsonParse = true)
	{
		var stringifyValue = JSON.stringify(element.dataset);
		var jsonValue = JSON.parse(stringifyValue);

		var value = jsonValue[dataKey];

		//console.log(value);
		// var jsonValue = JSON.parse(element.dataset[dataKey]);

		// if(jsonParse)
		// 	return JSON.parse(jsonValue);
		
		// return value;
	}
}