function crearTabla() {
  // Obtener el número de filas y columnas
  var filas = parseInt(document.getElementById("filas").value);
  var columnas = parseInt(document.getElementById("columnas").value);

  // Obtener la tabla y su cuerpo
  var tablaMatriz = document.getElementById("matriz");
  var cuerpoTablaMatriz = tablaMatriz.createTBody();

  // Crear cada fila y sus celdas
  for (var i = 0; i < filas; i++) {
    var filaMatriz = cuerpoTablaMatriz.insertRow();
    for (var j = 0; j < columnas; j++) {
      var celdaMatriz = filaMatriz.insertCell();
      var entradaMatriz = document.createElement("input");
      entradaMatriz.type = "text";
      entradaMatriz.name = "matriz[" + i + "][" + j + "]";
      celdaMatriz.appendChild(entradaMatriz);
    }
  }

  var encabezado = document.createElement("h2");
  encabezado.textContent = "Introduce los elementos de la matriz";
  encabezado.id = "encabezadoMatriz";


  var padreTabla = tablaMatriz.parentNode;
  padreTabla.insertBefore(encabezado, tablaMatriz);

  document.getElementById("filas").style.display = "none";
  document.getElementById("columnas").style.display = "none";
  document.getElementById("crearPrimerTabla").style.display = "none";
  document.getElementById("lecturaEntrada").style.display = "none";
  document.getElementById("botonAgregarFila").style.display = "flex";
  document.getElementById("botonAgregarColumna").style.display = "flex";
  document.getElementById("botonEliminarFila").style.display = "flex";
  document.getElementById("botonEliminarColumna").style.display = "flex";
}



function calcularFraccion(numero) {
  var signo = Math.sign(numero);
  numero = Math.abs(numero);
  var entero = Math.floor(numero);
  var resto = numero - entero;
  var precision = 0.0001;
  var denominador = 1;
  while (resto > precision && denominador < 10000) {
    resto = resto * 2;
    denominador = denominador * 2;
    if (resto >= 1) {
      resto = resto - 1;
      entero = entero + (1 / denominador);
    }
  }
  var resultado = entero + resto;
  return signo * resultado;
}

// Crear la matriz a partir de los inputs
function crearMatriz() {
  var matriz = [];
  var filas = document.getElementById("matriz").rows;

  for (var i = 0; i < filas.length; i++) {
    var celdas = filas[i].cells;
    matriz[i] = [];

    for (var j = 0; j < celdas.length; j++) {
      var valor = celdas[j].childNodes[0].value;

      // Validar si se ingresó una letra
      if (isNaN(parseFloat(valor))) {
        alert("MATRIZ INVÁLIDA: Se ha ingresado una letra. Por favor, verifique que se introdujeron solo números en las celdas.");
        return null;
      }

      // Convertir el valor a fracción si es necesario
      if (valor.indexOf("/") >= 0) {
        // Si es una fracción, convertirla a decimal y luego a fracción nuevamente
        var partes = valor.split("/");
        var numerador = parseFloat(partes[0]);
        var denominador = parseFloat(partes[1]);
        if (isNaN(parseFloat(denominador))) {
          alert("MATRIZ INVÁLIDA: Se ha ingresado una letra. Por favor, verifique que se introdujeron solo números en las celdas.");
          return null;
        }
        valor = [numerador, denominador];
      } else {
        valor = [parseFloat(valor), 1];
      }

      matriz[i][j] = valor;
    }
  }

  return matriz;
}


// Crear la tabla con la matriz resultado
function crearTablaResultado(matriz) {
  // Obtener la tabla y su cuerpo
  var tablaResultado = document.getElementById("tablaResultado");
  var cuerpoTablaResultado = tablaResultado.createTBody();

  // Crear cada fila y sus celdas
  for (var i = 0; i < matriz.length; i++) {
    var filaResultado = cuerpoTablaResultado.insertRow();
    for (var j = 0; j < matriz[i].length; j++) {
      var celdaResultado = filaResultado.insertCell();
      var entradaResultado = document.createElement("input");
      entradaResultado.type = "text";
      entradaResultado.name = "resultado[" + i + "][" + j + "]";

      // Convertir el número a fracción
      var fraccion = decimalAFraccion(matriz[i][j][0], matriz[i][j][1]);

      entradaResultado.value = fraccion;

      celdaResultado.appendChild(entradaResultado);
    }
  }
}

