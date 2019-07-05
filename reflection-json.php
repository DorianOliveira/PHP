<?php

namespace JsonHandler;

use ReflectionClass;

class JsonHandler
{

	public static function JsonParseObject($obj, $fields=array())
	{
	    
	    $array_json = JsonHandler :: CreateArrayProperties($obj, $fields);
	    return json_encode( $array_json);
	}

	private static function CreateArrayProperties($obj, $fields = array())
	{
		$reflection = new ReflectionClass($obj);

	    $props = $reflection -> getProperties();

	    $array_json = array();


	    foreach($props as $prop)
	    {   
	    	$valid_property = true;

	    	if(is_array($fields) && count($fields) > 0)
	    	{
	    		if(!in_array($prop -> getName(), $fields))
	    			$valid_property = false;
	    	}
	    
	    	if($valid_property)
	    	{
	    		$prop -> setAccessible(true);
		  		$array_json[$prop -> getName()] = $prop -> getValue($obj);		
	    	}
	    }

	    return $array_json;

	}

	public static function JsonParseObjectList($listObj, $fields=array())
	{
		$listJson = array();

		$counter_item = 1;
		foreach($listObj as $obj)
			$listJson['item' . $counter_item ++] = JsonHandler :: CreateArrayProperties($obj, $fields);

		return json_encode($listJson);
	}

}



class Teste{
	private $id;
	private $name;
	private $idade;

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
}

$teste = new Teste();

$teste -> setId('1');
$teste -> setName('Maria Dolores');
$teste -> setIdade(38);

$teste2 = new Teste();
$teste2 -> setId('2');
$teste2 -> setName('João Espinafre');
$teste2 -> setIdade(22);

$teste3 = new Teste();
$teste3 -> setId('3');
$teste3 -> setName('Carla Perez');
$teste3 -> setIdade(36);

$objs = array();

$objs[] = $teste;
$objs[] = $teste2;
$objs[] = $teste3;

header('Content-Type: application/json; charset=ISO-8859-1');

//echo JsonHandler :: JsonParseObject($teste, ['name', 'id']);


echo JsonHandler :: JsonParseObjectList($objs);

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

