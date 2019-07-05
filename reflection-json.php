<?php
function getJson($obj, $fields=array())
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

    return json_encode($array_json);
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

$teste -> setId('2');
$teste -> setName('Maria Dolores');
$teste -> setIdade(38);

echo getJson($teste, ['name', 'id']);
?>

