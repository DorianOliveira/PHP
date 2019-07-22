var jsonReference = 
{
    result:
    {
        items:
        [
            {
                id: 1,
                name: 'data-simple-json-data-source',
                description : 'Determine if the element is a DATA SOURCE. Is the container of the ITEMS'
            },
            {
                id: 2,
                name: 'data-simple-json-container',
                description : 'Default container of the contents. All the elements should be put within this elements.'
            },
            {
                id: 3,
                name: 'data-simple-json-item',
                description : 'The element template. This elements will be replicated for each element in the DATA SOURCE array. Allow CONTAINER and DATA SOURCE nested.'
            },
            {
                id: 4,
                name: 'data-simple-json-empty-data',
                description: 'This element will be showed if no item reached from the DATA SOURCE'
            },
            {
                id: 5,
                name: 'data-simple-json-remove-on-empty',
                description: 'This DataSet attribute says that element should be hide weather no elements found in DATA SOURCE'
            }
            
        ]    
    }
};

var jsonReference2 = 
{
    result:
    {
        items:
        [
            {
                id: 1,
                name: 'data-simple-json-data-source',
                description : 'Determine if the element is a DATA SOURCE. Is the container of the ITEMS'
            },
            {
                id: 2,
                name: 'data-simple-json-container',
                description : 'Default container of the contents. All the elements should be put within this elements.'
            }
            
        ]    
    }
}

var listJson = 
{
    result:
    {

        items:
        [
            {id: 1, name: 'Dorian', dataNascimento: '03/01/1988'},
            {id: 2, name: 'Tadeu', dataNascimento: '03/01/1990'},
            {id: 3, name: 'Maria', dataNascimento: '03/01/1980'},
            {id: 4, name: 'Ana', dataNascimento: '03/01/1998'}
        ]
    }
}

var json3Levels = 
{
    result:
    {
        pessoas:
        [
            {
                id: 1,
                name: 'Dorian',
                // livros:
                // [
                //     {id: 1, title: 'O Senhor dos Anéis', 
                //         capitulos:[ {id: 0, name: ''}]},
                //     {id: 2, title: 'O Código da Vinci', 
                //         capitulos:[ {id: 0, name: ''}]},
                //     {id: 6, title: 'Assassin´s Creed', 
                //         capitulos:[ {id: 0, name: ''}]},
                //     {id: 8, title: 'Monte Cinco',
                //         capitulos:
                //         [
                //             {id: 103, name: 'Chapter 1'},
                //             {id: 104, name: 'Chapter 2'},
                //             {id: 105, name: 'Chapter 3'}
                //         ]}


                // ]
            },
            {
                id: 2,
                name: 'Paula',
                livros:
                [
                    {
                        id: 7,
                        title: 'A Menina que Roubava Livros',
                        capitulos:
                        [
                            {id: 100, name: 'Chapter 1'},
                            {id: 101, name: 'Chapter 2'},
                        
                        ]
                    },
                    {id: 9, title: 'O Símbolo Sagrado'},
                ]
            },

            // {
            //     id: 2,
            //     name: 'John',
            //     livros:
            //     [
            //         {id: 11, title: 'Poder sem Limites', capitulos:[]},
            //         {id: 12, title: 'O Segredo'},
            //         {id: 13, title: 'A Volta dos Que Não Foram'},

            //     ]
            // },


        ]
    }
}

var singleJson = 
{
    result:
    {

        id: 1, name: 'Andreia', dataNascimento: '03/01/1988'
        
    }
}

var jsonMenu = 
{
    result:
    {
        items:
        [
            {title: 'Home', link: '/projetos/php2/'},
            {title: '3 Levels', link: '/projetos/php2/screens/levels.php'},
            {title: 'Reference', link: '/projetos/php2/screens/reference.php'}
        ]
        
    }
}