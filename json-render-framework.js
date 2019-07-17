(function($){

    $.fn.RenderJson = function(options)
    {
        var self = this;

        var settings = $.extend({

            data: null,
            mainKey: ''

        }, options);

        self.data = settings.data;
        self.mainKey = settings.mainKey;

        self.currentData = self.data[settings.mainKey];

        self.RenderJsonItem = function()
        {
            Mount();
        }

        self.RenderJsonList = function()
        {
            Mount(true);           
        }

        self.ClearJsonData = function()
        {

        }

        self.ClearJsonDataItem = function()
        {

        }

        function Mount(isList=false)
        {

            let id_template = '';
            let html_container = '';

            let template = $(self);
            
            let template_data = template.data();
            let container_item = $(self);
            
            if(template_data)
            {
                id_template = template_data.idTemplate;
                html_container = $('[data-json-template=' + id_template + ']');
            }

            if(isList)
            {
                
                for(var item in self.currentData)
                {
                    let template_clone = self.clone();
                    template_clone.show();
                    html_container.append(template_clone);

                    container_item = template_clone;

                    self.currentData = self.data[self.mainKey][item];
                    MountJsonItem(container_item);
                }
            }
            else
            {

                MountJsonItem(container_item);    
            }
            
        }

        //function MountJsonItem(jsonData, elementContainer='')
        function MountJsonItem(container_item)
        {

            let jsonData = self.currentData;
            
            //Percorre todas as chaves do objeto json
            for(var key in self.currentData)
            {

                console.log(key);

                let data_set_json_key = '[data-json-key=' + key + ']'; 
                let data_set_json_source = '[data-json-source=' + key + ']';
                
                let value = jsonData[key];
                let element = $(data_set_json_key);

                let element_data_source = $(data_set_json_source);
                
                
                element = $(data_set_json_key, container_item);
                element_data_source = $(data_set_json_source, container_item);
                
                
                
                

                //Se o elemento não estiver vazio...
                if(element.length > 0)
                {

                    element.each(function(e){
                        

                        let json_option = $(this).data().jsonOption;
                        let json_attr = $(this).data().jsonAttr;


                        if(json_attr != undefined && json_attr != '')
                        {
                            $(this).attr(json_attr, value);
                        }
                        else
                        {
                            switch(json_option)
                            {
                                case 'value':
                                    $(this).val(value);
                                    break;
                                case 'text':
                                    $(this).text(value);
                                    break;                    
                                default:
                                case 'html':
                                    $(this).html(value);
                                    break;
                                case 'src':
                                    $(this).attr('src', value);
                                    break;
                            }
                        }
                    });
                }
                else if(element_data_source.length > 0)
                {


                    element_data_source.each(function(e){


                        let data_source_option = $(this).data().jsonSourceOption;
                        let data_source_values = $(this).data().jsonSourceValues;
                        


                        for(var item in value)
                        {
                            let current_item = value[item];

                            let child_element = '';


                            if(data_source_option == 'option')
                            {
                                child_element = $('<option />');
                    

                                for(var option in data_source_values)
                                {
                                    let json_key = data_source_values[option];
                                    let new_value = current_item[json_key];

                                    if(option == 'value')
                                    {
                                        child_element.attr('value', new_value);    
                                    }
                                    else if(option == 'text')
                                    {
                                        child_element.text(new_value);
                                    }
                                    else if(option == 'html')
                                    {
                                        child_element.html(new_value);
                                    }
                                }
                            }

                            $(this).append(child_element);
                        }
                    });

                }
            }
        }

        return this;
    }

})(jQuery)


// (function($){

//     var template = '';
//     var mainKey = '';
//     var data = '';

//     $.fn.RenderJson = function(options)
//     {
//         var settings = $.extend({

//             data: null,
//             template: '',
//             mainKey: ''

//         }, options);

        

//         //Mount(data, settings.container, false);

//         this.template = settings.template;
//         this.mainKey = settings.mainKey;
//         this.data = settings.data;

//         Mount(false);
//     }

//     $.fn.RenderJsonList = function(options)
//     {
//         var settings = $.fn.extend({

//             data: null,
//             mainKey: ''

//         }, options);

//         // if(settings.mainKey == '')
//         //     throw Exception('mainKey not defined!');

//         // if(settings.data == null || settings.data == undefined || settings.data == '')
//         //     throw Exception('Data not defined!');

//         var dataList = settings.data[mainKey];

//         for(var dataIndex in dataList)
//         {
//             let currentData = dataList[dataIndex];
//             Mount(currentData, '', true);
//         }
    
//     }



