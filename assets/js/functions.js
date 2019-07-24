import App from '../../app.js';


class Functions
{
    execute()
    {


        a.print();
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

    levels.onComplete(function(){

        console.log('Montou tudo!');
    })

 //    let reference = $('.template-reference');
    
    // reference.RenderJson({
 //     data: jsonReference.result,
 //     mainKey: 'items'
 //    });

 //    reference.RenderJsonList();





});
    }
}


