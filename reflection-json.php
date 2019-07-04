<?php
function getJson($obj)
{
    $reflection = new ReflectionClass($obj);

    $props = $reflection -> getProperties();

    $array_json = array();

    foreach($props as $prop)
    {
        $prop -> setAccessible(true);

        $array_json[$prop -> getName()] = $prop -> getValue($obj);
    }

    return json_encode($array_json);
}

?>