// Función para convertir un decimal a fracción

function decimalAFraccion(a, b) {
  var decimal = a / b;
  var partes = decimal.toString().split(".");
  var signo = Math.sign(decimal);
  if (partes.length == 1) {
    return decimal;
  } else {
    var numerador = a;
    var denominador = b;
    return numerador + "/" + denominador;
  }
}
// Función para calcular el máximo común divisor de dos números
function gcd(a, b) {
  if (b === 0) {
    return a;
  }
  return gcd(b, a % b);
}


// Validar que la matriz tenga al menos una fila y una columna
function validarMatriz() {
  var filas = parseInt(document.getElementById("filas").value);
  var columnas = parseInt(document.getElementById("columnas").value);
  if (isNaN(filas) || isNaN(columnas) || filas < 1 || columnas < 1) {
    alert("La matriz debe tener al menos una fila y una columna");
    return false;
  }

  return true;
  
}
function checarCeros(){
  
}

// Calcular la matriz Gauss-Jordan
function calcular() {
  // Validar la matriz
  if (!validarMatriz()) {
    return;
  }
  var tablaResultado = document.getElementById("tablaResultado");
  while (tablaResultado.rows.length > 0) {
    tablaResultado.deleteRow(0);
  }
  var inputsResultado = document.querySelectorAll("#tablaResultado input[type='text']");
  inputsResultado.forEach(function(input) {
    input.value = "";
  });
  let view = document.getElementsByClassName("infosec2");
for (var i = 0; i < view.length; i++) {
  view[i].style.display = "flex";
}


  // Crear la matriz a partir de los inputs
  var matriz = crearMatriz();

  var n = matriz.length;
  var m = matriz[0].length;
  var j = 0;
  var i = 0;
  var z = 0;
  var p = [];

  // Resolver la matriz Gauss-Jordan
  while ( j < m-1 ) {
    i = z;
    while ( i < n ) {
      // Busca algun elemento diferente de cero
      if ( matriz[i][j][0] !== 0 ) {
        // Hace un cambio de renglon para que el pivote sea el diferente de cero
        for ( var q = 0; q < m; q++ ) {
          p[q] = matriz[i][q];
          matriz[i][q] = matriz[z][q];
          matriz[z][q] = p[q];
        }
        // Hace uno el pivote
        var d = matriz[z][j];
        for ( var q = 0; q < m; q++ ) {
          matriz[z][q] = [ matriz[z][q][0] * d[1], matriz[z][q][1] * d[0]];
          var mcd = gcd(matriz[z][q][0], matriz[z][q][1]);
          matriz[z][q] = [ matriz[z][q][0] / mcd, matriz[z][q][1] / mcd];
        }
        // Hace ceros abajo
        if ( i !== n-1 ) {
          for ( var h = i+1; h < n; h++ ) {
            var g = matriz[h][j];
            for ( var r = 0; r < m; r++ ) {
              var multip = [ (matriz[z][r][0] * g[0]), (matriz[z][r][1] * g[1]) ];
              matriz[h][r] = [ matriz[h][r][0] * multip[1] - matriz[h][r][1] * multip[0], matriz[h][r][1] * multip[1] ];
              var mcd = gcd(matriz[h][r][0], matriz[h][r][1]);
              matriz[h][r] = [ matriz[h][r][0] / mcd, matriz[h][r][1] / mcd];
            }
          }
        }
        // Hace ceros arriba
        if ( z !== 0 ) {
          for ( var t = 0; t < z; t++ ) {
            var s = matriz[t][j];
            for ( var w = 0; w < m; w++ ) {
              var multip = [ (matriz[z][w][0] * s[0]), (matriz[z][w][1] * s[1]) ];
              matriz[t][w] = [ matriz[t][w][0] * multip[1] - matriz[t][w][1] * multip[0], matriz[t][w][1] * multip[1] ];
              var mcd = gcd(matriz[t][w][0], matriz[t][w][1]);
              matriz[t][w] = [ matriz[t][w][0] / mcd, matriz[t][w][1] / mcd];
            }
          }
        }
        z += 1;
        i = z-1;
        if ( j === m-2 ) {
          break;
        }
        j = j+1;
      }
      i += 1;
    }
    j += 1;
  }

  // Crear la tabla con la matriz resultado
  crearTablaResultado(matriz);
}


