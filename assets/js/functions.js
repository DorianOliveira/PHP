$(document).ready(function(e){

    let menu = $('.json-template-menu');

    menu.RenderJson({
        data: jsonMenu.result,
        mainKey: 'items'
    });

    menu.RenderJsonList();

    levels = $('.levels-template');

    levels.RenderJson({
    	data: json3Levels.result,
    	mainKey: 'pessoas'
    });

    levels.RenderJsonList();

    reference = $('.template-reference');
	
	reference.RenderJson({
    	data: jsonReference.result,
    	mainKey: 'items'
    });

    reference.RenderJsonList();


    let singleSample = $('.single-data');

    if(singleSample.length > 0)
    {
        singleSample.RenderJson({
            data: singleJson,
            mainKey: 'result'
        });

        singleSample.RenderJsonItem();
    }     

});