let contador = 0; //ES PARA QUE BORRE MI FORMULARIO

const enviar = e => {
	e.preventDefault()
	const filaA = parseInt(document.getElementsByName('number1')[0].value)
	const colA = parseInt(document.getElementsByName('number2')[0].value)
	const filaB = parseInt(document.getElementsByName('number3')[0].value)
	const colB = parseInt(document.getElementsByName('number4')[0].value)
	let matriz1
	let matriz2
	let matrizRes



	function CreaMatriz(n, m) {
		this.length = n
		for (var i = 0; i < n; i++) {
			this[i] = new Array(m)
		}
		return this
	}

	function Cargar() {
		var q = 0;

		for (i = 0; i < filaA; i++) {
			for (j = 0; j < colA; j++) {
				matriz1[i][j] = parseInt(document.matrizA.elements[q].value);
				q++;
			}
		}

		q = 0;
		for (i = 0; i < filaB; i++) {
			for (j = 0; j < colB; j++) {
				matriz2[i][j] = parseInt(document.matrizB.elements[q].value);
				q++;
			}
		}

	}


	if (contador > 0) {
		// alert("entre en borrar")
		Borrar(), BorrarRes()
	}

	if (isNaN(filaA) || isNaN(colA) || isNaN(filaB) || isNaN(colB)) {
		alert("Valores no validos.");
	} else if (colA != filaB) {
		alert("Dimensiones de las matrices no validas.El numero de columnas de A debe serigual al nmero de filas de B.");
	} else {

		CrearFormularios(filaA, colA, filaB, colB)
		matrizRes = new CreaMatriz(filaA, colB);
		matriz1 = new CreaMatriz(filaA, colA);
		matriz2 = new CreaMatriz(filaB, colB);
		contador++
	}


	function CrearFormularios(filA, colA, filB, colB) {
		var d = document.createElement("DIV");
		var fA = document.createElement("FORM");
		var fB = document.createElement("FORM");
		var A = document.createTextNode("Matriz A");
		var B = document.createTextNode("Matriz B");
		d.setAttribute("id", "matrices3");
		d.setAttribute("align", "center");
		d.setAttribute("style", "width: 50%; height: 100%; float: left; background-color: 66FF66");
		fA.setAttribute("name", "matrizA");
		fB.setAttribute("name", "matrizB");


		var boton = document.createElement("INPUT");
		boton.setAttribute("type", "button");
		boton.setAttribute("value", "CARGAR MATRIZ");
		boton.setAttribute("name", "button");
		boton.setAttribute("class", "btn btn-outline-success");
		// boton.setAttribute("class","");

		boton.onclick = function () {
			Cargar(), mandarFetch(), BorrarRes()
		}

		for (i = 0; i < filA; i++) {
			var salto = document.createElement("BR");
			for (j = 0; j < colA; j++) {
				var casilla = document.createElement("INPUT");
				casilla.setAttribute("type", "text");
				casilla.setAttribute("class", "rounded-pill")
				casilla.setAttribute("size", "4");
				casilla.setAttribute("name", "text");
				fA.appendChild(casilla);
			}
			fA.appendChild(salto);
		}
		for (i = 0; i < filB; i++) {
			var salto = document.createElement("BR");
			for (j = 0; j < colB; j++) {
				var casilla = document.createElement("INPUT");
				casilla.setAttribute("type", "text");
				casilla.setAttribute("class", "rounded-pill")
				casilla.setAttribute("size", "4");
				casilla.setAttribute("name", "text");
				fB.appendChild(casilla);
			}
			fB.appendChild(salto);
		}
		var salto = document.createElement("BR");
		d.appendChild(salto);
		d.appendChild(A);
		fA.appendChild(salto);
		d.appendChild(fA);
		d.appendChild(B);
		d.appendChild(fB);
		var salto = document.createElement("BR");
		d.appendChild(salto);
		d.appendChild(boton);

		var otro = document.getElementById("main");
		otro.appendChild(d);
	}


	function BorrarRes() {
		// var capa1 = document.getElementById("matrices3");
		var resForm = document.getElementById("resultado3");
		//   var padre1 = capa1.parentNode;
		var padre = resForm.parentNode;
		padre.removeChild(resForm)
		//   padre1.removeChild(capa1);
	}


	function CrearFormRes(filaA, colB) {
		var capa = document.createElement("DIV");
		var fRes = document.createElement("FORM");
		var res = document.createTextNode("Matriz Resultado");
		capa.setAttribute("id", "resultado3");
		capa.setAttribute("align", "center");
		capa.setAttribute("style", "width: 50%; height: 100%; float:right; background-color: 20B2AA");
		fRes.setAttribute("name", "matrizR");


		for (i = 0; i < filaA; i++) {
			var salto = document.createElement("BR");
			for (j = 0; j < colB; j++) {
				var casilla = document.createElement("INPUT");
				casilla.setAttribute("type", "text");
				casilla.setAttribute("class", "rounded-pill")
				casilla.setAttribute("width", "80%")
				casilla.setAttribute("height", "1000%")
				casilla.setAttribute("size", "4");
				casilla.setAttribute("name", "text");
				casilla.readOnly = "true";
				fRes.appendChild(casilla);
			}
			fRes.appendChild(salto);
		}

		var salto = document.createElement("BR");
		capa.appendChild(salto);
		capa.appendChild(res);
		capa.appendChild(fRes);

		var otro = document.getElementById("padreRes");
		otro.appendChild(capa);
	}


	function Mostrar() { //me muestra el resultado de multlicar las matrices matrizA y matrizB
		Cargar()
		var q = 0;

		for (i = 0; i < matrizRes.length; i++) {
			for (j = 0; j < matrizRes[i].length; j++) {
				document.matrizR.elements[q].value = matrizRes[i][j];
				matrizRes[i][j] = 0;
				q++;
			}
		}
	}


	function mandarFetch() {

		const config = {
			method: 'POST',
			headers: {
				'Content-type': 'application/json'
			},
			body: JSON.stringify({ // convierte a formato json     //todo lo que esta en el body lo voy a pasar a mi back end  para realizar la multiplicacion
				numb_1: filaA,
				numb_2: colA,
				numb_3: filaB,
				numb_4: colB,
				matrizA: matriz1,
				matrizB: matriz2,
				matrizR: matrizRes,
			})
		}


		fetch('/multiplicar', config)
			.then(response => response.json())
			.then(res =>
				// document.getElementById("matrizRes").innerHTML=`
				{
					CrearFormRes(filaA, colB),
						matrizRes = res.resultado,
						Mostrar()
				}
			)
			//una ves que trae la respuesta del mi API ME mustra la respuesta
			.catch(err => console.log(err))
	}


	function Borrar() {
		var capa1 = document.getElementById("matrices3");
		// var capa2 = document.getElementById("resultado3");
		var padre1 = capa1.parentNode;
		//  var padre2 = capa2.parentNode;
		padre1.removeChild(capa1);
	}


}