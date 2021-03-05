'use strict';

class GoodsItem {
    constructor(title, price, image) {
        this.title = title;
        this.price = price;
        this.image = image;
    }
    render() {
        return `
            <div class="block__item">
                <div class="block__img">
                    <img src="${this.image}" alt="${this.title}">
                    <div class="block__item-hover">
                        <a href="#">
                           <i class="block__cart-icon"></i>
                            <span>Add to Cart</span>
                        </a>
                    </div>
                </div>
                <a href="#">
                    <h4 class="block__title">${this.title}</h4>
                </a>
                <p class="block__prise">$${this.price}</p>
            </div>    
        `;
    }
}

class GoodsList {
    constructor() {
        this.goods = [];
    }
    fetchGoods() {
        this.goods = [
            { id: 1, title: 'Mango People T-shirt', price: 42, image: 'image/catalog/product9.jpg' },
            { id: 2, title: 'Yellow People T-shirt', price: 32, image: 'image/catalog/product8.jpg' },
            { id: 3, title: 'Green People T-shirt', price: 22, image: 'image/catalog/product7.jpg' },
            { id: 4, title: 'Blue People T-shirt', price: 152, image: 'image/catalog/product6.jpg' },
            { id: 5, title: 'White People T-shirt', price: 62, image: 'image/catalog/product13.jpg' },
            { id: 6, title: 'Brown People T-shirt', price: 42, image: 'image/catalog/product14.jpg' },
            { id: 7, title: 'Orange People T-shirt', price: 72, image: 'image/catalog/product3.jpg' },
            { id: 8, title: 'red People T-shirt', price: 12, image: 'image/catalog/product12.jpg' },
            { id: 9, title: 'Pink People T-shirt', price: 52, image: 'image/catalog/product1.jpg' },
        ];
    }
    render() {
        let listHtml = '';
        this.goods.forEach(good => {
          const goodItem = new GoodsItem(good.title, good.price, good.image);
          listHtml += goodItem.render();
        });
        document.querySelector('.product__block').innerHTML = listHtml;
    }

    //метод для подсчета суммы всех товаров класса GoodsList
    totalPrice() {
        let totalPrice = 0;
        this.goods.forEach (goods => { 
            totalPrice += goods.price;
        });

        this.totalPrice = totalPrice;
        console.log(this.totalPrice);
    }
}

class BasketItem {
    constructor(id, title, price, image, count) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.image = image;
        this.count = count;
    }
    countItems() {
        //метод для подсчета количества именно этого товара в карзине
    }
    render() {
        return `
            <div class="cart-togle__item">
                <img src="${this.image}" alt="${this.title}" class="cart-togle__image">
                <div class="cart-togle__cont">
                    <div class="h3 cart-togle__title">${this.title}</div>
                    <div class="cart-togle__atr">
                        <div class="cart-togle__count">${this.count}</div>
                        <div class="cart-togle__prise">$${this.price}</div>
                    </div>
                </div>
                <div class="cart-togle__close">
                    <div class="cart-togle__close-icon">x</div>
                </div>
            </div>  
        `;
    }
}

class BasketList {
    constructor() {
        this.goods = [];
    }
    addItem(id, title, price, image, count) {

        //метод для добавления товара в корзину

        const goodItem = new GoodsItem(id, title, price, image, count);
        this.goods.push(goodItem);
    }
    deleteItem () {
        //метод для удаления товара из карзины
    }
    fetchData() {
        //метод для запроса данных с сервера
    }
    render() {
        //метод для отрисовки карзины
    }

    //метод для подсчета суммы всех товаров в корзине
    totalPrice() {
        let totalPrice = 0;
        this.goods.forEach (goods => { 
            totalPrice += goods.price;
        });

        document.querySelector('.cart-togle__prise').innerHTML = `$${totalPrice}`;
    }

    countItem() {
        //метод для подсчета количества товаров в карзине
    }
}

const list = new GoodsList();
list.fetchGoods();
list.render();
list.totalPrice();

document.querySelector('.top-cart').onclick = function() {
    var div = document.querySelector('.cart-togle');
    if(div.style.display == 'block') {
        div.style.display = 'none';
    }
    else {
        div.style.display = 'block';
    }
};