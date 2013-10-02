$(function(){
	var cont = 0;
	var celdaInicial = "<tr><td><select name='tipoDato' id='tipoDato"+ cont +"' title='Tipo de Dato' style='width:120px'><option value='vacio'>(--vacío--)</option><option value='texto'>Texto</option><option value='oculto'>Oculto</option><option value='bSeleccion'>Botón de selección</option><option value='bRadio'>Radio</option></select></td><td><input id='nombreCampo"+ cont +"'type='text'/></td><td><input id='textoCabecera"+ cont +"'type='text'/></td><td><input  id='valorInicialCampo"+ cont +"'type='text'/></td></tr>";
	
	//Aplicar estilos
	$("body").addClass("body");
	$("p").addClass("p");
	$("fieldset").addClass("fieldset");
	//------
	
	$('#tablaElementos').append(celdaInicial);
	
	
	$('#addElemento').click(function(){
		cont++;
		var nuevaCelda = "<tr><td><select name='tipoDato' id='tipoDato"+ cont +"' title='Tipo de Dato' style='width:120px'><option value='vacio'>(--vacío--)</option><option value='texto'>Texto</option><option value='oculto'>Oculto</option><option value='bSeleccion'>Botón de selección</option><option value='bRadio'>Radio</option></select></td><td><input id='nombreCampo"+ cont +"'type='text'/></td><td><input id='textoCabecera"+ cont +"'type='text'/></td><td><input id='valorInicialCampo"+ cont +"'type='text'/></td></tr>";	
		$('#tablaElementos').append(nuevaCelda);	
		
	});
	
	$("#crearFormulario").click(function(){

		metodoenvio = $("#metodosenvio").val();
		pagdestino = $("#pagdestino").val();
		metodoscarga = $("#metodoscarga").val();
		var elemtosForm= Array();
		for (i=0; i<=cont;i++) {
			elemtosForm[i] = [$("#tipoDato"+i+"").val(),$("#nombreCampo"+i+"").val(),$("#textoCabecera"+i+"").val(),$("#valorInicialCampo"+i+"").val()];
		}

		enviar = $('#enviar').attr('checked');
		borrar = $('#borrar').attr('checked');

		
		$.getJSON("pagina1.php", {method:metodoenvio,action:pagdestino,target:metodoscarga,bSubmit:enviar,bReset:borrar, elementosFormulario:elemtosForm}, llegadaDatos);	
		return false;//Si no pongo el retorno a falso no me clava e resulado en la index...me redirige a pagina1.php
	});
	
	function llegadaDatos(datos){
			$("#resultados").empty();
			
			$("#resultados").append('<form id="miFormulario"></form>');
			$("#miFormulario").attr("method",datos.method );
			$("#miFormulario").attr("action",datos.action);
			$("#miFormulario").attr("target",datos.target);
			
			
			var tipo='';
			for (i=0; i <= datos.elementosFormulario.length-1;i++) {
				
				tipo=datos.elementosFormulario[i][0];
				
				switch(tipo){
					
					case 'texto': tipo="text";
								 break
					case 'oculto':tipo="hidden";
								 break
					case 'bSeleccion':tipo="checkbox";
									 break
					case 'bRadio':tipo="radio";
								 break
				}
				//if (datos.elementosFormulario[i][0] == "texto") 
				if (tipo != "vacio" && tipo!="checkbox" && tipo!="radio") 
					$("#miFormulario").append('<p>'+datos.elementosFormulario[i][2]+
					'<input type="'+tipo+'" value="'+datos.elementosFormulario[i][3]+
					'" name="'+datos.elementosFormulario[i][1]+'"/></p>');
				
				if (tipo != "vacio" && tipo=="checkbox" || tipo=="radio")
					$("#miFormulario").append(
					'<p><input type="'+tipo+'" value="'+datos.elementosFormulario[i][3]+
					'" name="'+datos.elementosFormulario[i][1]+'"/>'+datos.elementosFormulario[i][2]+'</p>');
			}
			
			if (datos.bSubmit) {
				$("#miFormulario").append('<input type="reset" id="botonSubmit" value="Enviar Formulario"/>');
			}		
			if (datos.bReset) {
				$("#miFormulario").append('<input type="reset" id="botonReset" value="Resetear Formulario"/>');
			}		
	}
})

