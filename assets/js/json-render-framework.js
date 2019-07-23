(function($){

    $.fn.RenderJson = function(options)
    {
        var self = this;

        var settings = $.extend({

            data: null,
            mainKey: ''

        }, options);

        self.settings = settings;
        self.elements = [];

        self.initialItemTemplate = $(self);
        self.initialContainer = self.initialItemTemplate.closest('[data-simple-json-container]');
        self.initialDataSource = self.initialItemTemplate.closest('[data-simple-json-data-source]');
        self.data = self.settings.data;

        Init = function()
        {
            
            self.mainKey = self.settings.mainKey;
            self.currentData = self.data[self.settings.mainKey];
            self.elements = [];

            console.log(self.data);

            Mount();
        }

        self.Clear = function()
        {
            $('[data-simple-json-item]', self.initialContainer).remove();
            $('[data-simple-json-data-source]', self.initialContainer).remove();
            self.elements = [];
        }

        self.Update = function(data = null)
        {
            if(data != null)
                self.data = data;

            self.Clear();
            Init();
        }

        self.RenderJsonItem = function()
        {
            self.isList = false;
            Init();
        }

        self.RenderJsonList = function()
        {
            self.isList = true;
            Init();
        }

        self.RemoveItem = function(value)
        {
            self.elements.Remove(value);
        }


        function Mount()
        {
            $(self).remove();
            $(self.initialDataSource).remove();



            if(self.isList)
            { 

                let templateData = self.initialItemTemplate.data();




                if(templateData)
                {

                    // let htmlContainer = templateItem.closest('[data-simple-json-container]');
                    // let dataSourceContainer = templateItem.closest('[data-simple-json-data-source]');

                    //self.initialItemTemplate = templateItem;
                    //self.initialDataSource = dataSourceContainer;
                    //self.initialContainer = htmlContainer;

                    //templateItem.remove();


                    let removeContainerOnEmpty = $('[data-simple-json-remove-on-empty]', self.initialContainer);
                    let elementEmptyData = $('[data-simple-json-empty-data]', self.initialContainer);

                    HideResource(elementEmptyData);

                    //console.log(self.currentData);

                    if(self.currentData == undefined || self.currentData == null){

                        HideResource(removeContainerOnEmpty);
                        ShowResource(elementEmptyData);
                    }

                    else
                    {
                        if(self.currentData.length == 0)
                        {
                            
                            HideResource(removeContainerOnEmpty);
                            ShowResource(elementEmptyData);  
                        }



                        ShowResource(self.initialDataSource);

                        let cloneDataSource = self.initialDataSource.clone();
                        self.initialContainer.append(cloneDataSource);

                        for(var item in self.currentData)
                        {
                            let containerItem = self.initialItemTemplate.clone();
                            

                            ShowResource(containerItem);


                            
                            cloneDataSource.append(containerItem);


                            self.currentData = self.data[self.mainKey][item];
                            self.elements.push(containerItem);                           

                            MountJsonItem(containerItem);
                        }
                    }
                }
            }
            else
            {
                let containerItem = self.initialItemTemplate.clone();

                self.elements.push(containerItem);

                $(self.initialContainer).append(containerItem);

                ShowResource(containerItem);
                MountJsonItem(containerItem);
            }
        }

        
        function MountJsonItem(target)
        {

            let jsonData = self.currentData;
            let currentElement = $(target);

            let dataSourceSelector = '[data-simple-json-data-source]:first';
            let elementDataSource = $(dataSourceSelector, currentElement);

            if(elementDataSource.length > 0)
            {

                elementDataSource.each(function(){

                    let children = $('[data-simple-json-item]', this);
                    let dataSourceKey = $(this).data().simpleJsonDataSource;

                    children.each(function(e){

                        let target = $(this).RenderJson({
                            data: self.currentData,
                            mainKey: dataSourceKey
                        });

                        target.RenderJsonList();
                    });
                });
            }

            //TODO: Check if HTML contains a key that not exists in JSON. Problem: The markup (sample: {@key}) not is replace, and...
            //...the render have a wrong behavior.
            for(var key in self.currentData)
            {
                let value = jsonData[key];

                if(value == undefined || value == null)
                    value = '';

                GetMarkup(currentElement, key, value);
            }
        }

        String.prototype.isEmptyOfUndefined = function()
        {
            return this == '' 
                || this == undefined
                || this == null;
        }

        function ShowResource(resource)
        {
            $(resource).show();
            $(resource).addClass('active');
        }

        function HideResource(resource)
        {
            $(resource).hide();
            $(resource).removeClass('active');
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
            
            
            let markup =
                ReplaceMarkup(
                        currentElement.html(),
                        key,
                        value);

            if(markup != '')
                currentElement.html(markup);


            GetMarkupAttributes(currentElement, key, value);

        }

        function GetMarkupAttributes(element, key, value)
        {
            let currentElement = $(element);
            let attributes = currentElement.get(0).attributes;

            for( var attribute in attributes)
            {
                let attributeName = attributes[attribute]['name'];
                
                
                if(attributeName)
                {

                    let elementAttribute = currentElement.attr(attributeName);

                    if(elementAttribute)
                    {
                        let markup = ReplaceMarkup(elementAttribute, key, value);

                        if(markup != '')
                            currentElement.attr(attributeName, markup);
                    }
                }
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

        self.elements.FindByItemKeyValue = function(value)
        {

            var element = undefined;

            $(this).each(function(index){

                let currentElement = $(this);
                let dataItem = currentElement.data().simpleJsonItem;

                if(dataItem && dataItem == value)
                    element = currentElement;
                
            });

            return element;
        }

        self.elements.Remove = function(value, removeFromDom=true)
        {
            $(this).each(function(index){

                let currentElement = $(this);
                let dataItem = currentElement.data().simpleJsonItem;

                if(dataItem == value)
                {

                    self.elements.splice(index, 1);

                    if(removeFromDom)
                        currentElement.remove();
                }


            });
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