<?php require_once(dirname(__FILE__) . '/config.php') ?>

<!doctype html>
<html lang="pt-br">
	<head>
	  	<meta charset="iso-8859-1">

	  	<title>Testes</title>
	  	<link href="<?php echo BASE_URL; ?>/assets/bootstrap/css/bootstrap.css" rel="stylesheet">
	  	<link href="<?php echo BASE_URL; ?>/assets/css/styles.css" rel="stylesheet">

		<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.8/styles/default.min.css">
		<script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.8/highlight.min.js"></script>

		<script type="module" src="<?php echo BASE_URL; ?>/app.js"></script>
	</head>

	<body>
	
	<?php require_once(BASE_PATH . '/components/menu.php'); ?>

	<div class="container-fluid">