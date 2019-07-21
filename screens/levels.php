<?php


require_once($_SERVER['DOCUMENT_ROOT'] . '\projetos\php2\header.php') ?>

<h2>Sample - Levels</h2>
<p>In this sample, we have a 2 levels container: A list of people, with his particular book list. <strong>Check the code</strong>!</p>

<section class="row">
	<div class="col-md-6">
		<section class="container-3-levels" data-simple-json-container="template-levels">
			<div class="levels-template" data-simple-json-template="template-levels">
				<h4>{@id}. {@name}</h4>
				
				<hr>
				<div class="form-group">
					<!-- <select
						class="form-control"
						data-simple-json-container="template-livros"
						data-simple-json-data-source="livros">
						<option
							data-simple-json-template="template-livros"
							value="{@id}">{@id} - {@title}</option>
					</select> -->
					<ul
						data-simple-json-container="template-livros"
						data-simple-json-data-source="livros"
						>
						<li data-simple-json-template="template-livros" id="{@id}">
							{@id} - {@title}

							<select
								data-simple-json-container="template-chapters"
								data-simple-json-data-source="capitulos">
								<option data-simple-json-template="template-chapters">{@id} - {@name}</option>
							</select>
						</li>
					</ul>
				</div>
			</div>
		</section>
		
	</div>
</section>


<?php require_once($_SERVER['DOCUMENT_ROOT'] . '/projetos/php2/footer.php') ?>

