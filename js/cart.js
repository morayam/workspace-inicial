let cartUserId = "25801"; //localStorage.getItem("UserID");
let cart_URL = CART_INFO_URL + cartUserId + EXT_TYPE;
let cartObj = "";
let email = localStorage.getItem("email");
let quantity = [];
let price = [];
let currency = [];
let plus = 0;
//let cartArray = [];
//let articles = [{}];

document.addEventListener("DOMContentLoaded", function (e) {
  showCartList();

  if (email == null) {
    window.location = "login.html";
  } else {
    document.getElementById("mail-usuario").innerHTML = email;
  }

  btnLogOut.addEventListener("click", function () {
    localStorage.clear();
    window.location = "login.html";
  });

  document
    .getElementById("transferencia")
    .addEventListener("click", function () {
      document.getElementById("numeroBanco").disabled = false;

      document.getElementById("numeroTarjeta").disabled = true;
      document.getElementById("codigoSeguridad").disabled = true;
      document.getElementById("vencimiento").disabled = true;
    });

  document.getElementById("tarjeta").addEventListener("click", function () {
    document.getElementById("numeroBanco").disabled = true;

    document.getElementById("numeroTarjeta").disabled = false;
    document.getElementById("codigoSeguridad").disabled = false;
    document.getElementById("vencimiento").disabled = false;
  });

  if (
    (document.getElementById("numeroTarjeta").disabled =
      false && document.getElementById("numeroTarjeta").value !== null)
  ) {
    document.getElementById("BUY").addEventListener("click", function () {
      let objTarjeta = {
        NumeroTarjeta: document.getElementById("numeroTarjeta").value,
        CodigoSeguridad: document.getElementById("codigoSeguridad").value,
        Vencimiento: document.getElementById("vencimiento").value,
      };
      localStorage.setItem("metodoDePago", "tarjeta");
      localStorage.setItem("datosDePago", json.stringify(objTarjeta));
    });
  } else {
    if (
      (document.getElementById("numeroTarjeta").disabled =
        false && document.getElementById("numeroTarjeta").value == null)
    ) {
      document.getElementById("BUY").addEventListener("click", function () {
        alert("Debe completar datos.");
      });
    }
  }

  let form = document.getElementById("form");
  form.addEventListener("submit", function (e) {
    if (!form.checkValidity()) {
      e.preventDefault();
      e.stopPropagation();
    }

    if (form.checkValidity()) {
      // Swal.fire({
      //   title: "¡La compra ha sido realizada con éxito!",
      //   icon: "success",
      //   showConfirmButton: false,
      //   timer: 1500,
      // });
      alert("¡La compra ha sido realizada con éxito!");
      form.classList.add("was-validated");
    }

    let evento = ["change", "input"];

    evento.forEach((e) => {
      document.form.addEventListener(e, validation);
    });
  });
});

// let compra = document.getElementById("compra");
// form.addEventListener("submit", function (e) {
//   if (!form.checkValidity()) {
//     e.preventDefault();
//     e.stopPropagation();
//   }

//   let numeroTarjeta = document.getElementById("numeroTarjeta").value;

//   let codigoSeguridad = document.getElementById("codigoSeguridad").value;

//   let vencimiento = document.getElementById("vencimiento").value;

//   let numeroBanco = document.getElementById("numeroBanco").value;

//   if (form.checkValidity()) {
//     Swal.fire({
//       title: "¡Ya puede realizar la compra!",
//       icon: "success",
//       showConfirmButton: false,
//       timer: 1500,
//     });
//     compra += 'data-bs-toggle="modal"';
//     compra.classList.add("was-validated");
//   }

//   let evento = ["change", "input"];

//   evento.forEach((e) => {
//     document.form.addEventListener(e, validation);
//   });
// });

