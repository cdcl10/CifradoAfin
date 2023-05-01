function cifrar() {
  // Obtenemos los valores ingresados por el usuario
  const mensaje = document.getElementById("mensajeCifrar").value;
  const a = parseInt(document.getElementById("aCifrar").value);
  const b = parseInt(document.getElementById("bCifrar").value);

  // Definimos el alfabeto español
  const alfabeto = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";

  // Creamos un objeto para mapear cada letra del alfabeto a un índice
  const mapeoLetras = {};
  for (let i = 0; i < alfabeto.length; i++) {
    mapeoLetras[alfabeto[i]] = i;
  }

  // Convertimos el mensaje a mayúsculas, eliminamos las tildes y lo separamos en caracteres
  const mensajeLimpio = mensaje
    .toUpperCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .split("");

  // Creamos un array para guardar los caracteres cifrados
  const resultado = [];

  // Recorremos el mensaje
  for (let i = 0; i < mensajeLimpio.length; i++) {
    const letra = mensajeLimpio[i];
    if (mapeoLetras.hasOwnProperty(letra)) { // Si la letra se encuentra en el alfabeto
      const indiceLetra = mapeoLetras[letra];
      const indiceCifrado = (a * indiceLetra + b) % 27; // Aplicamos la fórmula del cifrado afín
      resultado.push(alfabeto[indiceCifrado]); // Agregamos el carácter cifrado al array resultado
    }
  }

  // Mostramos el resultado cifrado en la página
  document.getElementById("texto-cifrado").innerHTML = resultado.join("");

}
function inverso(a, m) {
  for (let i = 0; i < m; i++) {
    if ((a * i) % m === 1) {
      return i;
    }
  }
  return -1;
}
function encontrarB(S) {
  const A = 0; // valor de A conocido
  const n = 27; // módulo
  let b = 0; // valor de b desconocido

  b = ((S % 27) + 27) % 27;

  return b ;
  }

function calcularFrecuencia() {
  var mensajeCifrado = document.getElementById("texto-descifrado").value.toUpperCase();
  var mensajeSinEspacios = mensajeCifrado.replace(/[^a-zA-Z]+/g, "");
  var frecuencias = {};
  for (var i = 0; i < mensajeSinEspacios.length; i++) {
    var letra = mensajeSinEspacios[i];
    if (frecuencias[letra]) {
      frecuencias[letra]++;
    } else {
      frecuencias[letra] = 1;
    }
  }
  var letrasOrdenadas = Object.keys(frecuencias).sort(function(a, b) {
    return frecuencias[b] - frecuencias[a];
  });
  var porcentajesFrecuencia = {};
  for (var i = 0; i < letrasOrdenadas.length; i++) {
    var letra = letrasOrdenadas[i];
    var frecuencia = frecuencias[letra];
    var porcentaje = (frecuencia / mensajeSinEspacios.length) * 100;
    porcentajesFrecuencia[letra] = porcentaje.toFixed(2) + "%";
  }
  var estadisticas = "";
  for (var i = 0; i < letrasOrdenadas.length; i++) {
    var letra = letrasOrdenadas[i];
    estadisticas += letra + ": " + porcentajesFrecuencia[letra] + "\n";
  }
  document.getElementById("estadisticas").value = estadisticas;
  const alfabeto = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ"; 
  var letra1 = alfabeto.indexOf(letrasOrdenadas[0]);
  var letra2 = alfabeto.indexOf(letrasOrdenadas[1]);
  x = encontrarB(letra2);
  y = (((letra1 - x) * 7 )% 27 + 27) % 27;
  descifrar(y,x);
}
function calcularFrecuencia() {
    
  // Obtenemos el mensaje cifrado ingresado por el usuario
  var mensajeCifrado = document.getElementById("texto-descifrado").value.toUpperCase();
  var mensajeSinEspacios = mensajeCifrado.replace(/[^a-zA-Z]+/g, "");

  // Creamos un objeto vacío para almacenar las frecuencias de cada letra
  var frecuencias = {};

  // Recorremos el mensaje cifrado y contamos la frecuencia de cada letra
  for (var i = 0; i < mensajeSinEspacios.length; i++) {
    var letra = mensajeSinEspacios[i];

    // Si la letra ya está en el objeto de frecuencias, aumentamos su contador
    if (frecuencias[letra]) {
      frecuencias[letra]++;
    }
    // Si la letra no está en el objeto de frecuencias, la agregamos con un contador de 1
    else {
      frecuencias[letra] = 1;
    }
  }

  // Ordenamos las letras por frecuencia de mayor a menor
  var letrasOrdenadas = Object.keys(frecuencias).sort(function(a, b) {
    return frecuencias[b] - frecuencias[a];
  });

  // Calculamos el porcentaje de frecuencia para cada letra y lo almacenamos en un nuevo objeto
  var porcentajesFrecuencia = {};
  for (var i = 0; i < letrasOrdenadas.length; i++) {
    var letra = letrasOrdenadas[i];
    var frecuencia = frecuencias[letra];
    var porcentaje = (frecuencia / mensajeSinEspacios.length) * 100;
    porcentajesFrecuencia[letra] = porcentaje.toFixed(2) + "%";

    
  }

// Creamos una tabla con las estadísticas de frecuencia y la mostramos en el campo correspondiente
var tabla = "<table><thead><tr><th>Letra</th><th>Frecuencia</th></tr></thead><tbody>";
for (var i = 0; i < letrasOrdenadas.length; i++) {
  var letra = letrasOrdenadas[i];
  tabla += "<tr><td>" + letra + "</td><td>" + porcentajesFrecuencia[letra] + "</td></tr>";
}
tabla += "</tbody></table>";
document.getElementById("estadisticas").innerHTML = tabla;
// Centramos la tabla en la pantalla
document.getElementById("estadisticas").style.margin = "auto";


function descifrar(a,b) {
  const alfabeto = "abcdefghijklmnñopqrstuvwxyz"; // alfabeto español
  var mensajeCifrado = document.getElementById("texto-descifrado").value.toLowerCase();
  let mensajeDescifrado = "";
  // Calcular el inverso multiplicativo de a
  let inverso = 0;
  for (let i = 0; i < alfabeto.length; i++) {
    const resto = (a * i) % alfabeto.length;
    if (resto === 1) {
      inverso = i;
      break;
    }
  }
  // Descifrar cada letra del mensaje cifrado utilizando la función afín inversa
  for (let i = 0; i < mensajeCifrado.length; i++) {
    const letra = mensajeCifrado.charAt(i);
    const indice = alfabeto.indexOf(letra);
    if (indice !== -1) { // si la letra está en el alfabeto
      const indiceDescifrado = inverso * (indice - b + alfabeto.length) % alfabeto.length;
      mensajeDescifrado += alfabeto.charAt(indiceDescifrado);
    } else { // si la letra no está en el alfabeto
      mensajeDescifrado += letra;
    }
  }
  document.getElementById("parametros").innerHTML = "a = " + a + ", b = " + b;
  // Mostrar el mensaje descifrado
  document.getElementById("mensaje-descifrado").value = mensajeDescifrado.toUpperCase();

  }
}
