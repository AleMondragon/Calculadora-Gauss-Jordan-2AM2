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
      for (var j = 0; j < columnas*2; j++) {
        var celdaMatriz = filaMatriz.insertCell();
        var entradaMatriz = document.createElement("input");
        entradaMatriz.type = "text";
        entradaMatriz.name = "matriz[" + i + "][" + j + "]";
        celdaMatriz.appendChild(entradaMatriz);
      }
    }
  
    var encabezado = document.createElement("h2");
    encabezado.textContent = "Introduce los vectores en vertical";
    encabezado.id = "encabezadoMatriz";
    var padreTabla = tablaMatriz.parentNode;
    padreTabla.insertBefore( encabezado, tablaMatriz);
    document.getElementById("botonmatrizA").style.display = "flex";
    document.getElementById("botonmatrizB").style.display = "flex";
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
  function crearTablaResultado(matriz) 
  {
    // Obtener la tabla y su cuerpo
    var tablaResultado = document.getElementById("tablaResultado");
    var cuerpoTablaResultado = tablaResultado.createTBody();

    var f = matriz.length;
    var k = matriz[0].length;
  
    // Crear cada fila y sus celdas
    for (var i = 0; i < matriz.length; i++) {
      var filaResultado = cuerpoTablaResultado.insertRow();
      for (var j = matriz.length; j < matriz[i].length; j++) {
        var celdaResultado = filaResultado.insertCell();
        var entradaResultado = document.createElement("input");
        entradaResultado.type = "text";
        entradaResultado.name = "resultado[" + i + "][" + j + "]";
  
        // Convertir el número a fracción
        var fraccion = decimalAFraccion(matriz[i][j][0], matriz[i][j][1]);
        
        f++;
        k++;

        entradaResultado.value = fraccion;
  
        celdaResultado.appendChild(entradaResultado);
      }
    }
  }

  // Crear la tabla con la matriz resultado de la matriz A
    function crearTablaResultadoA(matriz) 
    {
      // Obtener la tabla y su cuerpo
      var tablaResultado = document.getElementById("tablaA");
      var cuerpoTablaResultado = tablaResultado.createTBody();
  
      var f = matriz.length;
      var k = matriz[0].length;
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
          
          f++;
          k++;
  
          entradaResultado.value = matriz[i][j];
    
          celdaResultado.appendChild(entradaResultado);
        }
      }
    }

  // Crear la tabla con la matriz resultado de la matrizB
    function crearTablaResultadoB(matriz) 
    {
      // Obtener la tabla y su cuerpo
      var tablaResultado = document.getElementById("tablaB");
      var cuerpoTablaResultado = tablaResultado.createTBody();
  
      var f = matriz.length;
      var k = matriz[0].length;
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
          
          f++;
          k++;
  
          entradaResultado.value = matriz[i][j];
    
          celdaResultado.appendChild(entradaResultado);
        }
      }
    }

  // Función para convertir un decimal a fracción
  
  function decimalAFraccion(a, b) 
  {
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
  
  
  // CALCULA EL CAMBIO DE BASE USANDO GAUSS-JORDAN

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
    var A = crearMatrizSec();
    var B = crearMatrizSecB();
  
    var n = matriz.length;
    var m = matriz[0].length;
    var j = 0;
    var i = 0;
    var z = 0;
    var p = [];

    //Revisa que el determinante no se haga cero (sinó, no sería base)

    var detA = determinanteRecursivo(A);
    var detB = determinanteRecursivo(B);

    //SI EL DETERMINANTE DE LA BASE A ES CERO
    if(detA === 0)
    {
        alert("Tu matriz A no es Base");
        return;
    }

    //SI EL DETERMINANTE DE LA BASE B ES CERO
    if(detB === 0)
    {
        alert("Tu matriz B no es Base");
        return;
    }

  
    // Resolver la matriz Gauss-Jordan para el cambio de Base
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
  
    // Crear la tabla con la matriz resultado que nos indica el cambio de base.
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
  
  //COMIENZA DESDE EL INICIO TODO EL MICROSITIO
  
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
  
  
  // Crear la matriz que solo tiene las entradas a operar de la Base A, ommitiendo las columnas de la Base B.
  function crearMatrizSec() 
  {
    var matriz = [];
    var filas = document.getElementById("matriz").rows;
    var m, k;
    
    
    for (var i = 0; i < filas.length; i++) 
    {
      var celdas = filas[i].cells;
      matriz[i] = [];
      m = celdas.length - filas.length;
      k = celdas.length%m
      if(m !== filas.length)
      {
            m = m - 1;    
      }
      else
      {
            m = celdas.length - filas.length;    
      }
      for (var j = 0; j < (celdas.length - filas.length); j++)
      //for (var j = 0; j < (m); j++) 
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



    // Crear la matriz que solo tiene las entradas a operar de la Base B, ommitiendo las columnas de la Base A.

  function crearMatrizSecB() 
  {
    var matriz = [];
    var B = [];
    var filas = document.getElementById("matriz").rows;
    var d, k;

    for (var i = 0; i < filas.length; i++) 
    {
      var celdas = filas[i].cells;
      matriz[i] = [];
      d = celdas.length - filas.length;
      k = celdas.length%m
      if(d !== filas.length)
      {
            d = d - 1;    
      }
      else
      {
            d = celdas.length - filas.length;    
      }
      for (var j = filas.length; j < celdas.length; j++) 
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
    let m = 0;
    for(i = 0; i < filas.length; i++)
    {
      B[i] = [];
      for(j = filas.length; j < celdas.length; j++)
      {
        if(m === filas.length)
        {
          m = 0;
        }
        B[i][m] = matriz[i][j];
        m++;
      }
    }
    return B;
  }

//OBTIENE EL DETERMINANTE PARA QUE, EN CASO DE QUE SE HICIERA CERO, YA NI HACES NADA Y LE DICES AL USUARIO "NO ES BASE, NO LE MUEVA"

function determinanteRecursivo(matriz) 
{
    var n = matriz.length;
    // Caso base: matriz de 1x1
    if (n === 1) 
    {
      return Math.round(matriz[0][0][0] / matriz[0][0][1]); // Devolver la fracción como resultado
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
      
    return Math.round(det);
}

//CREA UNA MATRIZ AUXILIAR PARA OBTENER EL DETERMINANTE

function obtenerSubmatriz(matriz, iEliminar, jEliminar) 
{
    var submatriz = [];
    var n = matriz.length;
  
    for (var i = 1; i < n; i++) 
    {
      var fila = [];
      for (var j = 0; j < n; j++) 
      {
        if (j !== jEliminar) 
        {
          fila.push(matriz[i][j]);
        }
      }
      if (i !== iEliminar) 
      {
        submatriz.push(fila);
      }
    }
  
    return submatriz;
}

//FUNCION QUE UTILIZA EL METODO DE GRAM SCHMIDT PARA OBTENER BASES ORTOGONALES jajaja 

//GRAM SCHMIDT EN GENERAL

function gramSchmidt(baseOriginal) 
{
  const n = baseOriginal.length;
  const m = baseOriginal[0].length;
  var l = m-1;
  var c = 0;
  var vector = [];
  var monos = [];

  //CREAMOS UN NUEVO ARREGLO PARA NUESTROS VECTORES Y NO ANDAR BATALLANDO
  for(let u = 0 ; u < m; u++)
  {
    vector[u] = [];
    //for(let v = 0; v < n; v++)
    for(let v = 0; v < n; v++)
    {
      vector[u][v] = baseOriginal[v][u][0];
    }
  }

  // CREAMOS UNA NUEVA MATRIZ PARA ALMACENAR LA BASE ORTOGONALIZADA
  const baseOrtogonalizada = [];

  // Iteramos sobre los vectores de la base original (O SEA, EL ARREGLO vector[n][m])
  for (let i = 0; i < m; i++) {
    // Inicializamos el vector ortogonal con una copia del vector de la base original
    let vectorOrtogonal = vector[i].slice();

    // Restamos las proyecciones de los vectores anteriores
    for (let j = 0; j < i; j++) 
    {
      const productoInterno = interno(baseOrtogonalizada[j], vector[i]);
      const magnitudCuadrada = interno(baseOrtogonalizada[j], baseOrtogonalizada[j]);
      const factor = productoInterno / magnitudCuadrada;

      // Restamos la proyección del vector ortogonal anterior
      vectorOrtogonal = resta(vectorOrtogonal, escalar(factor, baseOrtogonalizada[j]));
    }

    // Agregamos el vector ortogonalizado a la base ortogonalizada
    baseOrtogonalizada.push(vectorOrtogonal);
  }
  var d = baseOrtogonalizada.length;
  var x = baseOrtogonalizada[0].length;
  //PRUEBA PARA VOLVER A FRACCIONES
  for(let i = 0 ; i < d ; i++)
  {
    for(let j = 0 ; j < x ; j++)
    {
      if(baseOrtogonalizada[i][j] === 0)
      {
        baseOrtogonalizada[i][j] = baseOrtogonalizada[i][j];
      }
      else if(baseOrtogonalizada[i][j] < 0)
      {
        baseOrtogonalizada[i][j] = baseOrtogonalizada[i][j] * (-1);
        var v = decToFrac( baseOrtogonalizada[i][j] );
        var fraccion = decimalAFraccion(v[0], v[1]);
        baseOrtogonalizada[i][j] = fraccion;
        baseOrtogonalizada[i][j] = baseOrtogonalizada[i][j] * -1;
        if(isNaN(baseOrtogonalizada[i][j]))
        {
          baseOrtogonalizada[i][j] = '-' + fraccion;
        }
      }
      else
      {
        console.log("aquí es normal");
        var v = decToFrac( baseOrtogonalizada[i][j] );
        var fraccion = decimalAFraccion(v[0], v[1]);
        baseOrtogonalizada[i][j] = fraccion;
        baseOrtogonalizada[i][j] = baseOrtogonalizada[i][j];
      }
    }
  }
    
    //CREAMOS UN NUEVO ARREGLO PARA NUESTROS VECTORES Y NO ANDAR BATALLANDO
    for(let u = 0 ; u < d; u++)
    {
      monos[u] = [];
      //for(let v = 0; v < n; v++)
      for(let v = 0; v < x; v++)
      {
        if(u === x)
        {
            for(let s = 0; s < x; s++)
            {
                monos[u][v] = baseOrtogonalizada[u][s];
                monos[u][v] = monos[u][v];
            }
        }
        else
        {
            monos[u][v] = baseOrtogonalizada[v][u];
        }
      }
    }

  //ACABA LA PRUEBA PARA VOLVER FRACCIONES
  return monos;
}

//GRAM SCHMIDT PARA A
function gramSchmidtA()
{
    alert("este proceso lleva tiempo, dame chance BB");
   // Validar la matriz
   if (!validarMatriz()) 
   {
    return;
   }
  var tablaResultado = document.getElementById("tablaA");
  while (tablaResultado.rows.length > 0) 
  {
    tablaResultado.deleteRow(0);
  }
  var inputsResultado = document.querySelectorAll("#tablaA input[type='text']");
  inputsResultado.forEach(function(input) {
    input.value = "";
  });
  let view = document.getElementsByClassName("infosec2");
for (var i = 0; i < view.length; i++) 
{
  view[i].style.display = "flex";
}


//METE LA baseA EN OTRA MATRIZ PARA IMPRIMIRLA EN PANTALLA
  var baseA = crearMatrizSec();

  //PRIMERO OBTIENE LA MATRIZ QUE SALIÓ DE HACER GRAM SCHMIDT Y LA GUARDA EN A
  var A = gramSchmidt(baseA);
  let n = A.length;
    alert("listo papito :D revisa la parte de abajo");
  crearTablaResultadoA(A);
}

//GRAM SCHMIDT PARA B

function gramSchmidtB()
{
    alert("este proceso lleva tiempo, dame chance BB");
   // Validar la matriz
   if (!validarMatriz()) 
   {
    return;
   }
  var tablaResultado = document.getElementById("tablaB");
  while (tablaResultado.rows.length > 0) 
  {
    tablaResultado.deleteRow(0);
  }
  var inputsResultado = document.querySelectorAll("#tablaB input[type='text']");
  inputsResultado.forEach(function(input) {
    input.value = "";
  });
  let view = document.getElementsByClassName("infosec2");
for (var i = 0; i < view.length; i++) 
{
  view[i].style.display = "flex";
}


//METE LA baseA EN OTRA MATRIZ PARA IMPRIMIRLA EN PANTALLA
  var baseB = crearMatrizSecB();

  //PRIMERO OBTIENE LA MATRIZ QUE SALIÓ DE HACER GRAM SCHMIDT Y LA GUARDA EN A
  var B = gramSchmidt(baseB);
  let n = B.length;
    alert("listo papito :D revisa la parte de abajo");
  crearTablaResultadoB(B);
}

// Función auxiliar para calcular el producto interno entre dos vectores
function interno(a, b) 
{
  const n = a.length;
  let sum = 0;
  for (let i = 0; i < n; i++) 
  {
    sum += a[i] * b[i];
  }
  return sum;
}


// Función auxiliar para restar dos vectores
function resta(a, b) 
{
  const n = a.length;
  const result = [];
  for (let i = 0; i < n; i++) 
  {
    result.push(a[i] - b[i]);
  }
  return result;
}


// Función auxiliar para sumar dos vectores
function suma(a, b)
{
  const n = a.length;
  const result = [];
  for (let i = 0; i < n; i++) 
  {
    result.push(a[i] + b[i]);
  }
  return result;
}


// Función auxiliar para multiplicar un vector por un escalar
function escalar(scalar, vector) 
{
  const n = vector.length;
  const result = [];
  for (let i = 0; i < n; i++) 
  {
    result.push(scalar * vector[i]);
  }
  return result;
}




decToFrac = dec =>
[...Array(1000).keys()].flatMap(
  i => [...Array(1000).keys()].map(
    j => [
      i + 1, j + 1, (i + 1) / (j + 1),
      Math.abs(((i + 1) / (j + 1)) - dec)
    ]
  )
).sort((a, b) => a[3] - b[3])[0].slice(0, 2)
