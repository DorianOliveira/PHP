var jsonReference = 
{
    result:
    {
        items:
        [
            {
                id: 1,
                name: 'data-simple-json-data-source',
                description : 'Utilizado quando é necessário passsar dados para um outro container dentro de um template. O valor passado é a <strong>key</strong> que tem os itens no JSON. Se o item não for array dará Erraydo.'
            },
            {
                id: 2,
                name: 'data-simple-json-container',
                description : 'É o container do template.'
            },
            {
                id: 3,
                name: 'data-simple-json-template',
                description : 'É o template que terá o conteúdo replicado pelo framework. Item obrigatório.'
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
                livros:
                [
                    {id: 1, title: 'O Senhor dos Anéis'},
                    {id: 2, title: 'O Código da Vinci'},
                    {id: 6, title: 'Assassin´s Creed'},
                    {id: 8, title: 'Monte Cinco'}


                ]
            },
            {
                id: 2,
                name: 'Paula',
                livros:
                [
                    {id: 7, title: 'A Menina que Roubava Livros'},
                    {id: 9, title: 'O Símbolo Sagrado'},
                ]
            },

            {
                id: 2,
                name: 'John',
                livros:
                [
                    {id: 11, title: 'Poder sem Limites'},
                    {id: 12, title: 'O Segredo'},
                    {id: 13, title: 'A Volta dos Que Não Foram'},

                ]
            },


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