"use strict";
class CPoductCatalogHTML {
    html = null;
    items = [];
    catalog = [];
    constructor(obj, cat, init = []) {
        if (null !== obj) {
            this.html = obj;
            this.catalog = cat;
            this.items = init;
            this.clear();
            this.listFillByItems();
        } else {
            return null;
        }
    }
    clear() {
        this.html.innerHTML = '';
    }
    listFillByItems() {
        this.html.innerHTML = this.items.map(item => this.itemGen(this.catalog.find(obj => { return obj.id === item }))).join('');
    }

    itemGen(_obj,_t = 0) {
        return (_obj ? `<li data-catalog-item="${_obj.id}" data-catalog-item-t="${_t}" class="products-grid_item">
                        <div class="top-block">
                            <!--<img src="${_obj.type[_t].img}" alt="">-->
                            <div class="visible progressive replace" data-href="${_obj.type[_t].img}">
                                <img src="img/tiny.a1.07.jpg" class="preview" alt="image" />                               
                            </div>
                            <div class="hovered">
                                <div class="btn-sqr_adcw"><a href="cart/addItem/${_obj.id}/${_t}" onclick="cart.addAct(this);return false;" class="btn-sqr_adcw__link clear-fix">
                                        <div class="btn-sqr_adcw__wrap"><img src="img/cart_white.png" alt="" class="btn-sqr_adcw__icon"><span class="btn-sqr_adcw__text">Add to Cart</span></div>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <a href="#" class="products-grid_link">
                            <h3>${_obj.name}</h3>
                            <p>$${float2str(_obj.type[_t].price)}</p>
                        </a>
                    </li>` : null);
    }
}
