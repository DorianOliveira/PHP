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
        self.elements = [];
        self.template = [];

        self.currentData = self.data[settings.mainKey];

        self.elements.findByItemKey = function(key, value)
        {

            var element = undefined;

            $(this).each(function(e){

                let currentElement = $(this);
               
                let jsonItem = $('[data-simple-json-item]', currentElement);

                if(jsonItem)
                {
                    let dataAttr = jsonItem.data().jsonAttr;                 

                    if(dataAttr == key)
                    {
                        let valueKey = jsonItem.attr(dataAttr);

                        if(value == valueKey)
                        {
                            element = currentElement;
                        }
                    }
                }
            });

            return element;
        }

        self.RenderJsonItem = function()
        {
            Mount();
        }

        self.RenderJsonList = function()
        {
            Mount(true);
        }

        self.ClearJsonDataList = function()
        {
            
        }

        self.onComplete = function(event, data)
        {
            
        }

        self.ClearJsonDataItem = function(key, value)
        {
            let elementToRemove = self.elements.findByItemKey(key, value);

            if(elementToRemove)
                elementToRemove.remove();
        }

        function Mount(isList=false)
        {
            let template = $(self);

            if(isList)
            { 
                let templateData = template.data();

                if(templateData)
                {
                    let templateId = templateData.simpleJsonTemplate;
                    let htmlContainer = $('[data-simple-json-container=' + templateId + ']');
                    let elementEmptyData = $('[data-simple-json-empty-data]', htmlContainer);

                    elementEmptyData.hide();

                    if(self.currentData.length == 0)
                        elementEmptyData.show(); 

                    self.template = template;
                    template.remove();
                    


                    for(var item in self.currentData)
                    {
                        

                        let templateClone = self.clone();
                        let containerItem = templateClone;                            

                        console.log(self.currentData);

                        templateClone.show();
                        htmlContainer.append(templateClone);

                        self.currentData = self.data[self.mainKey][item];
                        self.elements.push(containerItem);
                        
                        MountJsonItem(containerItem);
                    }
                }
            }
            else
            {
                self.elements.push(containerItem);
                MountJsonItem(containerItem);
                
            }

            self.trigger('onComplete');
        }

        String.prototype.isEmptyOfUndefined = function()
        {
            return this == '' 
                || this == undefined
                || this == null;
        }

        function IsNullOrEmpty(element)
        {
            return element == '' 
                || element == undefined
                || element == null;
        }



        function GetMarkup(element, key, value)
        {
            let currentElement = $(element);
            let children = currentElement.children();
            let markup =
                ReplaceMarkup(
                        currentElement.html(),
                        key,
                        value);


            if(markup != '')
                currentElement.html(markup);
        }

        function GetMarkupAttributes(element, key, value)
        {
            let currentElement = $(element);
            let attributes = currentElement.attributes;

            let children = currentElement.children();


            for( var attribute in attributes)
            {
                 let markup = ReplaceMarkup(currentElement.attr(attribute), key, value);

                 if(markup != '')
                    currentElement.attr(attribute, markup);
            }
        }

        function ReplaceMarkup(initialValue, key, value)
        {
            let patternStart = '{@';
            let patternEnd = '}';
            let showKey = patternStart + key + patternEnd;
            let stringStart = initialValue.indexOf(showKey);

            let keyExists = stringStart != -1;

            if(keyExists)
            {
                let stringEnd = showKey.length;
                let subString = initialValue.substring(stringStart, stringStart + stringEnd);
                let regExp = new RegExp(subString, 'g');

                markup = initialValue.replace(regExp, value);
                return markup;
            }

            return '';
        }



        function CheckSpecialRulesTemplate(element)
        {
            if(element.is('option') || element.is('li'))
            {
                element.remove();
            }
        }

        function MountJsonItem(target)
        {
            let jsonData = self.currentData;
            let currentElement = $(target);

            let data_source_attribute = '[data-simple-json-data-source]';

            let elementDataSource = $(data_source_attribute, currentElement);

            if(elementDataSource.length > 0)
            {
                elementDataSource.each(function(){

                    let children = $('[data-simple-json-template]', this);
                    let data_soure = $(this).data().simpleJsonDataSource;
                    
                    children.each(function(e){

                        
                        let target = $(this).RenderJson({
                            data: self.currentData,
                            mainKey: data_soure
                        });

                        target.RenderJsonList();

                    });
                });
            }

            for(var key in self.currentData)
            {

                let value = jsonData[key];
                GetMarkup(currentElement, key, value);
                GetMarkupAttributes(currentElement, key, value);

                // console.log(key + ' - ' + value);
                
                if(currentElement.is('option'))
                {

                    // console.log(currentElement);
                    // console.log(value);
                }

               

                //let currentElementKey = currentElement.data().simpleJsonKey;
                //let currentElementDataSource = currentElement.data().simpleJsonDataSource;
                    



                // if(currentElementDataSource == key)
                // {

                //     element_data_source.each(function(e){

                //         // let data_source_option = $(this).data().simpleJsonSourceOption;
                //         // let data_source_values = $(this).data().simpleJsonSourceValues;
                //         // let data_source_clear_on_load = element_data_source.data().simpleJsonSourceClearOnLoad;
                //         // let data_source_first_item_text = element_data_source.data().simpleJsonSourceFirstItemText;

                //         if(data_source_clear_on_load)
                //         {
                            
                //         }
                //         if(data_source_first_item_text != null && data_source_first_item_text != '')
                //         {
                //         }

                //         for(var item in value)
                //         {
                //             let current_item = value[item];
                //             let child_element = '';

                //             // if(data_source_option == 'option')
                //             // {
                //             //     child_element = $('<option />');
                    

                //             //     for(var option in data_source_values)
                //             //     {
                //             //         let json_key = data_source_values[option];
                //             //         let new_value = current_item[json_key];

                //             //         if(option == 'value')
                //             //         {
                //             //             child_element.attr('value', new_value);    
                //             //         }
                //             //         else if(option == 'text')
                //             //         {
                //             //             child_element.text(new_value);
                //             //         }
                //             //         else if(option == 'html')
                //             //         {
                //             //             child_element.html(new_value);
                //             //         }
                //             //     }
                //             // }

                //             $(this).append(child_element);
                //         }
                //     });
                // }

                //let child = $(data_set_json_key, currentElement);
                // let childDataSource = $(data_set_json_source, currentElement);

                // child.each(function(e){
                //     //MountJsonItem($(this));
                // });

                // childDataSource.each(function(e){
                //     MountJsonItem($(this));
                // })

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
            
            
//             //Se o elemento n�o estiver vazio...
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