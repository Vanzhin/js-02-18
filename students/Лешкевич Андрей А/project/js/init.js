"use strict";

function pageInit() {
    httpGet(urlCatalog).then(
        response => {
            prodCatalog = response['catalog']
        },
        error => {
            console.log("Catalog load error");
            prodCatalog = []
        }
    ).then(
        httpGet(urlCart).then(
            response => {
                cart = new CCart(prodCatalog, response['cart']);
            },
            error => {
                console.log("Cart load error");
                cart = new CCart(prodCatalog, []);
            }
        )
    ).then(
        
        httpGet(urlCatalogDisplayed).then(
            response => {
                catalog = new CPoductCatalogHTML(document.getElementById("catalog"), prodCatalog, response['displayed']); 
            },
            error => {
                console.log("Catalog Displayed load error");
                catalog = new CPoductCatalogHTML(document.getElementById("catalog"), prodCatalog, []);
            }
        )
        
    );
    let tmp = document.getElementById("slider");
    if (null !== tmp) {
        slider = new CSliderHTML(tmp, ["https://picsum.photos/1920/1080?random=1", "img/catalog_item_22_big.png", "https://picsum.photos/1920/1080?random=2"]);
    }
}