//     //function Mount(jsonData, container='', isList=false)
//     function Mount(isList=false)//jsonData, container='', isList=false)
//     {
           

//         console.log(this.data);
//         //let jsonData = this.data[this.mainKey];
//         let templateSelector = this.container;

//         //let template = $('.json-template:eq(0)');

//         let template = $(templateSelector + ':eq(0)');
        
//         let template_clone = template.clone();
//         let id_template = '';
//         let html_container = '';
//         let template_data = template.data();
//         let container_item = $(templateSelector);

//         if(template_data)
//         {
//             id_template = template_data.idTemplate;
//             html_container = $('[data-target-template=' + id_template + ']', $(this));
//         }

//         if(isList)
//         {
//             template_clone.show();
//             html_container.append(template_clone);
//         }

//         if(isList)
//             container_item = template_clone;

//         //MountJsonItem(jsonData, container_item);

//         MountJsonItem(container_item);
//     }

//     //function MountJsonItem(jsonData, elementContainer='')
//     function MountJsonItem()
//     {

//         let jsonData = this.data[this.mainKey];

//         //Percorre todas as chaves do objeto json
//         for(var key in jsonData)
//         {
            
//             let data_set_json_key = '[data-json-key=' + key + ']'; 
//             let data_set_json_source = '[data-json-source=' + key + ']';
            
//             let value = jsonData[key];
//             let element = $(data_set_json_key);

//             let element_data_source = $(data_set_json_source);
            
            
//             element = $(data_set_json_key, $(this));
//             element_data_source = $(data_set_json_source, $(this));
            
            
//             //Se o elemento não estiver vazio...
//             if(element.length > 0)
//             {
//                 let json_option = element.data().jsonOption;
//                 let json_attr = element.data().jsonAttr;

//                 if(json_attr != undefined && json_attr != '')
//                 {
//                     element.attr(json_attr, value);
//                 }
//                 else
//                 {
//                     switch(json_option)
//                     {
//                         case 'value':
//                             element.val(value);
//                             break;
//                         case 'text':
//                             element.text(value);
//                             break;                    
//                         default:
//                         case 'html':
//                             element.html(value);
//                             break;
//                         case 'src':
//                             element.attr('src', value);
//                             break;
//                     }
//                 }
//             }
//             else if(element_data_source.length > 0)
//             {

//                 let data_source_option = element_data_source.data().jsonSourceOption;
//                 let data_source_values = element_data_source.data().jsonSourceValues;
                


//                 for(var item in value)
//                 {
//                     let current_item = value[item];

//                     let child_element = '';


//                     if(data_source_option == 'option')
//                     {
//                         child_element = $('<option />');
            

//                         for(var option in data_source_values)
//                         {
//                             let json_key = data_source_values[option];
//                             let new_value = current_item[json_key];

//                             if(option == 'value')
//                             {
//                                 child_element.attr('value', new_value);    
//                             }
//                             else if(option == 'text')
//                             {
//                                 child_element.text(new_value);
//                             }
//                             else if(option == 'html')
//                             {
//                                 child_element.html(new_value);
//                             }
//                         }
//                     }

//                     element_data_source.append(child_element);
//                 }
//             }
//         }
//     }

//     // $.fn.ClearJsonDataItem = function(dataJsonItem, dataJsonAttr, dataJsonValue)//, container='')
//     // {
//     //     var selector_data_item = '[data-json-item=' + dataJsonItem + ']';
//     //     var selector = selector_data_item + '[' + dataJsonAttr + '=' + dataJsonValue + ']:eq(0)';
//     //     var element = $(selector, $(this));

//     //     // if(container != '')
//     //     //     element = $(selector, container);

//     //     element.remove();
//     // }


//     $.fn.ClearJsonData = function()//container)
//     {
//         let data_set_json_key = $('[data-json-key]');
//         let removeItems = false;

//         $('.json-template', $(this)).remove();

//         // if(container != '' && container != undefined)
//         // {
//         //     removeItems = true;
//         //     $('.json-template', container).remove();
//         // }
        
//         // if(!removeItems)
//         // {
//         //     data_set_json_key.each(function(){

//         //         let data_option = $(this).data().jsonOption;
        
//         //         switch(data_option)
//         //         {
//         //             case 'value':
//         //                     data_set_json_key.val('');
//         //                 break;
//         //             case 'text':
//         //                     data_set_json_key.text('');
//         //                 break;                    
//         //             default:
//         //             case 'html':
//         //                     data_set_json_key.html('');
//         //                 break;
//         //             case 'src':
//         //                     data_set_json_key.attr('src', '');
//         //                 break;
//         //         } 
//         //     });
//         // }
//     } 

// })(jQuery);