const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
//  "http://localhost:3000/cat.json";

const PUBLISH_PRODUCT_URL =
  "https://japceibal.github.io/emercado-api/sell/publish.json";
//  "http://localhost:3000/publish.json";

const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
//  "http://localhost:3000/cats_products/";

const PRODUCTS = "https://japceibal.github.io/emercado-api/cats_products/";
//  "http://localhost:3000/cats_products/";

const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
// "http://localhost:3000/products/";

const PRODUCT_INFO_COMMENTS_URL =
  "https://japceibal.github.io/emercado-api/products_comments/";
// "http://localhost:3000/products_comments/";

const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
//  "http://localhost:3000/user_cart/";

const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
//  "http://localhost:3000/buy.json";

const EXT_TYPE = ".json";

const btnLogOut = document.getElementById("cerrarSesion");

let showSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "block";
};

let hideSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "none";
};

let getJSONData = function (url) {
  let result = {};
  showSpinner();
  return fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then(function (response) {
      result.status = "ok";
      result.data = response;
      hideSpinner();
      return result;
    })
    .catch(function (error) {
      result.status = "error";
      result.data = error;
      hideSpinner();
      return result;
    });
};
