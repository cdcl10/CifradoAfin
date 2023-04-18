
function cifrar() {
    const mensaje = document.getElementById("mensaje").value;
const a = parseInt(document.getElementById("a").value);
const b = parseInt(document.getElementById("b").value);
const alfabeto = "abcdefghijklmnñopqrstuvwxyz";

let resultado = "";
for (let i = 0; i < mensaje.length; i++) {
      const letra = mensaje.charAt(i).toLowerCase();
const codigo = alfabeto.indexOf(letra);

if (codigo !== -1) {
        const codigoCifrado = (a * codigo + b) % 27;
const letraCifrada = alfabeto.charAt(codigoCifrado);
resultado += letraCifrada;
      } else {
    resultado += letra;
      }
    }

document.getElementById("mensaje").value = resultado;
actualizarFrecuencia(resultado);
  }

function descifrar() {
    const mensaje = document.getElementById("mensaje").value;
const a = parseInt(document.getElementById("a").value);
const b = parseInt(document.getElementById("b").value);
const a_inverso = obtenerInversoMultiplicativo(a);
const alfabeto = "abcdefghijklmnñopqrstuvwxyz";

let resultado = "";
for (let i = 0; i < mensaje.length; i++) {
      const letra = mensaje.charAt(i).toLowerCase();
const codigo = alfabeto.indexOf(letra);

if (codigo !== -1) {
        const codigoDescifrado = a_inverso * (codigo - b + 27) % 27;
const letraDescifrada = alfabeto.charAt(codigoDescifrado);
resultado += letraDescifrada;
      } else {
    resultado += letra;
      }
    }

document.getElementById("mensaje").value = resultado;
actualizarFrecuencia(resultado);
  }

function obtenerInversoMultiplicativo(a) {
    for (let i = 1; i < 27; i++) {
      if ((a * i) % 27 === 1) {
return i;
}
}
return 1;
}
function actualizarFrecuencia(mensaje) {
const frecuencia = { };
const regex = /[a-zá-ñ]/i; // Rango de letras a-z y á-ñ
const mensajeLimpio = mensaje.replace(/\s/g, ''); // Eliminar espacios en blanco
for (let i = 0; i < mensajeLimpio.length; i++) {
  const letra = mensajeLimpio.charAt(i).toLowerCase();
if (regex.test(letra)) {
    if (frecuencia[letra]) {
    frecuencia[letra]++;
    } else {
    frecuencia[letra] = 1;
    }
  }
}

const tablaFrecuencia = document.getElementById("frecuencia");
tablaFrecuencia.innerHTML = "";
for (let letra in frecuencia) {
const fila = document.createElement("tr");
const columnaLetra = document.createElement("td");
columnaLetra.innerHTML = letra;
fila.appendChild(columnaLetra);
const columnaFrecuencia = document.createElement("td");
columnaFrecuencia.innerHTML = frecuencia[letra];
fila.appendChild(columnaFrecuencia);
const columnaPorcentaje = document.createElement("td");
const porcentaje = (frecuencia[letra] / mensajeLimpio.length * 100).toFixed(2);
columnaPorcentaje.innerHTML = porcentaje + "%";
fila.appendChild(columnaPorcentaje);
tablaFrecuencia.appendChild(fila);
}

}
