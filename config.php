<?php 

define('PROTOCOL', (!empty($_SERVER['HTTPS']) ? 'https' : 'http') . '://');
define('BASE_PATH', dirname(__FILE__));
define('BASE_URL', PROTOCOL . $_SERVER['HTTP_HOST'] . '/projetos/php2');