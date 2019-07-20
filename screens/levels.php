<?php


require_once($_SERVER['DOCUMENT_ROOT'] . '\projetos\php2\header.php') ?>

<section class="container-3-levels" data-simple-json-container="template-levels">
	<div class="levels-template" data-simple-json-template="template-levels">
		<h2>Nome: {@name}</h2>
		<p>id: {@id}</p>
		<hr>
		<select
			data-simple-json-container="template-livros"
			data-simple-json-data-source="livros">
			<option
				data-simple-json-template="template-livros"
					data-simple-json-item="livro" value="{@id}">{@title}</option>
		</select>
	</div>
</section>

<?php require_once($_SERVER['DOCUMENT_ROOT'] . '/projetos/php2/footer.php') ?>

