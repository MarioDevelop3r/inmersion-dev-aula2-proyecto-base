let listaNombreGastos = [];
let listaValorGastos = [];
let listaDescripcionGastos = [];

// Esta función se ejecuta cuando se hace click en el botón
function clickBoton() {
  let nombreGasto = document.getElementById("nombreGasto").value;
  let valorGasto = parseFloat(document.getElementById("valorGasto").value);
  let descripcionGasto = document.getElementById("descripcionGasto").value;
  let indiceGasto = parseInt(document.getElementById("indiceGasto").value);

  if (nombreGasto && !isNaN(valorGasto)) {
    if (indiceGasto === -1) {
      // Agregar nuevo gasto
      listaNombreGastos.push(nombreGasto);
      listaValorGastos.push(valorGasto);
      listaDescripcionGastos.push(descripcionGasto);
      showAlert("Gasto agregado correctamente", "success");
    } else {
      // Actualizar gasto existente
      listaNombreGastos[indiceGasto] = nombreGasto;
      listaValorGastos[indiceGasto] = valorGasto;
      listaDescripcionGastos[indiceGasto] = descripcionGasto;
      document.getElementById("indiceGasto").value = -1; // Resetear el índice
      showAlert("Gasto actualizado correctamente", "success");
    }
    actualizarListaDeGastos();
  } else {
    showAlert(
      "Por favor, ingrese un nombre y un valor válido para el gasto.",
      "error"
    );
  }
}

function actualizarListaDeGastos() {
  const listaDeElementos = document.getElementById("listaDeGastos");
  const totalGastosElemento = document.getElementById("totalGastos");
  listaDeElementos.innerHTML = ""; // Limpiar la lista antes de actualizar
  let totalGastos = 0;

  listaNombreGastos.forEach((elemento, posicion) => {
    const valorGasto = listaValorGastos[posicion];
    const descripcionGasto = listaDescripcionGastos[posicion];
    const li = document.createElement("li");
    li.textContent = `${elemento} - USD ${valorGasto.toFixed(
      2
    )} - ${descripcionGasto}`;

    const eliminarBtn = document.createElement("button");
    eliminarBtn.textContent = "Eliminar Gasto";
    eliminarBtn.onclick = () => eliminarGasto(posicion);
    li.appendChild(eliminarBtn);

    const modificarBtn = document.createElement("button");
    modificarBtn.textContent = "Modificar Gasto";
    modificarBtn.onclick = () => modificarGasto(posicion);
    li.appendChild(modificarBtn);

    listaDeElementos.appendChild(li);

    // Calcular el total de gastos
    totalGastos += valorGasto;
  });

  totalGastosElemento.textContent = `${totalGastos.toFixed(2)}`;

  if (totalGastos > 150) {
    showAlert(
      "¡Advertencia! El total de gastos ha superado el límite de 150.",
      "error"
    );
  }

  limpiar();
}

function limpiar() {
  document.getElementById("nombreGasto").value = "";
  document.getElementById("valorGasto").value = "";
  document.getElementById("descripcionGasto").value = "";
  document.getElementById("indiceGasto").value = -1; // Resetear el índice
}

function eliminarGasto(posicion) {
  listaNombreGastos.splice(posicion, 1);
  listaValorGastos.splice(posicion, 1);
  listaDescripcionGastos.splice(posicion, 1);
  actualizarListaDeGastos();
  showAlert("Gasto eliminado correctamente", "success");
}

function modificarGasto(posicion) {
  document.getElementById("nombreGasto").value = listaNombreGastos[posicion];
  document.getElementById("valorGasto").value = listaValorGastos[posicion];
  document.getElementById("descripcionGasto").value =
    listaDescripcionGastos[posicion];
  document.getElementById("indiceGasto").value = posicion; // Establecer el índice del gasto que se está modificando
}

function showAlert(message, type) {
  const alertContainer = document.getElementById("alert-container");
  const alert = document.createElement("div");
  alert.className = `alert alert-${type} show`;
  alert.innerHTML = `
	  <span class="alert-icon">${type === "success" ? "✔️" : "❌"}</span>
	  <span class="alert-message">${message}</span>
  `;
  alertContainer.appendChild(alert);

  setTimeout(() => {
    alert.classList.remove("show");
    alert.classList.add("hide");
    alert.addEventListener("animationend", () => alert.remove());
  }, 3000);
}
