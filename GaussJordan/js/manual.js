
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
    for (var j = 0; j < columnas+1; j++) {
      var celdaMatriz = filaMatriz.insertCell();
      var entradaMatriz = document.createElement("input");
      entradaMatriz.type = "text";
      entradaMatriz.name = "matriz[" + i + "][" + j + "]";
      celdaMatriz.appendChild(entradaMatriz);
    }
  }

  
}


// Crear la matriz a partir de los inputs
function crearMatriz() {
  var matriz = [];
  var filas = document.getElementById("matriz").rows;

  for (var i = 0; i < filas.length; i++) {
    var celdas = filas[i].cells;
    matriz[i] = [];

    for (var j = 0; j < celdas.length; j++) {
      matriz[i][j] = parseFloat(celdas[j].childNodes[0].value);
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
      entradaResultado.type = "number";
      entradaResultado.name = "resultado[" + i + "][" + j + "]";
      entradaResultado.value = matriz[i][j].toFixed(2);
      celdaResultado.appendChild(entradaResultado);
    }
  }
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

// Calcular la matriz Gauss-Jordan
function calcular() {
  // Validar la matriz
  if (!validarMatriz()) {
    return;
  }

  // Crear la matriz a partir de los inputs
  var matriz = crearMatriz();

  // Resolver la matriz Gauss-Jordan
  for (var i =0; i < matriz.length; i++) {
    // Paso 1: Convertir el pivote a 1
    var pivote = matriz[i][i];

    for (var j = 0; j < matriz[i].length; j++) {
      matriz[i][j] = matriz[i][j] / pivote;
    }

    // Paso 2: Convertir los demás elementos de la columna a 0
    for (var k = 0; k < matriz.length; k++) {
      if (k !== i) {
        var factor = matriz[k][i];

        for (var l = 0; l < matriz[k].length; l++) {
          matriz[k][l] = matriz[k][l] - factor * matriz[i][l];
        }
      }
    }
  }

  // Crear la tabla con la matriz resultado
  crearTablaResultado(matriz);
}


// Borrar todos los inputs de la matriz y la matriz resultado
// Borrar todos los inputs de la matriz y la matriz resultado
function borrarNumeros() {
  var tablaMatriz = document.getElementById("matriz");
  var tablaResultado = document.getElementById("tablaResultado");

  // Restablecer los valores de filas y columnas
  document.getElementById("filas").value = "";
  document.getElementById("columnas").value = "";
  
  // Borrar la matriz
  while (tablaMatriz.rows.length > 0) {
    tablaMatriz.deleteRow(0);
  }

  // Borrar la matriz resultado
  while (tablaResultado.rows.length > 0) {
    tablaResultado.deleteRow(0);
  }
}

// Finalizar el proceso y borrar todos los inputs y resultados
function finalizar() {
  // Reemplaza "inicio.html" con la URL de tu página de inicio
  window.location.href = "index.html";
}



