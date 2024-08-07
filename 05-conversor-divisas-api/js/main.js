/* Uso estricto */
"use strict";
//Variables Globales

var codigoSelector = '';

var objeto = {
    a: 1,
    b: 4,
    c: 9,
}

//Bucle for...in pensado para recorrer objetos (no arrays)
for (const key in objeto) {

    //Pintariamos el nombre de cada una de las propiedades(a,b,c)
    console.log(key);

    //Pintariamos los valores de las propiedades(1, 4, 9)
    console.log(objeto[key]);
}



/* Paso 0; ¿cual es la interacción?
Necesito ejecutar el codigo cuando haga click (onclick)
*/

function convertir() {

    /* Compruebo que se ejecuta este codigo al hacer click */
    console.log("estoy dentro de la funcion convertir");

    /* Paso 1: Obtengo los datos del formulario */
    var cantidad = document.getElementById("cantidad").value;
    console.log("cantidad = " + cantidad);

    var monedaEntrada = document.getElementById("moneda-entrada").value;
    console.log("moneda Entrada = " + monedaEntrada);

    var monedaSalida = document.getElementById("moneda-salida").value;
    console.log("moneda Salida = " + monedaSalida);


    /* Paso 2: Convertir datos String a numeros */

    cantidad = Number(cantidad);
    console.log("cantidad = " + cantidad + " y es de tipo " + typeof (cantidad));

    //Paso 3: Realizar operaciones necesarias para obtener un resultado 
    var urlConversor = "https://open.er-api.com/v6/latest/" + monedaEntrada;

    console.log(urlConversor);


    //Paso 1: Creo la petición (nueva)
    var xmlhttp = new XMLHttpRequest();

    //Paso 2: Construye la petición
    xmlhttp.open("GET", urlConversor, true);

    //Paso 3: Manda la petición
    xmlhttp.send();


    //Paso 4: Cuando se reciban los datos haces lo que quieras...
    xmlhttp.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {
            var myObj = JSON.parse(this.responseText);
            console.log(myObj);

            var tasaCambio = myObj.rates[monedaSalida];

            console.log("tasaCambio = " + tasaCambio);

            var resultado = cantidad * tasaCambio;

            console.log("resultado = " + resultado);

            console.log("resultado = " + resultado + " y es de tipo " + typeof (resultado)); //Los console.log es para ir viendo a cada paso si se pinta en la consola y ver que funciona.

            document.getElementById("t-moneda-entrada").innerHTML = monedaEntrada;
            document.getElementById("t-moneda-salida").innerHTML = monedaSalida;
            document.getElementById("t-cantidad-entrada").innerHTML = cantidad.toLocaleString("es-ES", { style: "currency", currency: monedaEntrada });
            document.getElementById("t-cantidad-salida").innerHTML = resultado.toLocaleString("es-ES", { style: "currency", currency: monedaSalida });
        }

    };





}


function cargarSelector() {

    
    var urlMonedas = "https://open.er-api.com/v6/latest/EUR";

    console.log(urlMonedas);
    
    //Paso 1: Creo la petición (nueva)
    var xmlhttp1 = new XMLHttpRequest();
    
    //Paso 2: Construye la petición
    xmlhttp1.open("GET", urlMonedas, true);
    
    //Paso 3: Manda la petición
    xmlhttp1.send();
    
    
    //Paso 4: Cuando se reciban los datos haces lo que quieras...
    xmlhttp1.onreadystatechange = function () {
        
        if (this.readyState == 4 && this.status == 200) {
            var myObj1 = JSON.parse(this.responseText);
            console.log(myObj1);
            
            //Accedo a todos los keys
            
            
            for (const key in myObj1.rates) {


                var nombreMoneda = key;

                var codigoOption = '<option>'+ nombreMoneda +'</option>';

                //Acumulo el valor de codigoSelector

                codigoSelector += codigoOption;

                
                console.log(key);

                /* console.log(myObj1.rates[key]);  no lo necesito*/
             

            }

            //Pinto los option dentro de los selectores

            document.getElementById("moneda-entrada").innerHTML = codigoSelector;
            document.getElementById("moneda-salida").innerHTML = codigoSelector;




        }

    };



}