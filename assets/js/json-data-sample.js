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
                    {id: 4, title: 'O Código da Vinci'},
                    {id: 8, title: 'Assassin´s Creed'},
                    {id: 12, title: 'Monte Cinco'}


                ]
            },
            {
                id: 2,
                name: 'Paula',
                livros:
                [
                    {id: 5, title: 'A Menina que Roubava Livros'},
                    {id: 34, title: 'O Símbolo Sagrado'},
                ]
            }
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
            {title: 'Home', link: '/'},
            {title: 'Single', link: '/projetos/php2/single.php'},
            {title: 'List Container', link: '/projetos/php2/list-container.php'},
            {title: 'Table', link: '/projetos/php2/table.php'},
            {title: 'Select', link: '/projetos/php2/select.php'},
            {title: '3 Levels', link: '/projetos/php2/screens/levels.php'}
        ]
        
    }
}