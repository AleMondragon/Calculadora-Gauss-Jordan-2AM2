
function dropHandler(evento) {
  evento.preventDefault();
  var archivo = evento.dataTransfer.files[0];
  if (archivo.type.match('text.*')) {
    var lector = new FileReader();
    lector.onload = function (evento) {
      var contenido = evento.target.result;
      var textarea = document.getElementById('dragdroptxt');
      textarea.value = contenido;
    };
    lector.readAsText(archivo);
  } else {
    alert('Solo se permiten archivos de texto');
  }
}
////////////////////////////////////////
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
});
////////////////////////////////////////////////////



// Función para convertir los valores en números
function parseNumber(value) {
  try {
    // Si es un número entero, decimal o negativo, se devuelve el número
    if (/^-?\d+(\.\d+)?$/.test(value)) {
      return parseFloat(value);
    }
// Si es una fracción, se convierte a decimal
  if (/^-?\d+\/\d+$/.test(value)) {
    var fraccion = value.split('/');
    var numerador = parseInt(fraccion[0]);
    var denominador = parseInt(fraccion[1]);
  return numerador / denominador;
}

  } catch (error) {
    console.error('Error al parsear el número:', value, error);
  }

  // Si no se puede parsear el valor, se devuelve 0
  return 0;
}



function limpiar() {
  var textarea = document.getElementById('dragdroptxt');
  textarea.value = '';

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
      fila.push(parseFloat(entradaMatriz.value));
    }
    matriz.push(fila);
  }

  // Aquí puedes realizar el cálculo que necesites con la matriz

  // Ejemplo de operación: obtener la matriz reducida por Gauss-Jordan
  var n = matriz.length;
  var m = matriz[0].length;
  for (var i = 0; i < n; i++) {
    // Hacer ceros en la columna i por debajo de la fila i
    for (var j = i+1; j < n; j++) {
      var factor = matriz[j][i] / matriz[i][i];
      for (var k = i; k < m; k++) {
        matriz[j][k] -= factor * matriz[i][k];
      }
    }
    // Hacer ceros en la columna i por encima de la fila i
    for (var j = i-1; j >= 0; j--) {
      var factor = matriz[j][i] / matriz[i][i];
      for (var k = i; k < m; k++) {
        matriz[j][k] -= factor * matriz[i][k];
      }
    }
    // Hacer que el elemento (i,i) sea igual a 1
    var factor = matriz[i][i];
    for (var j = i; j < m; j++) {
      matriz[i][j] /= factor;
    }
  }

  // Mostrar la tabla de resultados
  mostrarResultados(matriz);
}

// Función para convertir un número decimal a fracción utilizando la biblioteca "fraction.js"
function convertirAFraccion(numero) {
  var fraccion = new Fraction(numero);
  return fraccion.toFraction();
}

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
      var numero = matriz[i][j];
      if (Number.isInteger(numero)) {
        // Si el número es entero, se muestra sin cambios
        entradaResultado.value = numero;
      } else {
        // Si el número tiene decimales, se convierte a fracción utilizando la biblioteca "fraction.js"
        var fraccion = convertirAFraccion(numero);
        entradaResultado.value = fraccion;
      }
      celdaResultado.appendChild(entradaResultado);
    }
  }

  tablaResultados.appendChild(cuerpoTablaResultados);
  resultadosSection.appendChild(tablaResultados);
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
  // Reemplaza "inicio.html" con la URL de tu página de inicio
  window.location.href = "index.html";
}
