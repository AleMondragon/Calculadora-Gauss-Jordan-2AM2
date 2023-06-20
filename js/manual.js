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
            var operacion = numerador/denominador;
            valor = [operacion, 1];
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

    //COMENZAMOS A CÁLCULAR LA INVERSA

    function inversa()
    {
      
      // Validar la matriz
      if (!validarMatriz()) 
      {
        return;
      }
      var tablaResultado = document.getElementById("tablaInversa");
      while (tablaResultado.rows.length > 0)  
      {
        tablaResultado.deleteRow(0);
      }
      var inputsResultado = document.querySelectorAll("#tablaInversa input[type='text']");
      inputsResultado.forEach(function(input) {
      input.value = "";
      });
      let view = document.getElementsByClassName("infosec2");
      for (var i = 0; i < view.length; i++)  
      {
        view[i].style.display = "flex";
      }

      
      // Jalar los datos de las entradas para la matriz que calculamos con Gauss-Jordan
      var matriz = crearMatrizSec();
      var u = matriz;
      var l = crearMatrizVacia();
      var n = matriz.length;           //filas
      var m = matriz[0].length;        //columnas
      var c;
      var r;
      var k;
  
      //VARIABLES PARA GAUSS-JORDAN
      var filasGJ = l.length;
      var columnasGJ = l[0].length;
      var j;
      var i;
      var z;
  
      // Hace ceros abajo
     
      if(n !== m)
      {
        alert("TU MATRIZ NO ES CUADRADA, POR LO TANTO, NO LLEGO A LA IDENTIDAD Y POR LO TANTO, NO ES INVERSIBLE");
        return;
      }
      else
      {
        alert("estoy calculando la inversa, dame chance, no te me desesperes mi vida");
        //METE LAS ENTRADAS DEL USUARIO EN UNA MATRIZ VACÍA DE UN LADO (AGREGA UNAS COLUMNAS)
        for(k = 0; k < l.length; k++)     //LEE FILAS
        {
          for(c = 0 ; c < (l[0].length)/2 ; c++) //LEE COLUMNAS
          {
            l[k][c] = matriz[k][c][0];
          }
        }

        //AGREGA COLUMNAS PARA QUE ESTÉ POR AHÍ LA IDENTIDAD
        for(let s = 0; s < l.length ; s++)            //LEE FILAS
        {
          for(r = (l[0].length)/2 ; r < l[0].length ; r++)        //LEE COLUMNAS
          {
            if(r === (s+(l[0].length)/2))
            {
              l[s][r] = 1;
            }
            else
            {
              l[s][r] = 0;
            }
          }
        }
      }
      
      // Resolver la matriz mediante Gauss-Jordan para nuestra matriz "l[a][b]"
      for(i = 0 ; i < l.length ; i++)
      {
        if(l[i][i] === 0)
        {
          alert("división por cero");
        }

        for(j = 0; j < (l.length); j++)
        {
          //CREO MI PIVOTE
          if(i !== j)
          {
            var pivote = (l[j][i])/(l[i][i]);
          
            for(z = 0; z < ((l[0].length)) ; z++)
            {
              l[j][z] = l[j][z] - (pivote * l[i][z]);
            }
          }
        }
      }
  
      // HAGO MI DIAGONAL PRINCIPAL 1'S
      for(i = 0; i < l.length; i++)
      {
        divisor = l[i][i];
        for(j = 0; j < l[0].length ; j++)
        {
          l[i][j] = (l[i][j])/divisor;
        }
      }
      
    //METE LA INVERSA EN OTRA MATRIZ PARA IMPRIMIRLA EN PANTALLA

    let fil = (l[0].length)/2;

    for(let s = 0; s < l.length ; s++)            //LEE FILAS
    {
      for(let r = 0 ; r < (l[0].length)/2 ; r++)        //LEE COLUMNAS
      {
        if(l[s][fil] === 0)
        {
          u[s][r][0] = l[s][fil];
        }

        else if(l[s][fil] < 0)
        {
          l[s][fil] = l[s][fil] * (-1);
          var v = decToFrac( l[s][fil] );
          var fraccion = decimalAFraccion(v[0], v[1]);
          l[s][fil] = fraccion;
          u[s][r][0] = l[s][fil] * -1;
          if(isNaN(u[s][r][0]))
          {
            u[s][r][0] = '-' + l[s][fil];
          }
        }

        else
        {
          var v = decToFrac( l[s][fil] );
          var fraccion = decimalAFraccion(v[0], v[1]);
          l[s][fil] = fraccion;
          u[s][r][0] = l[s][fil];
        }
        
        fil++;
        if(fil === l[0].length)
          {
            fil = (l[0].length)/2;
          }
      }
    }
      alert("ya la calculé papito hermoso, revisa la parte inferior");
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
        //for (var j = 0; j < (matriz[i].length); j++) 
        for (var j = 0; j < (matriz[0].length); j++)
        {
          var celdaResultado = filaResultado.insertCell();
          var entradaResultado = document.createElement("input");
          entradaResultado.type = "text";
          entradaResultado.name = "resultado[" + i + "][" + j + "]";
      
          // Convertir el número a fracción
          //var fraccion = decimalAFraccion(matriz[i][j][0], matriz[i][j][1]);
      
          entradaResultado.value = matriz[i][j][0];
      
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
          
      for (var j = 0; j < (celdas.length - 1)*2 ; j++) 
      {
        matriz[i][j] = 0;                               //LA MATRIZ ESTÁ TOTALMENTE VACIA
      }
    }

    return matriz;
  }

