export const DefaultRoutes = 
[
	{route: '/404', path: '/404.html'},
	{route: '/301', path:'/301.html'},
	{route: '/302', path:'/302.html'},
	{route: '/500', path:'/500.html'}
];


export const BaseURL = '/projetos/php2';

export const DefaultContainer = '#main-container';

export const Exceptions = 
{
	SAME_MODULE_ID_ERROR : (moduleId, pageId) =>
	{
		return `
		Is not allowed more than one module with same id at the same Page. Id [${moduleId}] has been added in the [${pageId}]`.trim();
	},

	PAGE_NOT_FOUND : (pageId) =>
	{
		return
		`ID page [${pageId}] doesn´t exist!`.trim();
	},

	SAME_ROUTE_ID_ERROR: (routeId) =>
	{
		return `Is not allowed add routes with same id. Id [${routeId}] has been added!`.trim();
	}

	
}