// Borrar todos los inputs de la matriz y la matriz resultado
function borrarNumeros() {
  var tablaMatriz = document.getElementById("matriz");
  var tablaResultado = document.getElementById("tablaResultado");

  // Borrar la matriz
  while (tablaMatriz.rows.length > 0) {
    tablaMatriz.deleteRow(0);
  }
  let view = document.getElementsByClassName("infosec2");
  for (var i = 0; i < view.length; i++) {
    view[i].style.display = "none";
  }

  // Borrar la matriz resultado
  while (tablaResultado.rows.length > 0) {
    tablaResultado.deleteRow(0);
  }

  // Vaciar todos los inputs de la matriz
  var inputsMatriz = document.querySelectorAll("#matriz input[type='text']");
  inputsMatriz.forEach(function(input) {
    input.value = "";
  });

  // Vaciar todos los inputs de la matriz resultado
  var inputsResultado = document.querySelectorAll("#tablaResultado input[type='text']");
  inputsResultado.forEach(function(input) {
    input.value = "";
  });

  var encabezado = document.getElementById("encabezadoMatriz");
  if (encabezado) {
    encabezado.remove();
  }
  // Restaurar los controles de entrada
  document.getElementById("filas").style.display = "block";
  document.getElementById("columnas").style.display = "block";
  document.getElementById("crearPrimerTabla").style.display = "block";
  document.getElementById("lecturaEntrada").style.display = "block";
  document.getElementById("botonAgregarFila").style.display = "none";
  document.getElementById("botonAgregarColumna").style.display = "none";
  document.getElementById("botonEliminarFila").style.display = "none";
  document.getElementById("botonEliminarColumna").style.display = "none";
}


function borrarDatos() {
  window.location.href = "index.html";
}

document.getElementById("botonAgregarFila").addEventListener("click", function(){
   // Obtener el número de filas y columnas actual
   var filas = parseInt(document.getElementById("filas").value);
   var columnas = parseInt(document.getElementById("columnas").value);
 
   // Incrementar el número de filas
   filas++;

   // Actualizar el número de filas en el input correspondiente
   document.getElementById("filas").value = filas;
 
   // Obtener la tabla y su cuerpo
   var tablaMatriz = document.getElementById("matriz");
   var cuerpoTablaMatriz = tablaMatriz.tBodies[0];
 
   // Crear una nueva fila y sus celdas
   var filaMatriz = cuerpoTablaMatriz.insertRow();
   for (var j = 0; j < columnas; j++) {
     var celdaMatriz = filaMatriz.insertCell();
     var entradaMatriz = document.createElement("input");
     entradaMatriz.type = "text";
     entradaMatriz.name = "matriz[" + (filas - 1) + "][" + j + "]";
     celdaMatriz.appendChild(entradaMatriz);
   }
});

document.getElementById("botonAgregarColumna").addEventListener("click", function(){
  // Obtener el número de filas y columnas actual
  var filas = parseInt(document.getElementById("filas").value);
  var columnas = parseInt(document.getElementById("columnas").value);

  // Incrementar el número de columnas
  columnas++;

  // Actualizar el número de columnas en el input correspondiente
  document.getElementById("columnas").value = columnas;

  // Agregar una celda a cada fila existente
  var tablaMatriz = document.getElementById("matriz");
  var filasMatriz = tablaMatriz.rows;

  for (var i = 0; i < filasMatriz.length; i++) {
    var fila = filasMatriz[i];
    var celda = fila.insertCell();
    var entradaMatriz = document.createElement("input");
    entradaMatriz.type = "text";
    entradaMatriz.name = "matriz[" + i + "][" + (columnas - 1) + "]";
    celda.appendChild(entradaMatriz);
    //Checar 0's
  }
})

document.getElementById("botonEliminarFila").addEventListener("click", function(){
  // Obtener el número de filas y columnas actual
  var filas = parseInt(document.getElementById("filas").value);
  var columnas = parseInt(document.getElementById("columnas").value);

  // Verificar que haya al menos 2 filas para eliminar una
  if (filas < 2) {
    alert("Debe haber al menos 2 filas.");
    return;
  }

  // Decrementar el número de filas
  filas--;

  // Actualizar el número de filas en el input correspondiente
  document.getElementById("filas").value = filas;

  // Eliminar la última fila de la tabla
  var tablaMatriz = document.getElementById("matriz");
  tablaMatriz.deleteRow(filas);
})

