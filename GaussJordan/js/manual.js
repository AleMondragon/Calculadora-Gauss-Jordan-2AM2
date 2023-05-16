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

function crearMatriz() {
  var matriz = [];
  var filas = document.getElementById("matriz").rows;

  for (var i = 0; i < filas.length; i++) {
    var celdas = filas[i].cells;
    matriz[i] = [];

    for (var j = 0; j < celdas.length; j++) {
      var valor = celdas[j].childNodes[0].value;
      if (valor.indexOf('/') >= 0) {
        // Si es una fracción, convertirla a decimal y luego a fracción nuevamente
        var partes = valor.split('/');
        var numerador = parseFloat(partes[0]);
        var denominador = parseFloat(partes[1]);
        valor = numerador / denominador;
      }
      matriz[i][j] = calcularFraccion(parseFloat(valor));
    }
  }

  return matriz;
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
      if (valor.indexOf('/') >= 0) {
        // Si es una fracción, convertirla a decimal y luego a fracción nuevamente
        var partes = valor.split('/');
        var numerador = parseFloat(partes[0]);
        var denominador = parseFloat(partes[1]);
        valor = numerador / denominador;
      }
      matriz[i][j] = calcularFraccion(parseFloat(valor));
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
      var fraccion = decimalAFraccion(matriz[i][j]);
      entradaResultado.value = fraccion;

      celdaResultado.appendChild(entradaResultado);
    }
  }
}

// Función para convertir un decimal a fracción
// Función para convertir un decimal a fracción

function decimalAFraccion(decimal) {
  var partes = decimal.toString().split(".");
  if (partes.length == 1) {
    return decimal;
  } else {
    var entero = partes[0];
    var decimal = partes[1];
    var largoDecimal = decimal.length;
    var denominador = Math.pow(10, largoDecimal);
    var numerador = entero * denominador + parseInt(decimal);
    
    // Calcular el MCD antes de dividir numerador y denominador
    var mcd = gcd(numerador, denominador);
    numerador /= mcd;
    denominador /= mcd;
    
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

// Calcular la matriz Gauss-Jordan
function calcular() {
  // Validar la matriz
  if (!validarMatriz()) {
    return;
  }

  // Crear la matriz a partir de los inputs
  var matriz = crearMatriz();

  var n = matriz.length;
  var m = matriz[0].length;

  // Resolver la matriz Gauss-Jordan
  for (var i = 0; i < n; i++) {
    // Verificar si el pivote es cero y buscar una fila debajo con un valor no nulo en la misma columna
    if (matriz[i][i] === 0) {
      var filaNoNula = -1;
      for (var j = i + 1; j < n; j++) {
        if (matriz[j][i] !== 0) {
          filaNoNula = j;
          break;
        }
      }

      // Si no se encontró una fila debajo con valor no nulo, la matriz no se puede resolver
      if (filaNoNula === -1) {
        alert('La matriz no se puede resolver');
        return;
      }

      // Intercambiar la fila actual con la fila encontrada
      var temp = matriz[i];
      matriz[i] = matriz[filaNoNula];
      matriz[filaNoNula] = temp;
    }

    // Convertir el pivote a 1
    var pivote = matriz[i][i];
    for (var j = i; j < m; j++) {
      matriz[i][j] = matriz[i][j] / pivote;
    }

    // Convertir los demás elementos de la columna a 0
    for (var k = 0; k < n; k++) {
      if (k !== i) {
        var factor = matriz[k][i];
        for (var l = i; l < m; l++) {
          matriz[k][l] = matriz[k][l] - factor * matriz[i][l];
        }
      }
    }
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

  // Borrar la matriz resultado
  while (tablaResultado.rows.length > 0) {
    tablaResultado.deleteRow(0);
  }
}

function borrarDatos() {
  // Borrar la matriz de entrada
  var tablaMatriz = document.getElementById("matriz");
  var filas = tablaMatriz.rows;
  for (var i = 0; i < filas.length; i++) {
    var celdas = filas[i].cells;
    for (var j = 0; j < celdas.length; j++) {
      celdas[j].childNodes[0].value = "";
    }
  }

  // Borrar la tabla de resultados
  var tablaResultado = document.getElementById("tablaResultado");
  tablaResultado.innerHTML = "";
}