class GastosManager {
  constructor() {
    this.listaNombreGastos = [];
    this.listaValorGastos = [];
    this.listaDescripcionGastos = [];
  }

  clickBoton() {
    let nombreGasto = document.getElementById("nombreGasto").value;
    let valorGasto = parseFloat(document.getElementById("valorGasto").value);
    let descripcionGasto = document.getElementById("descripcionGasto").value;
    let indiceGasto = parseInt(document.getElementById("indiceGasto").value);

    if (nombreGasto && !isNaN(valorGasto)) {
      if (indiceGasto === -1) {
        // Agregar nuevo gasto
        this.listaNombreGastos.push(nombreGasto);
        this.listaValorGastos.push(valorGasto);
        this.listaDescripcionGastos.push(descripcionGasto);
        this.showAlert("Gasto agregado correctamente", "success");
      } else {
        // Actualizar gasto existente
        this.listaNombreGastos[indiceGasto] = nombreGasto;
        this.listaValorGastos[indiceGasto] = valorGasto;
        this.listaDescripcionGastos[indiceGasto] = descripcionGasto;
        document.getElementById("indiceGasto").value = -1; // Resetear el índice
        this.showAlert("Gasto actualizado correctamente", "success");
      }
      this.actualizarListaDeGastos();
    } else {
      this.showAlert(
        "Por favor, ingrese un nombre y un valor válido para el gasto.",
        "error"
      );
    }
  }

  actualizarListaDeGastos() {
    const listaDeElementos = document.getElementById("listaDeGastos");
    const totalGastosElemento = document.getElementById("totalGastos");
    listaDeElementos.innerHTML = ""; // Limpiar la lista antes de actualizar
    let totalGastos = 0;

    this.listaNombreGastos.forEach((elemento, posicion) => {
      const valorGasto = this.listaValorGastos[posicion];
      const descripcionGasto = this.listaDescripcionGastos[posicion];
      const li = document.createElement("li");
      li.textContent = `${elemento} - USD ${valorGasto.toFixed(
        2
      )} - ${descripcionGasto}`;

      const eliminarBtn = document.createElement("button");
      eliminarBtn.textContent = "Eliminar Gasto";
      eliminarBtn.onclick = () => this.eliminarGasto(posicion);
      li.appendChild(eliminarBtn);

      const modificarBtn = document.createElement("button");
      modificarBtn.textContent = "Modificar Gasto";
      modificarBtn.onclick = () => this.modificarGasto(posicion);
      li.appendChild(modificarBtn);

      listaDeElementos.appendChild(li);

      // Calcular el total de gastos
      totalGastos += valorGasto;
    });

    totalGastosElemento.textContent = `${totalGastos.toFixed(2)}`;

    if (totalGastos > 150) {
      this.showAlert(
        "¡Advertencia! El total de gastos ha superado el límite de 150.",
        "error"
      );
    }

    this.limpiar();
  }

  limpiar() {
    document.getElementById("nombreGasto").value = "";
    document.getElementById("valorGasto").value = "";
    document.getElementById("descripcionGasto").value = "";
    document.getElementById("indiceGasto").value = -1; // Resetear el índice
  }

  eliminarGasto(posicion) {
    this.listaNombreGastos.splice(posicion, 1);
    this.listaValorGastos.splice(posicion, 1);
    this.listaDescripcionGastos.splice(posicion, 1);
    this.actualizarListaDeGastos();
    this.showAlert("Gasto eliminado correctamente", "success");
  }

  modificarGasto(posicion) {
    document.getElementById("nombreGasto").value = this.listaNombreGastos[posicion];
    document.getElementById("valorGasto").value = this.listaValorGastos[posicion];
    document.getElementById("descripcionGasto").value = this.listaDescripcionGastos[posicion];
    document.getElementById("indiceGasto").value = posicion; // Establecer el índice del gasto que se está modificando
  }

  showAlert(message, type) {
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
}

// Instanciar la clase y asignar los eventos
const gastosManager = new GastosManager();
document.getElementById("botonFormulario").onclick = () => gastosManager.clickBoton();