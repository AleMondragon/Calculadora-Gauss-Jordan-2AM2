function dropHandler(evento) {
  evento.preventDefault();
  var archivo = evento.dataTransfer.files[0];
  if (archivo.type.match('text.*')) {
    var lector = new FileReader();
    lector.onload = function (evento) {
      var contenido = evento.target.result;
      var textarea = document.getElementById('dragdroptxt');
      
      // Verificar si el contenido del archivo contiene elementos no admitidos, incluyendo números negativos
      var elementosNoAdmitidos = /[^0-9\/.\s-]/g.test(contenido);
      
      if (elementosNoAdmitidos) {
        // Mostrar diálogo de confirmación para reemplazar elementos no admitidos por ceros
        var confirmacion = confirm('El archivo contiene elementos no admitidos. ¿Desea reemplazarlos por ceros?');
        
        if (confirmacion) {
          // Reemplazar elementos no admitidos por ceros utilizando una función de reemplazo personalizada
          contenido = contenido.replace(/[^0-9\/.\s-]/g, function(match) {
            if (match === '-') {
              return ''; // Conservar el signo negativo
            } else {
              return '0'; // Reemplazar por cero
            }
          });
        } else {
          return; // Cancelar la función si no se acepta reemplazar los elementos no admitidos
        }
      }
      
      textarea.value = contenido;
      // Mostrar los botones ocultos si se ha recibido un archivo de texto válido
    };
    lector.readAsText(archivo);
  } else {
    alert('Solo se permiten archivos de texto');
  }
}


document.getElementById("btnValidarTabla").addEventListener("click", function() {
  
  var contenido = document.getElementById("dragdroptxt").value;
  var matriz = contenido.split('\n').map(function(fila) {
    return fila.split(' ').map(parseNumber);
  });

  var filas = matriz.length;
  var columnas = matriz[0].length;

  var dragdropSection = document.querySelector(".dragdrop");
  dragdropSection.style.display = "none"; // Ocultar sección de arrastrar y soltar

  var tablaMatriz = document.createElement("table");
  tablaMatriz.id = "tablaMatriz";
  var cuerpoTablaMatriz = document.createElement("tbody");
  cuerpoTablaMatriz.id = "cuerpoTablaMatriz";

  for (var i = 0; i < filas; i++) {
    var filaMatriz = document.createElement("tr");
    for (var j = 0; j < columnas; j++) {
      var celdaMatriz = document.createElement("td");
      var entradaMatriz = document.createElement("input");
      entradaMatriz.type = "text";
      entradaMatriz.name = "matriz[" + i + "][" + j + "]";
      entradaMatriz.value = matriz[i][j] || '0'; // Asignar valor de la matriz o vacío si no existe
      celdaMatriz.appendChild(entradaMatriz);
      filaMatriz.appendChild(celdaMatriz);
    }
    cuerpoTablaMatriz.appendChild(filaMatriz);
  }

  tablaMatriz.appendChild(cuerpoTablaMatriz);

  var btnValidarTabla = document.getElementById("btnValidarTabla");
  btnValidarTabla.parentNode.insertBefore(tablaMatriz, btnValidarTabla.nextSibling); // Insertar tabla después del botón
  var botones = document.getElementsByClassName('drop1');
  for (var i = 0; i < botones.length; i++) {
    botones[i].style.display = 'block';
  }
  document.getElementById('subirTxt').style.display = 'none';
});

// Función para mostrar enteros o fracciones en su caso
function parseNumber(value) {
  try {
    // Si es un número entero, decimal o negativo, se devuelve el número con validacion
    if (/^-?\d+(\.\d+)?$/.test(value)) {
      return parseFloat(value);
    }

    // Si es una fracción se devuelve la fraccion pero con la validacion
    if (/^-?\d+\/\d+$/.test(value)) {
      var partes = value.split('/');
      var numerador = parseFloat(partes[0]);
      var denominador = parseFloat(partes[1]);
      return [ numerador + "/" + denominador ];
    }
  } catch (error) {
    console.error('Error al parsear el número:', value, error);
  }

  // Si no se puede parsear el valor, se devuelve 0
  return 0;
}


