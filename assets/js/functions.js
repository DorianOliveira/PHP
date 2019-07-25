import App from '../../app.js';


class Functions
{
    execute()
    {
        $(document).ready(function(e){

            let menu = $('.json-template-menu');

            menu.RenderJson({
                data: jsonMenu.result,
                mainKey: 'items'
            });

            menu.RenderJsonList();

            let levels = $('.levels-template');

            levels.RenderJson({
                data: json3Levels.result,
                mainKey: 'pessoas'
            });

            levels.RenderJsonList();

            let reference = $('.template-reference');
            
            reference.RenderJson({
             data: jsonReference.result,
             mainKey: 'items'
            });

            reference.RenderJsonList();

            let single = $('.single-data-container');

            single.RenderJson({
                data: singleJson,
                mainKey: 'result'
            });

            single.RenderJsonItem();

        });
    }
}


let functions  = new Functions();

functions.execute();