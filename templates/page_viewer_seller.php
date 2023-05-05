<!DOCTYPE html>
<html>
<head>
	<title>MG RDMS DOCUMENT VIEWER</title>
	<link rel="stylesheet" href="/css/bootstrap.min.css">
	<link rel="stylesheet" href="/css/jquery.ui.css">
	<script src="/js/jquery.min.js"></script>
	<!-- <script src="/js/jquery-3.3.1.min.js"></script>
	<script src="/css/jquery.ui.1.12.js?v=4"></script> -->
	<script src="/js/bootstrap.min.js"></script>
	<script src="/js/myscript.js?v=4"></script>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
	<style>
	 label{ font-weight:normal; }
	 .iv-snap-view{position: fixed !important;}
	</style>
</head>
<body>
<link href="/js/ImageViewer/imageviewer.css"  rel="stylesheet" type="text/css" />
<script src="/js/ImageViewer/imageviewer.js"></script>
<?php

$config_param_one=trim($config_param1); //encripted token
$config_param_two=trim($config_param2); // type

if($config_param_one && ($config_param_two == "pan_img" || $config_param_two == "aadhar_frnt_img" || $config_param_two == "aadhar_bck_img" || $config_param_two == "address_frnt_img" || $config_param_two == "address_bck_img" || $config_param_two == "secuirty_dep_img" || $config_param_two == "gst_doc")){

	$id = data_decrypt($config_param_one);
	 //echo $id;
	 //echo '<br>';exit;
    if( !is_numeric($id) ){
		echo "<p>Incorrect Lead Id incorrect!</p>";
	}else{
		//$connection->debug=true;
			$agreement = $connection->get_record([
				"table"=>"brokers",
				"fields" => $config_param_two,
				"where"=>["id"=>$id]
			]);
	
		// print_r($agreement);
		if( !$agreement ){
			echo "<p>Proofs not found!</p>";
		}else{        
			if($agreement[$config_param_two]!="") { ?>
				<center>
				<?php 
				// echo $agreement['token_receipt'] ;
				// echo '<br>';
				$pathinfo = pathinfo( $agreement[$config_param_two] );
                
				if( preg_match("/^(jpg|jpeg|png)$/", $pathinfo['extension']) ){
             
					 //echo '/?action=view_token_receipt&type='.$config_param1.'&sl_id='.$config_param2. '&rnd='.time();
             	?>
					<div id="image-gallery-3" class="cf w-100" style='cursor: zoom-in'>
					    <img src="/?action=<?=$config_param_two?>&type=<?=$config_param_two ?>&broker_id=<?=$config_param_one ?>&rnd=<?=time() ?>" data-high-res-src="<?=$vurl ?>" alt="Document" class="pannable-image w-100"  >
					    
					    <script>
						$(function (){
							$('.pannable-image').ImageViewer();
						});
						</script>
					</div>				
				<?php } else { ?>
					<div class="w-100">
                    <?php 
                    /*echo "/ViewerJS/?title=Agreement Proof#/?action=".$config_param_two."&type=".$config_param_two.
                    "&broker_id=".$config_param_one."&rnd=".time();
                    echo "<br/>";
                    echo $vurl;
                    exit;*/
                    ?>
						<iframe src="/ViewerJS/?title=Agreement Proof#/?action=<?=$config_param_two?>&type=<?=$config_param_two ?>&broker_id=<?=$config_param_one ?>&rnd=<?=time()?>" data-high-res-src="<?=$vurl ?>" alt="Document" class="w-100" id="doc_viewer" style="min-height: 600px;"></iframe>
					</div>
				<?php }	?>
				</center>
			<?php 
			}else{
				echo "<p>No Document Found</p>";
			}
		}
	}
}else{

	echo "<p>Incorrect URL</p>";
}
?>
</body>
</html>