function limpiar() {
  var textarea = document.getElementById('dragdroptxt');
  var botones = document.getElementsByClassName('drop1');
      for (var i = 0; i < botones.length; i++) {
        botones[i].style.display = 'none';
      }
  document.getElementById('subirTxt').style.display="block"
  textarea.value = '';

  event.target.result="";

  var tablaMatriz = document.getElementById('tablaMatriz');
  tablaMatriz.parentNode.removeChild(tablaMatriz);

  var resultadosSection = document.getElementById('mresultante');
  resultadosSection.innerHTML = '';

  var dragdropSection = document.querySelector('.dragdrop');
  dragdropSection.style.display = 'flex';

  var resultadoTextarea = document.getElementById('resultados');
  resultadoTextarea.style.display = 'block';
}

function seleccionarArchivo() {
  // Hacer clic en el input de archivo
  document.getElementById("inputArchivo").click();
}

// Obtener el archivo seleccionado
document.getElementById("inputArchivo").addEventListener("change", function() {
  var archivo = this.files[0];

  // Leer el contenido del archivo
  var lector = new FileReader();
  lector.onload = function(evento) {
    // Asignar el contenido del archivo al textarea
    document.getElementById("dragdroptxt").value = evento.target.result;
  };
  lector.readAsText(archivo);
});

// Función para calcular el máximo común divisor de dos números
function gcd(a, b) {
  if(b === 0) {
    return a;
  }
  return gcd(b, a % b);
}

function calcular() {
  var tablaMatriz = document.getElementById('tablaMatriz');
  var filas = tablaMatriz.rows.length;
  var columnas = tablaMatriz.rows[0].cells.length;
  var matriz = [];

  for (var i = 0; i < filas; i++) {
    var filaMatriz = tablaMatriz.rows[i];
    var fila = [];
    for (var j = 0; j < columnas; j++) {
      var celdaMatriz = filaMatriz.cells[j];
      var entradaMatriz = celdaMatriz.querySelector('input');
      var contenido = entradaMatriz.value;
      // Aplicar el filtro de caracteres no admitidos
      // ---- Aqui se deberia aplicar un filtro pero que acepte fracciones

      /*var elementosNoAdmitidos = /[^0-9.\/-]/g.test(contenido);
      if (elementosNoAdmitidos) {
        alert('Se ha ingresado un valor no válido. Por favor, ingrese solo números en todas las celdas.');
        return; // Detener el cálculo
      }

      // Convertir el valor a número
      var valor = parseFloat(contenido);
      */
      var valor;
      if (contenido.indexOf('/') >= 0) {
        // Si es una fracción, convertirla a decimal y luego a fracción nuevamente
        var partes = contenido.split('/');
        var numerador = parseFloat(partes[0]);
        var denominador = parseFloat(partes[1]);
        valor = [numerador, denominador];
      } else {
        valor = [parseFloat(contenido), 1]
      }
      fila.push(valor);
    }
    matriz.push(fila);
  }

  // Aqui se hace el gauss jordan
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

  // Mostrar la tabla de resultados
  mostrarResultados(matriz);
}

// Función para mostrar los resultados en una tabla
function mostrarResultados(matriz) {
  var resultadoTextarea = document.getElementById('resultados');
  resultadoTextarea.style.display = 'none';
  var resultadosSection = document.getElementById('mresultante');
  resultadosSection.innerHTML = ''; // Limpiar contenido anterior

  var tablaResultados = document.createElement('table');
  var cuerpoTablaResultados = document.createElement('tbody');

  for (var i = 0; i < matriz.length; i++) {
    var filaResultado = cuerpoTablaResultados.insertRow();
    for (var j = 0; j < matriz[i].length; j++) {
      var celdaResultado = filaResultado.insertCell();
      var entradaResultado = document.createElement("input");
      entradaResultado.type = "text";
      entradaResultado.name = "resultado[" + i + "][" + j + "]";

      // Se regresa fraccion si es fraccion y si no solo regresa el entero
      var fraccion = decimalAFraccion(matriz[i][j][0], matriz[i][j][1]);
      entradaResultado.value = fraccion;
      
      celdaResultado.appendChild(entradaResultado);
    }
  }

  tablaResultados.appendChild(cuerpoTablaResultados);
  resultadosSection.appendChild(tablaResultados);
}

