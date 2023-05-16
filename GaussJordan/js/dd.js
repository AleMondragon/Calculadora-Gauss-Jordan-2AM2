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
  document.getElementById("inputArchivo").addEventListener("change", function () {
    var archivo = this.files[0];
  
    // Leer el contenido del archivo
    var lector = new FileReader();
    lector.onload = function (evento) {
      // Asignar el contenido del archivo al textarea
      document.getElementById("dragdroptxt").value = evento.target.result;
    };
    lector.readAsText(archivo);
  });
  
  function parsearFraccion(fraccion) {
    if (fraccion.includes('/')) {
      var partes = fraccion.split('/');
      var numerador = parseInt(partes[0]);
      var denominador = parseInt(partes[1]);
      return numerador / denominador;
    } else {
      return parseInt(fraccion);
    }
  }
  
  function formatearFraccion(numero) {
    if (Number.isInteger(numero)) {
      return numero.toString();
    } else {
      var MAX_DENOMINATOR = 1000000;
      var tolerance = 1e-10;
  
      var numerator = Math.round(numero * MAX_DENOMINATOR);
      var denominator = MAX_DENOMINATOR;
    
      // Reducción de fracciones
      var gcd = greatestCommonDivisor(numerator, denominator);
      numerator /= gcd;
      denominator /= gcd;
    
      // Ajuste de tolerancia
      var decimal = numerator / denominator;
      if (Math.abs(decimal - numero) < tolerance) {
        return numerator.toString() + '/' + denominator.toString();
      } else {
        return numero.toFixed(10);
      }
    }
  }
  
  // Función auxiliar para encontrar el máximo común divisor (GCD)
  function greatestCommonDivisor(a, b) {
    if (b === 0) {
      return a;
    }
    return greatestCommonDivisor(b, a % b);
  }
  
  
  
  
  function calcular() {
    var textarea = document.getElementById('dragdroptxt');
    var matriz = textarea.value.split('\n').map(function (fila) {
      return fila.split(' ').map(parsearFraccion);
    });
  
    // Ejemplo de operación: obtener la matriz reducida por Gauss-Jordan
    var n = matriz.length;
    var m = matriz[0].length;
    for (var i = 0; i < n; i++) {
      // Hacer ceros en la columna i por debajo de la fila i
      for (var j = i + 1; j < n; j++) {
        var factor = matriz[j][i] / matriz[i][i];
        for (var k = i; k < m; k++) {
          matriz[j][k] -= factor * matriz[i][k];
        }
      }
      // Hacer ceros en la columna i por encima de la fila i
      for (var j = i - 1; j >= 0; j--) {
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
  
    // Convertir la matriz resultante a una cadena de texto con fracciones
    var resultado = '';
    for (var i = 0; i < n; i++) {
      var fila = matriz[i].map(function (numero) {
        if (Number.isInteger(numero)) {
          return numero.toString();
        } else {
          var MAX_DENOMINATOR = 1000000;
          var tolerance = 1e-10;
  
          var numerator = Math.round(numero * MAX_DENOMINATOR);
          var denominator = MAX_DENOMINATOR;
  
          // Reducción de fracciones
          var gcd = greatestCommonDivisor(numerator, denominator);
          numerator /= gcd;
          denominator /= gcd;
  
          // Ajuste de tolerancia
          var decimal = numerator / denominator;
          if (Math.abs(decimal - numero) < tolerance) {
            return numerator.toString() + '/' + denominator.toString();
          } else {
            return numero.toFixed(10);
          }
        }
      }).join(' ');
      resultado += fila + '\n';
    }
  
    var resultadoTextarea = document.getElementById('resultado');
    resultadoTextarea.value = resultado;
  }
  