import App from '../../app.js';

let reference;

class Functions
{

    execute()
    {
        $(document).ready(function(e){

            // let menu = $('.json-template-menu');

            // menu.RenderJson({
            //     data: jsonMenu.result,
            //     mainKey: 'items'
            // });

            // menu.RenderJsonList();

            // let levels = $('.levels-template');

            // levels.RenderJson({
            //     data: json3Levels.result,
            //     mainKey: 'pessoas'
            // });

            // levels.RenderJsonList();

            

            // let single = $('.single-data-container');

            // single.RenderJson({
            //     data: singleJson,
            //     mainKey: 'result'
            // });

            // single.RenderJsonItem();

            reference = $('.template-reference');
            
            reference.RenderJson({
                data: jsonReference.result,
                mainKey: 'items',

                complete: function()
                {
                    console.log('Finalizou');
                    
                },

                init: function(data)
                {
                    console.log('iniciou');
                    console.log(data);
                }
            });

            reference.RenderJsonList();


        });
    }
}


let functions  = new Functions();

functions.execute();