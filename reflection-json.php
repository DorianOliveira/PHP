<?php

namespace JsonHandler;

use ReflectionClass;
class JsonHandler
{
    const HEADER = 'Content-Type: application/json';
    private $jsonData;

    public function CreateFromArray($array, $key = '')
    {
        $result = $array;
        
        if($key != '')
        {
            $result = array($key => $array);
        }
        $this -> jsonData = json_encode($result);
    }
    public  function PrintJson()
    {
        header(self :: HEADER);
        echo $this -> jsonData;
    } 
	public function CreateFromObject($obj, $fields=array(), $key = '')
	{
	    $array_json = JsonHandler :: CreateArrayProperties($obj, $fields);
	    $this -> jsonData = json_encode( $array_json);
	}
	private function CreateArrayProperties($obj, $fields = array())
	{
		$reflection = new ReflectionClass($obj);
	    $props = $reflection -> getProperties();
		$array_json = array();
		
		//var_dump($props);
	    foreach($props as $prop)
	    {   
	    	$valid_property = true;
	    	if(is_array($fields) && count($fields) > 0)
	    	{
	    		if(!in_array($prop -> getName(), $fields))
	    			$valid_property = false;
	    	}
			//echo $valid_property;
	    	if($valid_property)
	    	{
				
				$prop -> setAccessible(true);
				
				//var_dump($prop -> getValue($obj));
				//echo gettype($prop -> getValue($obj));
				$type = gettype($prop -> getValue($obj));
				
				$value_object = null;

				if($type == 'object')
				{
					$value_object = $this -> CreateArrayProperties($prop -> getValue($obj), array());
				}
				else
				{
					$value_object = $prop -> getValue($obj);
				}
				
				$array_json[$prop -> getName()] = $value_object;
	    	}
		}
		
		return $array_json;
	}
	public  function CreateFromListObject($listObj, $fields=array())
	{
		$listJson = array();
        $counter_item = 1;
        
		foreach($listObj as $obj)
			$listJson['item' . $counter_item ++] = JsonHandler :: CreateArrayProperties($obj, $fields);
        
        $this -> jsonData =  json_encode($listJson);
	}
}


class Teste{
	private $id;
	private $name;
	private $idade;
	private $teste;

	public function setId($id)
	{
		$this -> id = $id;
	}

	public function setName($name)
	{
		$this -> name = $name;
	}

	public function setIdade($idade)
	{
		$this -> idade = $idade;
	}

	public function getTeste()
	{
		return $this -> teste;
	}

	public function setTeste(Teste $teste)
	{
		$this -> teste = $teste;
	}
}

$teste = new Teste();
$teste2 = new Teste();
$teste3 = new Teste();

$teste -> setId('1');
$teste -> setName('Maria Dolores');
$teste -> setIdade(38);
$teste -> setTeste($teste2);


$teste2 -> setId('2');
$teste2 -> setName('João Espinafre');
$teste2 -> setIdade(22);
$teste3 -> setTeste($teste3);

$teste3 -> setId('3');
$teste3 -> setName('Carla Perez');
$teste3 -> setIdade(36);

$objs = array();

$objs[] = $teste;
$objs[] = $teste2;
$objs[] = $teste3;

$jsonHandler = new JsonHandler();

$jsonHandler -> CreateFromObject($teste);
$jsonHandler -> PrintJson();
exit;
?>
<script>
	//Exemplo javascript com jQuery

	jQuery(function(){
		jQuery.get('reflection-json.php', function(data){ 

		   for(var item in data)
		   {
		        var current_item = data[item];
		          
		        console.log(current_item.name);
		        console.log(current_item.id);
		        console.log(current_item.idade);  
		   }
		});
	});
</script>