function showCartList() {
  let htmlProductsToAppend = "";
  let total = 0;

  getJSONData(cart_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      cartObj = resultObj.data.articles[0];

      htmlProductsToAppend += `<div class="row align-items-center">
      <!--ROW CON EL CONTENIDO DE LOS PRODUCTOS-->
      <div class="col-md-2 col-lg-2 col-xl-2">
      <img src='${cartObj.image}' class="img-fluid rounded-3">
      </div>
      <!--IMÁGEN-->
      <div class="col-md-2 d-flex justify-content-center">
        <div>
          <p id="name" class="lead fw-normal mb-0">${cartObj.name}</p>
        </div>
      </div>
      <!--COL NOMBRE DEL PRODUCTO-->
      <div class="col-md-2 d-flex justify-content-center">
        <div>
          <!--CANTIDAD-->
          <span class="lead fw-normal mb-0 col-lg-4 col-xl-4">
          <input name="quantity" id="${
            cartObj.id
          }" min="1" value="1" onchange="subtotalTotal(${cartObj.unitCost}, ${
        cartObj.id
      })" type="number"
          class="form-control form-control-sm">          </span>
          <!--FUNCIONALIDAD-->
        </div>
      </div>
      <!--COL MMM-->
      <div class="col-md-2 d-flex justify-content-center">
        <div>
          <p name="currency" class="lead fw-normal mb-0"><span>${
            cartObj.currency
          }</span></p>
        </div>
      </div>
      <!--MONEDA/CURRENCY-->
      <div class="col-md-2 d-flex justify-content-center">
        <div>
          <p name="cost" class="lead fw-normal mb-0">${cartObj.unitCost}</p>
        </div>
      </div>
      <!--PRECIO-->
      <div class="col-md-1 d-flex justify-content-center">
        <div>
          <p id=${
            "subtotal" + cartObj.id
          } name="subtotal" class="lead fw-normal mb-0">${cartObj.unitCost}</p>
        </div>
      </div>
      <!--SUBTOTAL-->
      <div class="col-md-1 d-flex justify-content-center delete">
        <div>
          <a href="#!" class="text-danger"><i id="clean" class="fas fa-trash fa-lg"></i></a>
        </div>
      </div>
      <!--PAPELERA-->
      </div>
      <br>`;

      total +=
        parseFloat(resultObj.data.articles.unitCost) *
        parseFloat(resultObj.data.articles.quantity);
    }

    document.getElementById("cartItems").innerHTML = htmlProductsToAppend;

    let array = JSON.parse(localStorage.getItem("CartItems"));

    for (i = 0; i <= array.length - 1; i++) {
      let product_Info_URL = PRODUCT_INFO_URL + array[i] + EXT_TYPE;

      getJSONData(product_Info_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
          let productInfo = resultObj.data;

          htmlProductsToAppend += `<div class="row align-items-center">
      <!--ROW CON EL CONTENIDO DE LOS PRODUCTOS-->
      <div class="col-md-2 col-lg-2 col-xl-2">
                    <img src="${
                      productInfo.images[0]
                    }" class="img-fluid rounded-3">
                </div>
      <!--IMÁGEN-->
      <div class="col-md-2 d-flex justify-content-center">
        <div>
          <p id="name" class="lead fw-normal mb-0">${productInfo.name}</p>
        </div>
      </div>
      <!--COL NOMBRE DEL PRODUCTO-->
      <div class="col-md-2 d-flex justify-content-center">
        <div>
          <!--PÁRRAFO-->
          <span class="lead fw-normal mb-0 col-lg-4 col-xl-4">
          <input name="quantity" id="${
            productInfo.id
          }" min="1" value="1" onchange="subtotalTotal(${productInfo.cost}, ${
            productInfo.id
          })" type="number"
          class="form-control form-control-sm"></span>
          <!--FUNCIONALIDAD-->
        </div>
      </div>
      <!--COL CANTIDAD-->
      <div class="col-md-2 d-flex justify-content-center">
        <div>
          <p name="currency" class="lead fw-normal mb-0">${
            productInfo.currency
          }</p>
        </div>
      </div>
      <!--MONEDA/CURRENCY-->
      <div class="col-md-2 d-flex justify-content-center">
        <div>
          <p name="cost" class="lead fw-normal mb-0">${productInfo.cost}</p>
        </div>
      </div>
      <!--PRECIO-->
      <div class="col-md-1 d-flex justify-content-center">
        <div>
          <p id=${
            "subtotal" + productInfo.id
          } name="subtotal" class="lead fw-normal mb-0">${productInfo.cost}</p>
          </div>
      </div>
      <!--SUBTOTAL-->
      <div class="col-md-1 d-flex justify-content-center">
      <div>
      <a href="#!" class="text-danger delete"><i id="clean" class="fas fa-trash fa-lg"></i></a>
      </div>
      </div>
      <!--PAPELERA-->
      </div>
      <br>`;

          // document
          //   .getElementById("clean")
          //   .addEventListener("click", function () {
          //     array = JSON.parse(localStorage.getItem("CartItems"));
          //     array = array.remove(document
          //       .getElementById("clean")
          //     );
          //     console.log(productInfo);
          //     localStorage.setItem("CartItems", json.stringify(array));
          //     showCartList();
          //   });
        }
        document.getElementById("cartItems").innerHTML = htmlProductsToAppend;
      });
      //CIERRE DEL RESULT OBJ DE PRODINFO
    }
    //CIERRE DEL FOR
    //TODO:: total = dibujar total + guardar en localStorage + SUMAR VALOR DEL COSTO DE ENVIO
  });
  //CIERRE DE LO QUE PASA DENTRO DEL getJSONData DE PRODINFO
}
//CIERRE DEL SHOWCARTLIST

