<!doctype html>

<html lang="pt-br">
<head>
  <meta charset="iso-8859-1">

  <title>Testes</title>

</head>

<body>


	<section class="my-template" data-id-template="my-template">

		<h2>Exibição de informação simples</h2>
		<div data-json-item="my-item" data-json-attr="id" data-json-key="id">
			<p data-json-key="id"></p>
			<p data-json-key="name"></p>
			<p data-json-key="dataNascimento"></p>
		</div>

	</section>
	<section class="my-container" data-json-template="my-template"></section>

	<section data-json-template="my-container-list">
		<h2>Exibição de informação em Lista</h2>
	</section>



	<section style="display: none;" class="my-list-template" data-id-template="my-container-list">

		
		<div data-json-item="my-item" data-json-attr="id" data-json-key="id">
			<p data-json-key="id"></p>
			<p data-json-key="name"></p>
			<p data-json-key="dataNascimento"></p>
		</div>

	</section>

	<footer>
	
	</footer>

	<script src="jquery-3.4.1.min.js"></script>
	<script src="json-render-framework.js"></script>
	<script src="json-data-sample.js"></script>
	
	<script>

		$(document).ready(function(){

			let settingsRender = {
				data: singleJson,
				mainKey: 'result',
			};

			obj = $('.my-template').RenderJson(settingsRender);
			obj.RenderJsonItem();


			let settingsListRender = 
			{
				data: listJson.result,
				mainKey: 'items'
			}

			list = $('.my-list-template').RenderJson(settingsListRender);
			list.RenderJsonList();


		})
		

	</script>
</body>
</html>