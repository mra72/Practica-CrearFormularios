<?php
header('Content-Type: text/txt; charset=ISO-8859-1');
$respuesta=array();

$method='';
$action='';
$target='';
$bSubmit=false;
$bReset=false;
$elementosFormulario=Array();


if($_REQUEST["method"]!='vacio'){
	$method=$_REQUEST["method"];
}

if($_REQUEST["action"]!=''){
	$action=$_REQUEST["action"];
}

if($_REQUEST["target"]!='vacio'){
	$target=$_REQUEST["target"];
}

$tamanio = sizeof($_REQUEST["elementosFormulario"]);
if($tamanio > 0){
	$elementosFormulario=$_REQUEST["elementosFormulario"];
}


if($_REQUEST["bSubmit"]==true){
	$bSubmit=true;
}


if($_REQUEST["bReset"]== true){
	$bReset=$_REQUEST["bReset"];
}


$respuesta["method"]=$method;
$respuesta["action"]=$action;
$respuesta["target"]=$target;
$respuesta["bSubmit"]=$bSubmit;
$respuesta["bReset"]=$bReset;
$respuesta["elementosFormulario"] = $elementosFormulario;


echo json_encode($respuesta);

?>