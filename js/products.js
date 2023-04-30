const ORDER_ASC_BY_PRICE = "ASC";
const ORDER_DESC_BY_PRICE = "DESC";
const ORDER_BY_REL = "REL";
let currentProductsArray = [];
let currentSortCriteria = undefined;
let minCount = undefined;
let maxCount = undefined;
let search = undefined;

document.addEventListener("DOMContentLoaded", function (e) {
  let catId = localStorage.getItem("catID");

  let productsURL = PRODUCTS + catId.toString() + ".json";

  getJSONData(productsURL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      currentProductsArray = resultObj.data.products;
      showProductsList();
    }
  });

  document.getElementById("search").addEventListener("input", function () {
    search = document.getElementById("search").value;
    showProductsList();
  });

  document.getElementById("sortAsc").addEventListener("click", function () {
    sortAndShowProducts(ORDER_ASC_BY_PRICE);
  });

  document.getElementById("sortDesc").addEventListener("click", function () {
    sortAndShowProducts(ORDER_DESC_BY_PRICE);
  });

  document.getElementById("sortByCount").addEventListener("click", function () {
    sortAndShowProducts(ORDER_BY_REL);
  });

  document
    .getElementById("clearRangeFilter")
    .addEventListener("click", function () {
      document.getElementById("rangeFilterCountMin").value = "";
      document.getElementById("rangeFilterCountMax").value = "";

      minCount = undefined;
      maxCount = undefined;

      showProductsList();
    });

  document
    .getElementById("rangeFilterCount")
    .addEventListener("click", function () {
      minCount = document.getElementById("rangeFilterCountMin").value;
      maxCount = document.getElementById("rangeFilterCountMax").value;

      if (minCount != undefined && minCount != "" && parseInt(minCount) >= 0) {
        minCount = parseInt(minCount);
      } else {
        minCount = undefined;
      }

      if (maxCount != undefined && maxCount != "" && parseInt(maxCount) >= 0) {
        maxCount = parseInt(maxCount);
      } else {
        maxCount = undefined;
      }

      showProductsList();
    });

  let email = localStorage.getItem("email");
  if (email == null) {
    window.location = "login.html";
  } else {
    document.getElementById("mail-usuario").innerHTML = email;
  }

  document.getElementById("perfil").addEventListener("click", function () {
    window.location = "my-profile.html";
  });

  document.getElementById("carrito").addEventListener("click", function () {
    window.location = "cart.html";
  });

  document
    .getElementById("cerrarSesion")
    .addEventListener("click", function () {
      localStorage.clear();
      window.location = "login.html";
    });
});

function showProductsList() {
  let htmlContentToAppend = "";

  for (let i = 0; i < currentProductsArray.length; i++) {
    let products = currentProductsArray[i];

    if (
      (minCount == undefined ||
        (minCount != undefined && parseInt(products.cost) >= minCount)) &&
      (maxCount == undefined ||
        (maxCount != undefined && parseInt(products.cost) <= maxCount)) &&
      (search == undefined ||
        (search != undefined &&
          products.name.toLowerCase().includes(search.toLowerCase())))
    ) {
      htmlContentToAppend +=
        `
        <div>
        <div onclick="setProdID(${products.id})" class="list-group-item list-group-item-action cursor-active">
            <div class="row">
                    <div class="col-3">
                        <img src="` +
        products.image +
        `" alt="product image" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <div class="mb-1">
                            <h4>` +
        products.name +
        products.currency +
        products.cost +
        `</h4> 
                            <p> ` +
        products.description +
        `</p> 
                            </div>
                            <small class="text-muted">` +
        products.soldCount +
        ` Artículos</small> 
                        </div>
                    </div>
            </div>
        </div>
        `;
    }
    document.getElementById("productsList").innerHTML = htmlContentToAppend;
  }
}

function sortProducts(criteria, array) {
  let result = [];
  if (criteria === ORDER_ASC_BY_PRICE) {
    result = array.sort(function (a, b) {
      if (a.cost < b.cost) {
        return -1;
      }
      if (a.cost > b.cost) {
        return 1;
      }
      return 0;
    });
  } else if (criteria === ORDER_DESC_BY_PRICE) {
    result = array.sort(function (a, b) {
      if (a.cost > b.cost) {
        return -1;
      }
      if (a.cost < b.cost) {
        return 1;
      }
      return 0;
    });
  } else if (criteria === ORDER_BY_REL) {
    result = array.sort(function (a, b) {
      if (a.soldCount > b.soldCount) {
        return -1;
      }
      if (a.soldCount < b.soldCount) {
        return 1;
      }
      return 0;
    });
  }

  return result;
}

function sortAndShowProducts(sortCriteria, productsArray) {
  currentSortCriteria = sortCriteria;

  if (productsArray != undefined) {
    currentProductsArray = productsArray;
  }

  currentProductsArray = sortProducts(
    currentSortCriteria,
    currentProductsArray
  );

  //Muestra las categorías ordenadas
  showProductsList();
}

function setProdID(id) {
  localStorage.setItem("ProdID", id);
  window.location = "product-info.html";
}
