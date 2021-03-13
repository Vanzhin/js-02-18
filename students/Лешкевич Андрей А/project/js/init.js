"use strict";

function pageInit() {
  fetch(urlCatalog)
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    })
    .then((response) => {
      if (response.status === 200) {
        prodCatalog = response.catalog;
        fetch(urlCart)
          .then((response) => {
            if (!response.ok) {
              throw Error(response.statusText);
            }
            return response.json();
          })
          .then((response) => {
            if (response.status === 200) {
              cart = new CCart(prodCatalog, response.cart);
            } else {
              throw Error("Cart load error");
            }
          });
        fetch(urlCatalogDisplayed)
          .then((response) => {
            if (!response.ok) {
              throw Error(response.statusText);
            }
            return response.json();
          })
          .then((response) => {
            if (response.status === 200) {
              catalog = new CPoductCatalogHTML(
                document.getElementById("catalog"),
                prodCatalog,
                response.displayed
              );
            } else {
              throw Error("Displayed Catalog load error");
            }
          });
      } else {
        throw Error("Catalog load error");
      }
    })
    .then(() => {
      console.log("All loaded sucsessfly");
    })
    .catch((alert) => console.log(alert));
  let tmp = document.getElementById("slider");
  if (null !== tmp) {
    slider = new CSliderHTML(tmp, [
      "https://picsum.photos/1920/1080?random=1",
      "img/catalog_item_22_big.png",
      "https://picsum.photos/1920/1080?random=2",
    ]);
  }
}

document.addEventListener("DOMContentLoaded", pageInit);
function getURLs() {
  const regex = /(?<=\/)([^\/]*)(\.ht\w+)$/gm;
  let m,
    url = {
      Cart: "api/cart/get/index.json",
      CatalogCashed: "api/catalog/elements/get/all.json",
      CatalogDisplayed: "api/catalog/displayed/get/index.json",
    };
  if ((m = regex.exec(window.location.href)) !== null) {
    switch (m[1]) {
      case "index":
        url.Cart = "api/cart/get/index.json";
        url.CatalogCashed = "api/catalog/elements/get/all.json";
        url.CatalogDisplayed = "api/catalog/displayed/get/index.json";
        break;
      case "Checkout":
        url.Cart = "api/cart/get/checkout.json";
        url.CatalogCashed = "api/catalog/elements/get/all.json";
        url.CatalogDisplayed = "api/catalog/displayed/get/checkout.json";
        break;
      case "Product":
        url.Cart = "api/cart/get/Product.json";
        url.CatalogCashed = "api/catalog/elements/get/Product.json";
        url.CatalogDisplayed = "api/catalog/displayed/get/Product.json";
        break;
      case "Shopping Cart":
        case "Shopping%20Cart":
        url.Cart = "api/cart/get/Shopping Cart.jso";
        url.CatalogCashed = "api/catalog/elements/get/Shopping Cart.jso";
        url.CatalogDisplayed = "api/catalog/displayed/get/Shopping Cart.jso";
        break;
      case "Single Page":
        case "Single%20Page":
        url.Cart = "api/cart/get/Single Page.json";
        url.CatalogCashed = "api/catalog/elements/get/Single Page.json";
        url.CatalogDisplayed = "api/catalog/displayed/get/Single Page.json";
        break;
    }
    return url;
  }
}
console.dir(getURLs());
