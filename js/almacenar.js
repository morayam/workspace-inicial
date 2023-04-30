let listado = [];

function agregar() {
  let item = document.getElementById("item");
  listado.push(item.value);
  localStorage.setItem("datos", JSON.stringify(listado));
  item.value = "";
  mostrar(listado);
}

function mostrar(lista) {
  let items = "";
  for (let item of lista) {
    items += `<li class="list-group-item"> ${item} </li>`;
  }
  document.getElementById("contenedor").innerHTML = items;
}

function limpiar() {
  listado = [];
  localStorage.removeItem("datos");
  mostrar(listado);
}

document.addEventListener("DOMContentLoaded", () => {
  listado = JSON.parse(localStorage.getItem("datos"));
  if (listado != null) {
    mostrar(listado);
  } else {
    listado = [];
  }

  document.getElementById("agregar").addEventListener("click", () => {
    agregar();
  });

  document.getElementById("limpiar").addEventListener("click", () => {
    limpiar();
  });
});