// Funcion para verificar si es fraccion o entero para mostrar
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

// Función para verificar si un número es decimal
function esDecimal(numero) {
  return numero % 1 !== 0;
}

// Función para convertir un número decimal a fracción reducida
function convertirAFraccion(numero) {
  var signo = (numero < 0) ? -1 : 1;
  numero = Math.abs(numero);
  
  var epsilon = 0.000001; // Precisión para la aproximación
  var maxIteraciones = 10000; // Máximo número de iteraciones
  
  var numerador = 1;
  var denominador = 1;
  var error = Math.abs(numero - numerador / denominador);
  
  var iteraciones = 0;
  while (error > epsilon && iteraciones < maxIteraciones) {
    if (numerador / denominador < numero) {
      numerador++;
    } else {
      denominador++;
    }
    error = Math.abs(numero - numerador / denominador);
    iteraciones++;
  }
  
  return (signo * numerador) + '/' + denominador;
}



// Evento para agregar una columna a la tabla
document.getElementById("btnAgregarColumna").addEventListener("click", function() {
  var tablaMatriz = document.getElementById("tablaMatriz");
  var filas = tablaMatriz.rows.length;

  for (var i = 0; i < filas; i++) {
    var fila = tablaMatriz.rows[i];
    var celda = document.createElement("td");
    var entradaMatriz = document.createElement("input");
    entradaMatriz.type = "text";
    entradaMatriz.name = "matriz[" + i + "][" + (fila.cells.length - 1) + "]";
    entradaMatriz.value = '0';
    celda.appendChild(entradaMatriz);
    fila.appendChild(celda);
  }
});

// Evento para agregar una fila a la tabla
document.getElementById("btnAgregarFila").addEventListener("click", function() {
  var tablaMatriz = document.getElementById("tablaMatriz");
  var filas = tablaMatriz.rows.length;
  var columnas = tablaMatriz.rows[0].cells.length;

  var fila = document.createElement("tr");
  for (var i = 0; i < columnas; i++) {
    var celda = document.createElement("td");
    var entradaMatriz = document.createElement("input");
    entradaMatriz.type = "text";
    entradaMatriz.name = "matriz[" + filas + "][" + i + "]";
    entradaMatriz.value = '0';
    celda.appendChild(entradaMatriz);
    fila.appendChild(celda);
  }

  tablaMatriz.appendChild(fila);
});

// Evento para eliminar una columna de la tabla
document.getElementById("btnEliminarColumna").addEventListener("click", function() {
  var tablaMatriz = document.getElementById("tablaMatriz");
  var filas = tablaMatriz.rows.length;
  var columnas = tablaMatriz.rows[0].cells.length;

  // Verificar si hay al menos dos columnas en la tabla
  if (columnas <= 2) {
    alert("No se puede eliminar más columnas");
    return;
  }

  for (var i = 0; i < filas; i++) {
    tablaMatriz.rows[i].deleteCell(-1); // Eliminar la última celda de cada fila
  }
});

// Evento para eliminar una fila de la tabla
document.getElementById("btnEliminarFila").addEventListener("click", function() {
  var tablaMatriz = document.getElementById("tablaMatriz");
  var filas = tablaMatriz.rows.length;

  // Verificar si hay al menos dos filas en la tabla
  if (filas <= 2) {
    alert("No se puede eliminar más filas");
    return;
  }

  tablaMatriz.deleteRow(-1); // Eliminar la última fila de la tabla
});

function finalizar() {
  window.location.href = "index.html";
}