function subtotalTotal(unitCost, id) {
  let value = document.getElementById(id).value;
  let subtotalProd = unitCost * value;
  document.getElementById("subtotal" + id).innerHTML = subtotalProd;

  let currencyUSD = document.getElementsByName("currency");

  let sumaSubtotal = document.getElementsByName("subtotal");
  for (let i = 0; i < sumaSubtotal.length; i++) {
    let arrayCurrency = currencyUSD[i].innerHTML;
    let subNum = parseFloat(sumaSubtotal[i].innerHTML);

    if (arrayCurrency.includes("UY")) {
      plus = plus + subNum / 40;
    } else {
      plus += subNum;
    }
  }
  document.getElementById("subt").innerHTML = Math.round(plus);
  plus = 0;

  let sentCost = 0;
  let plus2 = 0;
  document.getElementById("radioNoLabel1v").addEventListener("click", () => {
    plus2 = document.getElementById("subt").innerHTML;
    sentCost = plus2 * 0.15;
    document.getElementById("costoEnvio").innerHTML = Math.round(sentCost);
    total();
  });

  document.getElementById("transferencia").addEventListener("click", () => {
    plus2 = document.getElementById("subt").innerHTML;
    sentCost = plus2 * 0.07;
    document.getElementById("costoEnvio").innerHTML = Math.round(sentCost);
    total();
  });

  document.getElementById("radioNoLabel3v").addEventListener("click", () => {
    plus2 = document.getElementById("subt").innerHTML;
    sentCost = plus2 * 0.05;
    document.getElementById("costoEnvio").innerHTML = Math.round(sentCost);
    total();
  });
}

function total() {
  let total = 0;
  total =
    parseFloat(document.getElementById("costoEnvio").innerHTML) +
    parseFloat(document.getElementById("subt").innerHTML);
  document.getElementById("total").innerHTML = total;
}

// deleteHtml = document.getElementById(
//   `delete_${id}`
// ).innerHTML;

// if (numeroBanco.disabled == false && numeroBanco.value !== null) {
//   let objTransferencia = {
//     NumeroBanco: numeroBanco.value,
//   };
//   localStorage.setItem("metodoDePago", "transferencia");
//   localStorage.setItem("datosDePago", JSON.stringify(objTransferencia));
//   Swal.fire({
//     title: "Este producto ya se encuentra cargado en el carrito",
//     icon: "success",
//     showConfirmButton: false,
//     timer: 4000,
//   });
// } else {
//   if (numeroBanco.disabled == false) {
//     alert("Debe completar datos.");
//   }
// }

// if (
//   numeroTarjeta.disabled == false &&
//   numeroTarjeta.value !== null &&
//   codigoSeguridad.value !== null &&
//   vencimiento.value !== null
// ) {
//   let objTransferencia = {
//     NumeroTarjeta: numeroTarjeta.value,
//     Vencimiento: vencimiento.value,
//     CodigoSeguridad: codigoSeguridad.value,
//   };
//   localStorage.setItem("metodoDePago", "credito");
//   localStorage.setItem("datosDePago", JSON.stringify(objTransferencia));
//   Swal.fire({
//     title: "Este producto ya se encuentra cargado en el carrito",
//     icon: "success",
//     showConfirmButton: false,
//     timer: 4000,
//   });
// }
