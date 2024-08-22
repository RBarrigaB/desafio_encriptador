let vocales_encriptadas = {
  a: "ai",
  e: "enter",
  i: "imes",
  o: "ober",
  u: "ufat",
};

let vocales_desencriptadas = {
  ai: "a",
  enter: "e",
  imes: "i",
  ober: "o",
  ufat: "u",
};

const fs_encriptar = (texto) => {
  if (validar_palabra(texto)) {
    return texto.replace(/[aeiou]/g, (vocal) => vocales_encriptadas[vocal]);
  } else {
    return "Palabra inválida";
  }
};

const fs_desencriptar = (texto) => {
  if (validar_palabra(texto)) {
    return texto.replace(
      /ai|enter|imes|ober|ufat/g,
      (texto_vocal) => vocales_desencriptadas[texto_vocal]
    );
  } else {
    return "Palabra inválida";
  }
};

const validar_palabra = (texto) => {
  return /^[a-zñ\s]+$/.test(texto);
};

let ultimoTextoProcesado = "";
let warning_msg =
  "ERROR. Texto inválido: no se permiten mayúsculas ni caracteres especiales, solo letras minúsculas.";
let texto_repetido_msg =
  "NOTA. Texto ya procesado, por favor ingrese uno distinto";
let texto_copiado_exito_msg = "Texto copiado exitosamente";
let texto_copiado_fallido_msg = "Error al copiar el texto";

const displayData = (action) => {
  let elementosDefault = document.getElementsByClassName("mostrar_default");
  let elementoData = document.getElementById("mostrar_data");
  const userInput = document.getElementById("input_enc_dec");
  const resultadoMostrar = document.getElementById(
    "texto_encriptado_desenecriptado"
  );
  const warningMessage = document.getElementById("texto_input");
  let resultado = "";

  if (userInput.value) {
    if (validar_palabra(userInput.value)) {
      if (userInput.value !== ultimoTextoProcesado) {
        if (action === "encriptar") {
          resultado = fs_encriptar(userInput.value);
        } else if (action === "desencriptar") {
          console.log("userInput desencriptar: ", userInput.value);
          resultado = fs_desencriptar(userInput.value);
        }
        ultimoTextoProcesado = userInput.value;
        for (let i = 0; i < elementosDefault.length; i++) {
          elementosDefault[i].setAttribute("hidden", "true");
        }
        elementoData.removeAttribute("hidden");
        resultadoMostrar.textContent = resultado;
      } else {
        warningMessage.textContent = texto_repetido_msg;
        warningMessage.style.display = "block";
        warningMessage.style.color = "blue";
        setTimeout(() => {
          warningMessage.style.display = "none";
        }, 5000);
      }
    } else {
      warningMessage.textContent = warning_msg;
      warningMessage.style.display = "block";
      warningMessage.style.color = "red";
      setTimeout(() => {
        warningMessage.style.display = "none";
      }, 5000);
    }
  } else {
    if (action === "encriptar" || action === "desencriptar") {
      for (let i = 0; i < elementosDefault.length; i++) {
        elementosDefault[i].removeAttribute("hidden");
      }
      elementoData.setAttribute("hidden", "true");
      resultadoMostrar.textContent = "";
    }
  }
};

document.getElementById("btn_encriptar").addEventListener("click", () => {
  displayData("encriptar");
});

document.getElementById("btn_desencriptar").addEventListener("click", () => {
  displayData("desencriptar");
});

document.getElementById("copiar").addEventListener("click", () => {
  const textoACopiar = document.getElementById(
    "texto_encriptado_desenecriptado"
  ).innerHTML;
  const msgDivCopiar = document.getElementById("texto_copiado");
  navigator.clipboard
    .writeText(textoACopiar)
    .then(() => {
      msgDivCopiar.textContent = texto_copiado_exito_msg;
      msgDivCopiar.style.display = "block";
      msgDivCopiar.style.color = "green";
      setTimeout(() => {
        msgDivCopiar.style.display = "none";
      }, 5000);
    })
    .catch((err) => {
      msgDivCopiar.textContent = texto_copiado_fallido_msg;
      msgDivCopiar.style.display = "block";
      msgDivCopiar.style.color = "red";
      setTimeout(() => {
        msgDivCopiar.style.display = "none";
      });
    });
});