// Función para calcular el determinante de una matriz

/*function calcularDeterminante()
  { 
    // Obtener la matriz
    var matriz = crearMatrizSec();
  
    // Validar la matriz
    if (!validarMatriz()) 
    {
      return;
    }
  
    var n = matriz.length;
    var m = matriz[0].length;
    var det = 1;

    if (n !== m)    //UN DETERMINANTE SOLO SE PUEDE OBTENER EN MATRICES CUADRADAS.
    {
      alert("La matriz debe ser cuadrada para calcular el determinante.");
      return;
    }

    else                      //PODEMOS EMPEZAR A CALCULAR EL DETERMINANTE
    {
      if(n === 2 && m === 2)    //ESTE ES EL PASO BASE, SABEMOS COMO CALCULAR UN
      {                                    //DETERMINANTE DE 2X2
        det = (((matriz[0][0][0] * matriz[1][1][0]) - (matriz[0][1][0] * matriz[1][0][0])));
        if(det === 0)
        {
          return alert("El determinante de la matriz es: " + det);
        }

        else if(det < 0)
        {
          det = det * (-1);
          var v = decToFrac( det );
          var fraccion = decimalAFraccion(v[0], v[1]);
          det = fraccion * -1;
          if(isNaN(Number(det)))
          {
            det = '-' + fraccion;
          }
          return alert("El determinante de la matriz es: " + det);
        }

        else
        {
          var v = decToFrac( det );
          var fraccion = decimalAFraccion(v[0], v[1]);
          det = fraccion;
          return alert("El determinante de la matriz es: " + det);
        }
      }

      else   //filas !== 2 && columnas !== 2, TENEMOS UNA MATRIZ DE 3X3 O DE 5X5 O ASÍ
      {
            // Realizar la eliminación de Gauss-Jordan para convertir la matriz a una forma escalonada
        for (var j = 0; j < n - 1; j++) 
        {
          for (var i = j + 1; i < n; i++) 
          {
            var ratio = matriz[i][j][0] / matriz[j][j][0];
            for (var k = j; k < n; k++) 
            {
              matriz[i][k][0] -= ratio * matriz[j][k][0];
              matriz[i][k][1] = matriz[j][k][1]; // Mantener el denominador igual
            }
          }
        }
  
        // Calcular el determinante multiplicando los elementos diagonales
        for (var i = 0; i < n; i++) 
        {
          det *= matriz[i][i][0] / matriz[i][i][1];
        }

        //Decide si el determinante debería de ser una Fracción o un número entero
        
        if(det === 0)
        {
          return alert("El determinante de la matriz es: " + det);
        }

        else if(det < 0)
        {
          det = det * (-1);
          var v = decToFrac( det );
          var fraccion = decimalAFraccion(v[0], v[1]);
          det = fraccion * -1;
          if(isNaN(Number(det)))
          {
            det = '-' + fraccion;
          }
          return alert("El determinante de la matriz es: " + det);
        }

        else
        {
          var v = decToFrac( det );
          var fraccion = decimalAFraccion(v[0], v[1]);
          det = fraccion;
          return alert("El determinante de la matriz es: " + det);
        }
      }
        // Mostrar el resultado
    }
  }*/

