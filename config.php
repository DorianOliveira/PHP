<?php

define('APP_FOLDER', '/projetos/php2');

function getProtocol()
{
	$protocol = '';
	if(isset($_SERVER['HTTPS']))
		$protocol = ($_SERVER['HTTPS'] && $_SERVER['HTTPS'] != 'off') ? 'https' : 'http';
	else
		$protocol = 'http';	

	return $protocol . '://';
}

function getHost()
{
	return $_SERVER['HTTP_HOST'] . APP_FOLDER;
}


function getBaseUrl()
{
	return getProtocol() . getHost();
}

function getBasePath()
{
	return $_SERVER['DOCUMENT_ROOT'] . APP_FOLDER;
}

define('BASE_PATH', getBasePath());
define('BASE_URL', getBaseUrl());

?>