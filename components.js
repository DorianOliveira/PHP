import * as Config from './config.js';
import * as Collections from './collections.js';

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
	constructor(id, title, path, resource, components = null)
	{
		this.ID = id;
		this.Title = title;
		this.Path = path;
		this.Resource = resource;

		this.Components = new Collections.ComponentCollection();

		if(components != null)
			this.Components = components;

		this.Helper = new Helper();
	}

	async LoadComponents()
	{
		for(const component in this.Components)
		{

			let currentComponent = this.Components[component];
			let fullPath = currentComponent.Path + '/' + currentComponent.Resource;
						
			this.Helper.Import(fullPath);
		}
	}

	async LoadTemplate()
	{
		let response = await this.Helper.Load(this.Path);
		let html = await response.text();

		this.Helper.SetHTML(Config.DefaultContainer, html);
	}
}

export class Module extends Component
{
	constructor(id, title, path, resource, ...components)
	{
		super(id, title, path, resource, ...components);
		this.Templates = new Collections.TemplateCollection();
	}

	GetTemplate(id)
	{
		let template = this.Templates.FindByID(id);

		if(template)
			return template;
	}

	BindTemplate(id, resource)
	{
		let pathTemplate = Config.BaseURL + this.Path + resource;
		let newTemplate = new Template(id, pathTemplate);

		console.log(this);

		this.Templates.Add(newTemplate);
	}
}


export class Page extends Component
{
	constructor(id, title, path, resource, ...components)
	{
		super(id, title, path, resource, ...components);
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

		await import(this.GetBaseUrl() + path);
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