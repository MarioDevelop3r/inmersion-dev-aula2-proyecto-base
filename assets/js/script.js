let listaNombreGastos = [];
let listaValorGastos = [];

// Esta función se ejecuta cuando se hace click en el botón

function clickBoton() {
  let nombreGasto = document.getElementById("nombreGasto").value;
  let valorGasto = document.getElementById("valorGasto").value;

  console.log(nombreGasto);
  console.log(valorGasto);

  console.log(listaNombreGastos);
  console.log(listaValorGastos);

  listaNombreGastos.push(nombreGasto);
  listaValorGastos.push(valorGasto);

  console.log(listaNombreGastos);
  console.log(listaValorGastos);
  actualizarListaDeGastos();
  //   alert("Gasto agregado correctamente");
}

function actualizarListaDeGastos() {
  const listaDeElementos = document.getElementById("listaDeGastos");
  const totalGastosElemento = document.getElementById("totalGastos");
  let htmlLista = "";
  let totalGastos = 0;
  listaNombreGastos.forEach((elemento, posicion) => {
    const valorGasto = Number(listaValorGastos[posicion]);
    htmlLista += `<li>${elemento} - USD ${valorGasto.toFixed(2)} 
    <button onclick="eliminarGasto(${posicion});">Eliminar Gasto</button>
    </li>`;

    // calculo el total de gastos

    totalGastos += Number(valorGasto);
    console.log(totalGastos);
  });

  listaDeElementos.innerHTML = htmlLista;
  totalGastosElemento.innerHTML = `${totalGastos.toFixed(2)}`;
  limpiar();
}
function limpiar() {
  document.getElementById("nombreGasto").value = "";
  document.getElementById("valorGasto").value = "";
}
function eliminarGasto(posicion) {
  console.log(posicion);
  listaNombreGastos.splice(posicion, 1);
  listaValorGastos.splice(posicion, 1);
  actualizarListaDeGastos();
}
