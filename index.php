
<?php require_once('header.php');


$html_basic_sample =  htmlentities('
<section data-simple-json-container>
 <div class="single-data" data-simple-json-item>
   <h4 id="{@id}">{@name}</h4>
   <p>{@dataNascimento}</p>
   <hr>
 </div>
</section>'
);

function BeginScriptTag()
{
	echo htmlentities('<script>');
}

function EndScriptTag()
{
	echo htmlentities('</script>');
}

?>
<h1>Simple Json JS Framework</h1>
<p>The most basic && simple powerful solution to render JSON in a web application!</p>
<div class="row">
		<div class="col-md-8">
			<h4>Single Data</h4>
			<pre>
				<code class="html">
<?php echo $html ?>
				</code>
			</pre>
			<h4>Basic Usage</h4>
			<pre>
				<code class="html">
<?php BeginScriptTag(); ?>

let singleSample = $('.single-data');
if(singleSample.length > 0)
{
    singleSample.RenderJson({
        data: singleJson,
        mainKey: 'result'
    });

    singleSample.RenderJsonItem();
}  
<?php EndScriptTag(); ?>
				</code>
			</pre>
		</div>
	</div>
</div>



<?php require_once('footer.php');