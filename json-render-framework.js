
function ClearJsonDataItem(dataJsonItem, dataJsonAttr, dataJsonValue, container='')
{
    var selector_data_item = '[data-json-item=' + dataJsonItem + ']';
    var selector = selector_data_item + '[' + dataJsonAttr + '=' + dataJsonValue + ']:eq(0)';

    
    var element = $(selector);



    if(container != '')
        element = $(selector, container);

    element.remove();
}

function ClearJsonData(container)
{
    let data_set_json_key = $('[data-json-key]');
    let removeItems = false;

    if(container != '' && container != undefined)
    {
        removeItems = true;
        $('.json-template', container).remove();
    }
    
    if(!removeItems)
    {
        data_set_json_key.each(function(){

            let data_option = $(this).data().jsonOption;
    
            switch(data_option)
            {
                case 'value':
                        data_set_json_key.val('');
                    break;
                case 'text':
                        data_set_json_key.text('');
                    break;                    
                default:
                case 'html':
                        data_set_json_key.html('');
                    break;
                case 'src':
                        data_set_json_key.attr('src', '');
                    break;
            } 
        });
    }
}


function MountJsonItem(jsonData, elementContainer='')
{
    //Percorre todas as chaves do objeto json
    for(var key in jsonData)
    {
        
        let data_set_json_key = '[data-json-key=' + key + ']'; 
        let data_set_json_source = '[data-json-source=' + key + ']';
        
        let value = jsonData[key];
        let element = $(data_set_json_key);

        let element_data_source = $(data_set_json_source);
        
        if(elementContainer != '')
        {
            element = $(data_set_json_key, elementContainer);
            element_data_source = $(data_set_json_source, elementContainer);
        }
        
        //Se o elemento não estiver vazio...
        if(element.length > 0)
        {
            let json_option = element.data().jsonOption;
            let json_attr = element.data().jsonAttr;

            if(json_attr != undefined && json_attr != '')
            {
                element.attr(json_attr, value);
            }
            else
            {
                switch(json_option)
                {
                    case 'value':
                        element.val(value);
                        break;
                    case 'text':
                        element.text(value);
                        break;                    
                    default:
                    case 'html':
                        element.html(value);
                        break;
                    case 'src':
                        element.attr('src', value);
                        break;
                }
            }
        }
        else if(element_data_source.length > 0)
        {

            let data_source_option = element_data_source.data().jsonSourceOption;
            let data_source_values = element_data_source.data().jsonSourceValues;
            


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

                element_data_source.append(child_element);
            }
        }
    }
}


function Mount(jsonData, container='', isList=false)
{
    let template = $('.json-template:eq(0)');
    let template_clone = template.clone();
    let id_template = '';
    let html_container = '';
    let template_data = template.data();
    let container_item = container;

    if(template_data)
    {
        id_template = template_data.idTemplate;
        html_container = $('[data-target-template=' + id_template + ']');
    }

    if(isList)
    {
        template_clone.show();
        html_container.append(template_clone);
    }

    if(isList)
        container_item = template_clone;

    MountJsonItem(jsonData, container_item);

    // //Percorre todas as chaves do objeto json
    // for(var key in jsonData)
    // {
    //     let data_set_json_key = '[data-json-key=' + key + ']'; 
    //     let value = jsonData[key];
        
    //     //Cria um objeto jquery com o seletor contendo a chave para ler o objeto JSON
    //     let element = $(data_set_json_key);

    //     //Se existe um container no parâmetro, atribui apenas o elemento dentro do container.
    //     if(container != '')
    //         element = $(data_set_json_key, container);

    //     //Se é uma chamada no formato de lista, atribui apenas o elemento dentro do clone do template.
    //     if(isList)
    //         element = $(data_set_json_key, template_clone);   
        
    //     //Se o elemento não estiver vazio...
    //     if(element.size() > 0)
    //     {
    //         let json_option = element.data().jsonOption;
    //         let json_attr = element.data().jsonAttr;

    //         if(json_attr != undefined && json_attr != '')
    //         {
    //             element.attr(json_attr, value);
    //         }
    //         else
    //         {
    //             switch(json_option)
    //             {
    //                 case 'value':
    //                     element.val(value);
    //                     break;
    //                 case 'text':
    //                     element.text(value);
    //                     break;                    
    //                 default:
    //                 case 'html':
    //                     element.html(value);
    //                     break;
    //                 case 'src':
    //                     element.attr('src', value);
    //                     break;
    //             }
    //         }
    //     }
    // }
}


function RenderJson(jsonObject, mainKey, container){

    var data = jsonObject[mainKey];

    console.log(data);
    Mount(data, container);
}

function RenderJsonList(dataJson, mainKey)
{
    var dataList = dataJson[mainKey];

    console.log(dataList);

    for(var dataIndex in dataList)
    {
        let currentData = dataList[dataIndex];
        Mount(currentData, '', true);
    }
}