function dropHandler(evento) {
    evento.preventDefault();
    var archivo = evento.dataTransfer.files[0];
    if (archivo.type.match('text.*')) {
      var lector = new FileReader();
      lector.onload = function (evento) {
        var contenido = evento.target.result;
        var matriz = contenido.trim().split('\n').map(function (fila) {
          return fila.trim().split(' ').map(Number);
        });
        loadTable(matriz);
      };
      lector.readAsText(archivo);
    } else {
      alert('Solo se permiten archivos de texto');
    }
  }

  function loadTable(matriz) {
    var table = document.getElementById('input-table');
    table.innerHTML = '';
  
    matriz.forEach(function(fila) {
      var tr = document.createElement('tr');
      fila.forEach(function(elemento) {
        var td = document.createElement('td');
        td.textContent = elemento;
        tr.appendChild(td);
      });
      table.appendChild(tr);
    });
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
  
    // Verificar si la primera casilla es cero y, en ese caso, intercambiar filas
    if (matriz[0][0] === 0) {
      for (var i = 1; i < matriz.length; i++) {
        if (matriz[i][0] !== 0) {
          // Intercambiar filas
          var temp = matriz[0];
          matriz[0] = matriz[i];
          matriz[i] = temp;
          break;
        }
      }
    }
  
    // Aplicar el algoritmo de Gauss-Jordan
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
    }
  
    // Crear la tabla de resultados
    var tablaResultados = document.getElementById('resultTable');
    tablaResultados.innerHTML = ''; // Limpiar la tabla por si se calculó antes
  
    for (var i = 0; i < n; i++) {
      var fila = document.createElement('tr');
      for (var j = 0; j < m; j++) {
        var celda = document.createElement('td');
        celda.textContent = matriz[i][j];
        fila.appendChild(celda);
      }
      tablaResultados.appendChild(fila);
    }
  
    // Aquí puedes realizar el cálculo que necesites con la matriz
  
    var resultado = 'Aquí va el resultado de la operación'; // Reemplaza esto con el resultado real
  
    var resultadoTextarea = document.getElementById('resultado');
    resultadoTextarea.value = resultado;
  }
  