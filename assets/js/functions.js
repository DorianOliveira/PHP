$(document).ready(function(e){

    // let menu = $('.json-template-menu');

    // menu.RenderJson({
    //     data: jsonMenu.result,
    //     mainKey: 'items'
    // });

    // menu.RenderJsonList();

    levels = $('.levels-template');

    levels.RenderJson({
    	data: json3Levels.result,
    	mainKey: 'pessoas'
    });

    levels.RenderJsonList();

 //    let reference = $('.template-reference');
	
	// reference.RenderJson({
 //    	data: jsonReference.result,
 //    	mainKey: 'items'
 //    });

 //    reference.RenderJsonList();



});