"use strict";
class CCart {
    items = [];
    catalog = [];
    html = {};
    stat = {
        products: 0,
        count: 0,
        grand_total: 0
    };
    constructor(cat, init = []) {
        let tmp = document.getElementById("cartSmall");
        if (null !== tmp) {
            this.html["small"] = new CCartSmallHTML(tmp, this);
        }
        tmp = document.getElementById("cartBig");
        if (null !== tmp) {
            this.html["big"] = new CCartBigHTML(tmp, this);
        }
        this.items = init;
        this.catalog = cat;
        this.updateStat();
        for (let html of Object.values(this.html)) {
            html.clear();
            html.listFillByItems();
        }
    }
    parseData(_obj) {
        let item = _obj.closest("[data-catalog-item][data-catalog-item-t]");
        if (item) {
            return { id: parseInt(item.getAttribute("data-catalog-item")), t: parseInt(item.getAttribute("data-catalog-item-t")) }
        }
        return undefined;
    }
    updateStat() {
        this.stat = {
            products: 0,
            count: 0,
            grand_total: 0
        };
        for (let item of Object.values(this.items)) {
            let cat = this.catalog.find(obj => { return obj.id === item.id });
            if (cat) {
                this.stat.grand_total += cat.type[item.type].price * item.quantity;
                this.stat.count += item.quantity;
                this.stat.products++;
            }
        }
        for (let html of Object.values(this.html)) {
            html.updateStat();
        }
        return this.stat;
    }
    addAct(_obj) {
        let item;
        if ((item = this.parseData(_obj)) !== null) {
            return this.addItem(item.id, item.t);
        }
        return false;
    }
    addItem(_id, _t = 0, _q = 1) {
        if (!this.incItem(_id, _t)) {
            this.items.push({
                "id": _id,
                "type": _t,
                "quantity": _q
            });
            this.updateStat();
            for (let html of Object.values(this.html)) {
                html.addItem(_id, _t, _q);
            }
        }
        return true;
    }

    incItem(_id, _t) {
        let item = this.items.find(obj => { return (obj.id === _id && obj.type === _t) });
        if (item) {
            item.quantity++;
            this.updateStat();
            for (let html of Object.values(this.html)) {
                html.updateItem(_id, _t, item.quantity);
            }
            return true;
        }
        return false;
    }

    decItem(_id, _t) {
        let item = this.items.find(obj => { return (obj.id === _id && obj.type === _t) });
        if (item) {
            if (1 < item.quantity) {
                item.quantity--;
                for (let html of Object.values(this.html)) {
                    html.updateItem(_id, _t, item.quantity);
                }
            } else {
                this.items.splice(this.items.findIndex(obj => (obj.id === _id && obj.type === _t)), 1)
                for (let html of Object.values(this.html)) {
                    html.removeItem(_id, _t);
                }
            }
            this.updateStat();
            return true;
        }
        return false;
    }

