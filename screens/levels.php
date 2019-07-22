<?php
require_once($_SERVER['DOCUMENT_ROOT'] . '\projetos\php2\header.php') ?>

<h2>Sample - Levels</h2>
<p>In this sample, we have a 2 levels container: A list of people, with his particular book list. <strong>Check the code</strong>!</p>

	<!-- <select
	class="form-control"
	data-simple-json-container="template-livros"
	data-simple-json-data-source="livros">
	<option
		data-simple-json-template="template-livros"
		value="{@id}">{@id} - {@title}</option>
</select> -->

<section class="row">
	<div class="col-md-6">
		<section data-simple-json-container="template-levels">
			<div data-simple-json-data-source>
				<div data-simple-json-item class="levels-template">
					<h4>{@id}. {@name}</h4>
					<hr>
				
					<div data-simple-json-container="template-livros">
						<ul
							id="ul-livros"
							data-simple-json-data-source="livros">
							<li data-simple-json-item id="{@id}">
								<span>{@id} - {@title}</span>
								
								<div id="container-capitulos" data-simple-json-container="template-chapters">
									<select
										id="select-capitulos"
										data-simple-json-remove-on-empty
										data-simple-json-data-source="capitulos">
										<option value="{@id}" data-simple-json-item>{@id} - {@name}</option>
									</select>
									<div data-simple-json-empty-data>
										<p>Capítulos não encontrados para este livro</p>
									</div>
								</div>
							</li>
						</ul>
						<div data-simple-json-empty-data>
							<p>Livros não encontrados</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	</div>
</section>


<?php require_once($_SERVER['DOCUMENT_ROOT'] . '/projetos/php2/footer.php') ?>

