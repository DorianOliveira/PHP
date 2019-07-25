(function($){

    $.fn.RenderJson = function(options)
    {
        var self = this;

        var settings = $.extend({

            data: null,
            mainKey: '',

            complete: function(self)
            {
            },

            init: function(self, currentData)
            {
            },

            onRenderKeyValue: function(currentElement, key, value)
            {
            },

            onRenderItem: function(data, element)
            {
            },

            onRenderDataSource: function(data, dataSourceKey, children)
            {
            },

            beforeClear: function(self, elements)
            {
            },

            afterClear: function(self)
            {
            },

            

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

            self.settings.init.call(self.currentData);

            Mount();
        }


        self.Clear = function()
        {
            self.settings.beforeClear.call(self, self.elements);

            $('[data-simple-json-item]', self.initialContainer).remove();
            $('[data-simple-json-data-source]', self.initialContainer).remove();
            self.elements = [];

            self.settings.afterClear.call(self);
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
                    let removeContainerOnEmpty = $('[data-simple-json-remove-on-empty]', self.initialContainer);
                    let elementEmptyData = $('[data-simple-json-empty-data]', self.initialContainer);

                    HideResource(elementEmptyData);

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

            self.settings.complete.call(self);
                
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

                    self.settings.onRenderDataSource.call(self.currentData, dataSourceKey, children);

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

                self.settings.onRenderKeyValue.call(currentElement, key, value);
            }
            //console.log(jsonData);
            self.settings.onRenderItem.call(jsonData, currentElement);
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