    removeItem(_id, _t) {
        let item = this.items.find(obj => { return (obj.id === _id && obj.type === _t) });
        if (item) {
            this.items.splice(this.items.findIndex(obj => (obj.id === _id && obj.type === _t)), 1);
            for (let html of Object.values(this.html)) {
                html.removeItem(_id, _t);
            }
            this.updateStat();
            return true;
        }
        return false;
    }
    updateItem(_id, _t, _val) {
        if (0 > _val) {
            _val = 0;
        }
        let item = this.items.find(obj => { return (obj.id === _id && obj.type === _t) });
        if (item) {
            item.quantity = _val;
            this.updateStat();
            for (let html of Object.values(this.html)) {
                html.updateItem(_id, _t, _val);
            }
            return true;
        }
        return false;
    }
    clear() {
        this.items = {};
        this.updateStat();
        for (let html of Object.values(this.html)) {
            html.clear();
        }
    }
}
class CCartSmallHTML {
    html = null;
    cart = {};
    list = null;
    count = null;
    grand_total = null;
    attrs = { item: "data-cartsmall-item", type: "data-cartsmall-item-t" }
    constructor(obj, cart) {
        if (null !== obj) {
            this.html = obj;
            this.cart = cart;
            this.list = this.html.getElementsByClassName("btn-cart__ddc-list")[0];
            this.count = this.html.getElementsByClassName("btn-cart__count")[0];
            this.grand_total = this.html.getElementsByClassName("total-grand-summ")[0];
        } else {
            return null;
        }
    }
    parseData(_obj) {
        let item = _obj.closest(`[${this.attrs.item}][${this.attrs.type}]`);
        if (item) {
            return { id: parseInt(item.getAttribute(this.attrs.item)), t: parseInt(item.getAttribute(this.attrs.type)) }
        }
        return undefined;
    }
    itemGen(_obj) {
        return (_obj ? `<li ${this.attrs.item}="${_obj.id}" ${this.attrs.type}="${_obj.type}" class="btn-cart__ddc-item">
                        <div class="col"><a href="#"><img src="${_obj.img}" alt=""></a></div>
                        <div class="col">
                            <p>${_obj.name}</p>
                            <p>${startGen(_obj.star)}</p>
                            <div>
                                <p class="price-count">${_obj.quantity} <span class="x-txt">x</span> $${float2str(_obj.price)}</p>
                                <p class="sub-total clear-fix"> = $${float2str(_obj.price * _obj.quantity)}</p>
                            </div>
                        </div>
                        <div class="col">
                            <a href="cart/incItem/${_obj.id}/${_obj.type}" onclick="cart.html['small'].incAct(this);return false;">
                                <i class="fas fa-plus-circle"></i>
                            </a>
                            <a href="cart/removeItem/${_obj.id}/${_obj.type}" onclick="cart.html['small'].removeAct(this);return false;">
                                <i class="fa fa-times-circle"></i>
                            </a>
                            <a href="cart/decItem/${_obj.id}/${_obj.type}" onclick="cart.html['small'].decAct(this);return false;">
                                <i class="fas fa-minus-circle"></i>
                            </a>
                        </div>
                    </li>` : null);
    }
    clear() {
        this.list.innerHTML = '';
    }
    updateStat() {
        this.count.innerText = this.cart.stat.count;
        this.grand_total.innerText = `$${float2str(this.cart.stat.grand_total)}`;
        if (0 < this.cart.stat.count) {
            this.count.style.display = "block";
        } else {
            this.count.style.display = "none";
        }
    }
    addAct(_obj) {
        let item;
        if ((item = this.parseData(_obj)) !== null) {
            return this.cart.addItem(item.id, item.t);
        }
        return false;
    }
    decAct(_obj) {
        let item;
        if ((item = this.parseData(_obj)) !== null) {
            return this.cart.decItem(item.id, item.t);
        }
        return false;
    }
    incAct(_obj) {
        let item;
        if ((item = this.parseData(_obj)) !== null) {
            return this.cart.incItem(item.id, item.t);
        }
        return false;
    }
    addItem(_id, _t = 0, _q = 1) {
        const regex = /(\..+$)/gm;
        let item = this.cart.catalog.find(obj => { return obj.id === _id });
        if (item) {
            this.list.insertAdjacentHTML('beforeend', this.itemGen({
                id: _id,
                type: _t,
                quantity: _q,
                name: item.name,
                star: item.type[_t].star,
                img: item.type[_t].img.replace(regex, '_small.png'),
                price: item.type[_t].price
            }));
        }
    }
    removeAct(_obj) {
        let item;
        if ((item = this.parseData(_obj)) !== null) {
            return this.cart.removeItem(item.id, item.t);
        }
        return false;
    }
    removeItem(_id, _t = 0) {
        this.html.querySelector(`[${this.attrs.item}='${_id}'][${this.attrs.type}='${_t}']`).remove();
    }
    listFillByItems() {
        for (let item of Object.values(this.cart.items)) {
            this.addItem(item.id, item.type, item.quantity);
        }
    }
    redraw(_obj) {
        this.clear();
        this.listFillByItems();
    }
    updateAct(_obj) {
        let item;
        if ((item = this.parseData(_obj)) !== null) {
            return this.cart.updateItem(item.id, item.t, 1);
        }
        return false;
    }
    updateItem(_id, _t) {
        let price = this.cart.catalog.find(obj => { return obj.id === _id })
        if (price) {
            price = price.type[_t].price;
            let item = this.html.querySelector(`[${this.attrs.item}='${_id}'][${this.attrs.type}='${_t}']`);
            let cart = this.cart.items.find(obj => { return (obj.id === _id && obj.type === _t) });
            if (cart) {
                item.getElementsByClassName("price-count")[0].innerHTML = `${cart.quantity} <span class="x-txt">x</span> $${price}`;
                item.getElementsByClassName("sub-total")[0].innerText = ` = $${float2str(price * cart.quantity)}`;
                return true;
            }
        }
        return false;
    }

}
class CCartBigHTML {
    html = null;
    cart = {};
    list = null;
    count = null;
    grand_total = null;
    attrs = { item: "data-cartbig-item", type: "data-cartbig-item-t" }
    constructor(obj, cart) {
        if (null !== obj) {
            this.html = obj;
            this.cart = cart;
            this.list = this.html.getElementsByClassName("table-footer")[0];
            let cart_obj = document.getElementById("form-shipping");
            this.count = cart_obj.getElementsByClassName("total-grand")[0];
            this.grand_total = cart_obj.getElementsByClassName("total-sub")[0];
        } else {
            return null;
        }
    }
    parseData(_obj) {
        let item = _obj.closest(`[${this.attrs.item}][${this.attrs.type}]`);
        if (item) {
            return { id: parseInt(item.getAttribute(this.attrs.item)), t: parseInt(item.getAttribute(this.attrs.type)) }
        }
        return undefined;
    }
    itemGen(_obj) {
        return `      <div ${this.attrs.item}="${_obj.id}" ${this.attrs.type}="${_obj.type}" class="product-item table-line">
                            <div class="table-line__wrap">
                                <div class="table-line-item table-line-item-prod">
                                    <div class="col"><a href="" class="item-img"><img src="${_obj.img}" alt=""></a></div>
                                    <div class="col">
                                        <h3>Mango People T-shirt</h3>
                                        <p><span class="item-title">
                                                Color:</span> ${_obj.color}</p>
                                        <p><span class="item-title">Size:</span> ${_obj.size}</p>
                                    </div>
                                </div>
                                <div class="table-line-item table-line-item-price">$${_obj.price}</div>
                                <div class="table-line-item table-line-item-quant"><input class="item-quant" type="number" value="${_obj.quantity}" onchange="cart.html['big'].updateAct(this);return false;" onblur="cart.html['big'].updateAct(this);return false;" min="0"></div>
                                <div class="table-line-item table-line-item-ship">FREE</div>
                                <div class="table-line-item table-line-item-subt">$${float2str(_obj.price * _obj.quantity)}</div>
                                <div class="table-line-item table-line-item-act"><a href="cart/removeItem/${_obj.id}/${_obj.type}" onclick="cart.html['big'].removeAct(this);return false;"><i class="fa fa-times-circle"></i></a></div>
                            </div>
                        </div>`;
    }
    clear() {
        Array.from(this.html.getElementsByClassName("product-item")).forEach(element => element.remove());
    }
    updateStat() {
        this.count.innerText = `$${float2str(this.cart.stat.grand_total)}`;
        this.grand_total.innerText = `$${float2str(this.cart.stat.grand_total)}`;
    }
    addAct(_obj) {
        let item;
        if ((item = this.parseData(_obj)) !== null) {
            return this.cart.addItem(item.id, item.t);
        }
        return false;
    }
    decAct(_obj) {
        let item;
        if ((item = this.parseData(_obj)) !== null) {
            return this.cart.decItem(item.id, item.t);
        }
        return false;
    }
    incAct(_obj) {
        let item;
        if ((item = this.parseData(_obj)) !== null) {
            return this.cart.incItem(item.id, item.t);
        }
        return false;
    }
    addItem(_id, _t = 0, _q = 1) {
        const regex = /(\..+$)/gm;
        let item = this.cart.catalog.find(obj => { return obj.id === _id });
        this.list.insertAdjacentHTML('beforebegin', this.itemGen({
            id: _id,
            type: _t,
            quantity: _q,
            name: item.name,
            star: item.type[_t].star,
            img: item.type[_t].img.replace(regex, '_small.png'),
            price: item.type[_t].price
        }));
    }
    removeAct(_obj) {
        let item;
        if ((item = this.parseData(_obj)) !== null) {
            return this.cart.removeItem(item.id, item.t);
        }
        return false;
    }
    removeItem(_id, _t = 0) {
        this.html.querySelector(`[${this.attrs.item}='${_id}'][${this.attrs.type}='${_t}']`).remove();
    }
    listFillByItems() {
        for (let item of Object.values(this.cart.items)) {
            this.addItem(item.id, item.type, item.quantity);
        }
    }
    redraw(_obj) {
        this.clear();
        this.listFillByItems();
    }
    updateAct(_obj) {
        let item;
        if ((item = this.parseData(_obj)) !== null) {
            return this.cart.updateItem(item.id, item.t, parseInt(_obj.value));
        }
        return false;
    }
    updateItem(_id, _t) {
        let price = this.cart.catalog.find(obj => { return obj.id === _id })
        if (price) {
            price = price.type[_t].price;
            let item = this.html.querySelector(`[${this.attrs.item}='${_id}'][${this.attrs.type}='${_t}']`);
            let cart = this.cart.items.find(obj => { return (obj.id === _id && obj.type === _t) });
            if (cart) {
                item.getElementsByClassName("item-quant")[0].value = cart.quantity;
                item.getElementsByClassName("table-line-item-subt")[0].innerText = `$${float2str(price * cart.quantity)}`;
                return true;
            }
        }
        return false;
    }
}
