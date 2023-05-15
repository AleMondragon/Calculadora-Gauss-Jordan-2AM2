
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
  
  function borrar() {
    var textarea = document.getElementById('dragdroptxt');
    textarea.value = '';
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
    var textarea = document.getElementById('dragdroptxt');
    var matriz = textarea.value.split('\n').map(function (fila) {
      return fila.split(' ').map(Number);
    });
  
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
  
    // Convertir la matriz resultante a una cadena de texto
    var resultado = '';
    for (var i = 0; i < n; i++) {
      resultado += matriz[i].join(' ') + '\n';
    }
  
    var resultadoTextarea = document.getElementById('resultado');
    resultadoTextarea.value = resultado;
  }
  
  // Aquí puedes realizar el cálculo que necesites con la matriz
  
  var resultado = 'Aquí va el resultado de la operación'; // Reemplaza esto con el resultado real
  
  var resultadoTextarea = document.getElementById('resultado');
  resultadoTextarea.value = resultado;
  