function calcularDeterminante() 
{
  // Obtener la matriz
  var matriz = crearMatrizSec();
  

  // Validar la matriz
  if (!validarMatriz()) 
  {
    return;
  }

  var n = matriz.length;
  var m = matriz[0].length;
  
  // Verificar si la matriz es cuadrada
  if (n !== m) 
  {
    alert("La matriz debe ser cuadrada para calcular el determinante.");
    return;
  }

  var det = determinanteRecursivo(matriz);

  // Mostrar el resultado
  if(det === 0)
  {
    return alert("El determinante de la matriz es: " + det);
  }

    else if(det < 0)
    {
      det = det * (-1);
      var v = decToFrac( det );
      var fraccion = decimalAFraccion(v[0], v[1]);
      det = fraccion * -1;
      if(isNaN(Number(det)))
      {
        det = '-' + fraccion;
      }
      return alert("El determinante de la matriz es: " + det);
    }

    else
    {
      var v = decToFrac( det );
      var fraccion = decimalAFraccion(v[0], v[1]);
      det = fraccion;
      return alert("El determinante de la matriz es: " + det);
    }
  
}

// Función recursiva para calcular el determinante de una matriz
function determinanteRecursivo(matriz) 
{
  var n = matriz.length;
  // Caso base: matriz de 1x1
  if (n === 1) 
  {
    return matriz[0][0][0] / matriz[0][0][1]; // Devolver la fracción como resultado
  }

  var det = 0;

  // Obtener el primer renglón de la matriz
  var primerRenglon = matriz[0];

  for (var j = 0; j < n; j++) 
  {
    // Calcular el cofactor de la submatriz eliminando el primer renglón y la columna j
    var submatriz = obtenerSubmatriz(matriz, 0, j);
    var cofactor = primerRenglon[j][0] / primerRenglon[j][1] * determinanteRecursivo(submatriz);

    // Sumar o restar el cofactor al determinante dependiendo del índice de la columna
    det += (j % 2 === 0) ? cofactor : -cofactor;
  }

  return det;
}

// Función para obtener una submatriz eliminando un renglón y una columna específicos
function obtenerSubmatriz(matriz, iEliminar, jEliminar) {
  var submatriz = [];
  var n = matriz.length;

  for (var i = 1; i < n; i++) {
    var fila = [];
    for (var j = 0; j < n; j++) {
      if (j !== jEliminar) {
        fila.push(matriz[i][j]);
      }
    }
    if (i !== iEliminar) {
      submatriz.push(fila);
    }
  }

  return submatriz;
}




//ESTO DE ACÁ LO ENCONTRÉ EN INTERNET, Y LO USÉ PARA OBTENER LOS NUMERADORES Y DENOMINADORES Y PODER MOSTRAR FRACCIONES.

  decToFrac = dec =>
  [...Array(1000).keys()].flatMap(
    i => [...Array(1000).keys()].map(
      j => [
        i + 1, j + 1, (i + 1) / (j + 1),
        Math.abs(((i + 1) / (j + 1)) - dec)
      ]
    )
  ).sort((a, b) => a[3] - b[3])[0].slice(0, 2)



