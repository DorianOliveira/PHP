
<?php require_once($_SERVER['DOCUMENT_ROOT'] . '/projetos/php2/header.php');


$html_basic_sample =  htmlentities('
<section data-simple-json-container>
 <div class="single-data" data-simple-json-item>
   <h4 id="{@id}">{@name}</h4>
   <p>{@dataNascimento}</p>
   <hr>
 </div>
</section>'
);

$javascript_basic_sample =
BeginScriptTag() .
"\nlet singleSample = $('.single-data');
if(singleSample.length > 0)
{
	singleSample.RenderJson({
    data: singleJson,
    mainKey: 'result'
});

singleSample.RenderJsonItem();
}\n"
.EndScriptTag();

$html_simple_list = htmlentities('
<section data-simple-json-container>
	<div data-simple-json-data-source>
		<div class="template-reference" data-simple-json-item="{@id}">
			<h4 id="{@id}">{@name}</h4>
			<p>{@description}</p>
			<hr>
		</div>	
	</div>
</section>
');

$javascript_list_sample = 
BeginScriptTag() .
"\nreference = $('.template-reference');
	
reference.RenderJson({
	data: jsonReference.result,
	mainKey: 'items'
});

reference.RenderJsonList();\n"
.EndScriptTag();


function BeginScriptTag()
{
	return htmlentities('<script>');
}

function EndScriptTag()
{
	return htmlentities('</script>');
}

?>


<h1>Simple Json JS Framework</h1>
<p>The most basic && simple powerful solution to render JSON in a web application!</p>
<div class="row">
	<div class="col-md-8">
		<h4>Single Data</h4>
		<p>If you need show a single object value and your properties.</p>
		<pre>
			<code class="html">
<?php echo $html_basic_sample ?>
			</code>
		</pre>
		<h4>Basic Usage</h4>
		<pre>
			<code class="html">
<?php echo $javascript_basic_sample; ?>


			</code>
		</pre>
	</div>
</div>


<div class="row">
	<div class="col-md-8">
		<h4>Single List</h4>
		<p>If you need list many items. <strong>It´s recursive!</strong></p>
		<pre>
			<code class="html">
<?php echo $html_simple_list ?>
			</code>
		</pre>
		<h4>Basic Usage</h4>
		<pre>
			<code class="html">
<?php echo $javascript_list_sample; ?>
			</code>
		</pre>
		
	</div>
</div>





<?php require_once(BASE_PATH . 'footer.php');