document.getElementById("botonEliminarColumna").addEventListener("click", function(e) {
  // Obtener el número de filas y columnas actual
  var filas = parseInt(document.getElementById("filas").value);
  var columnas = parseInt(document.getElementById("columnas").value);

  // Verificar que haya al menos 2 columnas para eliminar una
  if (columnas < 2) {
    alert("Debe haber al menos 2 columnas.");
    return;
  }

  // Decrementar el número de columnas
  columnas--;

  // Actualizar el número de columnas en el input correspondiente
  document.getElementById("columnas").value = columnas;

  // Eliminar la última celda de cada fila existente
  var tablaMatriz = document.getElementById("matriz");
  var filasMatriz = tablaMatriz.rows;

  for (var i = 0; i < filasMatriz.length; i++) {
    var fila = filasMatriz[i];
    fila.deleteCell(columnas);
  }
});

// Crear la matriz que solo tiene las variables a operar, ommitiendo la columna de resultados.
  function crearMatrizSec() 
  {
    var matriz = [];
    var filas = document.getElementById("matriz").rows;
  
    for (var i = 0; i < filas.length; i++) 
    {
      var celdas = filas[i].cells;
      matriz[i] = [];
  
      for (var j = 0; j < celdas.length - 1; j++) 
      {
        var valor = celdas[j].childNodes[0].value;
  
        // Validar si se ingresó una letra
        if (isNaN(parseFloat(valor))) 
        {
          alert("MATRIZ INVÁLIDA: Se ha ingresado una letra. Por favor, verifique que se introdujeron solo números en las celdas.");
          return null;
        }
  
        // Convertir el valor a fracción si es necesario
        if (valor.indexOf("/") >= 0) 
        {
          // Si es una fracción, convertirla a decimal y luego a fracción nuevamente
          var partes = valor.split("/");
          var numerador = parseFloat(partes[0]);
          var denominador = parseFloat(partes[1]);
          if (isNaN(parseFloat(denominador))) 
          {
            alert("MATRIZ INVÁLIDA: Se ha ingresado una letra. Por favor, verifique que se introdujeron solo números en las celdas.");
            return null;
          }
          valor = [numerador, denominador];
        } 
        else 
        {
          valor = [parseFloat(valor), 1];
        }
  
        matriz[i][j] = valor;
      }
    }
    return matriz;
  }

  function inversa()
  {
    // Jalar los datos de las entradas para la matriz que calculamos con Gauss-Jordan
    var matriz = crearMatrizSec();
    var u = matriz;
    var l = crearMatrizVacia();
    var n = matriz.length;           //filas
    var m = matriz[0].length;        //columnas
    var c;
    var r;
    var k;

    // Hace ceros abajo
   
    if(n !== m)
    {
      alert("TU MATRIZ NO ES CUADRADA, POR LO TANTO, NO LLEGO A LA IDENTIDAD Y POR LO TANTO, NO ES INVERSIBLE");
      return;
    }
    else
    {
      for(k = 0; k < m; k++)
      {
        // Hace ceros abajo MEDIANTE UN PROCESO LLAMADO 'FACTORIZACIÓN LU', ESTO NOS VA A AYUDAR A OBTENER LA INVERSA
        for(r = 0; r < m; r++)
        {
          if(r === k)
          {
            l[k][r] = 1;
            console.log("aquí k vale: ", k);
            console.log("aquí r vale: ", r);
            console.log("aquí l vale: ", l);
            console.log("aquí vale l = : ", l[k][r]);
          }
          if(k < r)
          {
            let factor = ((matriz[r][k][0])/(matriz[k][k][0]));
            l[r][k] = factor;
            for(c = 0; c < m; c++)
            {
              matriz[r][c][0] = (matriz[r][c][0]) - ((factor) * (matriz[k][c][0]));
              u[r][c][0] = matriz[r][c][0];
            }
          }
        }
      }
    }
    
    //crea la tabla con la matriz Inversa
    crearTablaInversa(u);

  }

  // Crear la tabla con la matriz inversa

  function crearTablaInversa(matriz) 
  {
    // Obtener la tabla y su cuerpo
    var tablaResultado = document.getElementById("tablaInversa");
    var cuerpoTablaResultado = tablaResultado.createTBody();
    
    // Crear cada fila y sus celdas
    for (var i = 0; i < matriz.length; i++) 
    {
      var filaResultado = cuerpoTablaResultado.insertRow();
      for (var j = 0; j < matriz[i].length; j++) 
      {
        var celdaResultado = filaResultado.insertCell();
        var entradaResultado = document.createElement("input");
        entradaResultado.type = "text";
        entradaResultado.name = "resultado[" + i + "][" + j + "]";
    
        // Convertir el número a fracción
        var fraccion = decimalAFraccion(matriz[i][j][0], matriz[i][j][1]);
    
        entradaResultado.value = fraccion;
    
        celdaResultado.appendChild(entradaResultado);
      }
    }
  }
  
  //CREAMOS UNA MATRIZ VACÍA PARA PODER OBTENER LA INVERSA Y EL DETERMINANTE

  function crearMatrizVacia() 
  {
    var matriz = [];                                     //PRIMER ARREGLO UNIDIMENSIONAL
    var filas = document.getElementById("matriz").rows;   
          
    for (var i = 0; i < filas.length; i++) 
    {
      var celdas = filas[i].cells;
      matriz[i] = [];                                   //SE VUELVE ARREGLO BIDIMENSIONAL
          
      for (var j = 0; j < celdas.length - 1; j++) 
      {
        matriz[i][j] = 0;                               //LA MATRIZ ESTÁ TOTALMENTE VACIA
      }
    }

    return matriz;
  }

  //CALCULAR EL DETERMINANTE DE LA MATRIZ A TRAVÉS DE RECURSIVIDAD

  function determinante(matriz)
  {
    var determinante = 0;     //LO USAREMOS COMO SUMADOR PARA EL PASO BASE
    var aux = matriz;         //CREA UNA MATRIZ AUXILIAR
    var sum = 0;              //SERÁN SUMADORES 
    var sum2 = 0;             //QUE UTILIZAREMOS PARA EL PASO INDUCTIVO/RECURSIVO
    var filas = matriz.length;
    var columnas = matriz[0].length;

    if(filas !== columnas)    //UN DETERMINANTE SOLO SE PUEDE OBTENER EN MATRICES CUADRADAS.
    {
      console.log("no hay determinante jovenazo");
      return;
    }
    else                      //PODEMOS EMPEZAR A CALCULAR EL DETERMINANTE
    {
      if(filas === 2 && columnas === 2)    //ESTE ES EL PASO BASE, SABEMOS COMO CALCULAR UN
      {                                    //DETERMINANTE DE 2X2
        determinante = ((matriz[0][0] * matriz[1][1]) - (matriz[0][1] * matriz[1][0]));
        return determinante;
      }
      else   //filas !== 2 && columnas !== 2, TENEMOS UNA MATRIZ DE 3X3 O DE 5X5 O ASÍ
      {
        g = crearMatrizVacia();            //VAMOS A DAR UN PASO EN DIAGONAL HACIA LA DERECHA 
        for(var i = 0; i < filas ; i++)    //NOS QUITAMOS UNA FILA Y UNA COLUMNA DE LA MATRIZ 
        {
          for(let j = 0; j < columnas ; j++)
          {
            g[i][j] = aux[j+1][i+1][0]    //SI TUVIERAMOS UNA MATRIZ DE 4X4, SE VOLVERÍA UNA MATRIZ
          }                               //DE 3X3    
        }
        for(let s = 0; s < filas ; s++)   //AQUÍ EMPIEZA EL PASO INDUCTIVO, VAMOS A IR REDUCIENDO LA 
        {                                 //MATRIZ, HASTA OBTENER UNA DE 2X2 DEL PASO BASE
          if(s%2 === 0)          //REVISA
          {                      //QUE EL COOFACTOR SEA PAR
            sum = matriz[0][s][0] * determinante(g);
            determinante = determinante + sum
          }
          else                   //EL COOFACTOR ES IMPAR Y TENEMOS UNA RESTA
          {
            sum = matriz[0][s][0] * determinante(g);
            determinante = determinante - sum
          }
        }
        return determinante;     //ESTA DEBERÍA DE SER LA DETERMINANTE
      }
    }
  }




