<?php


require_once($_SERVER["DOCUMENT_ROOT"] . '\projetos\php2\header.php') ?>

<h2>Single</h2>
<p>You need show only a single data? That´s the best solution you can get. <strong>Check the code!</strong></p>

<section class="row">
	<div class="col-md-8">
	<section class="default-box single-data-container" data-simple-json-container="single-data">
		<div class="single-data" data-simple-json-item="{@id}">
			<h4 id="{@id}">{@name}

			</h4>
			<p>{@dataNascimento}</p>
			<hr>
		</div>	
	</section>
</div>
	
</section>


<?php require_once(BASE_PATH . '\footer.php') ?>

