'use strict';

const API_ROOT = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';


 
const request = (path = '', method = 'GET', body) => {
    
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    console.log({ response: xhr.responseText });
                    resolve(JSON.parse(xhr.responseText));
                } else {
                    reject(xhr.responseText);
                }
            }
        };
        
        xhr.open(method, `${API_ROOT}/${path}`);
        
        xhr.send(body);
    })
}

class GoodsItem {   // товар
    constructor(item){
        this.item = item;
    }

    render (a) { return `
        <div class="goods-item">
            <h3>${this.item.product_name}</h3>
            <p>${this.item.price}$</p>
            <button class="product-button" type="button" data="${a}">Добавить</button>
        </div>`;
    }

}

class GoodsList {   // список товаров
    constructor(basket) {
        this.goods = [];
        this.basket = basket;
        this.filteredGoods = [];

        document.querySelector('.search').addEventListener('input', (event) => {
            this.filterGoods(event.target.value);
        });
    }

    fetchData() {
        return new Promise((resolve, reject) => {
            request('catalogData.json')
            .then( (goods) => {
                this.goods = goods;
                this.filteredGoods = goods;
                console.log(this.goods);
                resolve();
            })
            .catch((error) => {
                console.log(error);
                reject(error);
            })
           
    });
    }

    fetchGoods()  {
        this.goods = [
            { title: 'Shirt', price: 150 },
            { title: 'Socks', price: 50 },
            { title: 'Jacket', price: 350 },
            { title: 'Shoes', price: 250 },
        ];
    }

    render() {  // отрисовка списка товаров
        let listHtml = '';
        let counter = 0;
        this.filteredGoods.forEach(good => {
            const goodItem = new GoodsItem(good);
            listHtml += goodItem.render(counter);
            ++counter;
        });
        
        let goodsList = document.querySelector('.goods-list');
        goodsList.innerHTML = listHtml;
        goodsList.addEventListener('click',(event) => {basket.goodsToBasket(event)
        });        
    }

    filterGoods(searchValue) {
        const regexp = new RegExp(searchValue, 'i');
        this.filteredGoods = this.goods.filter((goodsItem) => regexp.test(goodsItem.product_name));
        this.render();
    }
    
}

class Basket {  // корзина
    constructor() {
        this.goods = [];
        this.price = 0;
        this.quantity = 0;
        this.open = false;
        this.bask = {};
    }

    countBasketPrice() {   // подсчет стоимости товара в корзине
        const total = {
            price: 0,
            quantity: 0,
        }
        this.goods.forEach(good => {
            total.price += good.price * good.quantity;
            total.quantity += good.quantity;
        });
        this.price = total.price;
        this.quantity = total.quantity;
       //console.log(this);
    }

    buttonClik() {  // клик по кнопке корзина
       
        request('getBasket.json')
            .then( (goods) => {
                this.goods = goods.contents;
                console.log(this.goods);
                if (!this.open) {
                    this.open = true;
                    this.render();
                    document.querySelector('.cart-button-counter').style.display='none';
                } else {
                    this.open = false;
                    document.querySelector('.basket').innerHTML = ""; 
                    document.querySelector('.cart-button-counter').style.display='block';
                    this.renderQuantity(); // отрисовка колличества товаров на кнопке
                }
            })
            .catch((error) => {
                console.log(error);
            });
       
    }

    render() {   // отрисовка корзины
        let listHtml = '';
        let counter = 1;
        this.goods.forEach(good => {
            console.log(good);
            const goodItem = new GoodsBasket(good);
            listHtml += goodItem.render(counter);
            counter++;
        });

        this.countBasketPrice(); 
        document.querySelector('.basket').innerHTML = "";  
        
        listHtml += this.renderTotal(); //добавление в разметку общего количества и стоимости

        document.querySelector('.basket').insertAdjacentHTML("afterbegin", listHtml);
        document.querySelector('.basket').addEventListener('click',(event) => {basket.goodsRemoveBasket(event)});
        
       
    }
    
    // отрисовка количества товаров и общей стоимости товаров в корзине
    renderTotal() {
        let listHtml;
        if (this.quantity===0){
            listHtml = `
            <div class="basket-item">
                <p> Корзина пуста </p>
            </div>`;
        } else {
            listHtml = `
            <div class="basket-item">
                <p> В корзине ${this.quantity} шт. на сумму ${this.price}$ </p>
            </div>`;
        }
        return listHtml;
    }

    renderQuantity() {      // отрисовка колличества товаров в корзине на кнопке
        document.getElementById('basket_count').innerHTML = this.quantity;
    }

    goodsToBasket(event) {      // добавление товара в корзину
       
        let count = event.target.getAttribute('data');
        if (count === null) return;
        request('addToBasket.json').then( (goods) => {
           
            console.log(goods);
            let productName = list.goods[count].product_name;
            
            for (let goods of this.goods){
                if (goods.product_name === productName) {  // если добавленный товар есть в корзине
                    ++goods.quantity;                      // увеличиваем кол-во штук в корзине
                                    
                    this.setOfProcessingBasket();
                    
                    return;
                } 
            }
    
            this.goods.push(list.goods[count]);
            this.goods[this.goods.length-1].quantity = 1;
            
            this.setOfProcessingBasket();

            
        }, (error) => {
               console.log(error);
        });

    }
    
    setOfProcessingBasket() {  // набор функций для обработки корзины
        this.countBasketPrice(); // обсчет стоимости и количества товаров в корзине
        if (!this.open) this.renderQuantity();  // отрисовка количества товаров на кнопке
        if (this.open) { 
            this.render();  // отрисовка наполнения корзины
            this.renderTotal(); // отрисовка количества товаров
        }
    }

    goodsRemoveBasket(event){      // удалить товар из корзины
        let count = event.target.getAttribute('data');
        
        if (count === null) return;
        request('deleteFromBasket.json ').then( (goods) => {
            console.log(goods);
        }, (error) => {
               console.log(error);
        });
    }

}

class GoodsBasket {   // товар для корзины
   constructor(it) {
    this.item = it;
        
    }

    render(a) { return `
        <div class="basket-item">
            <h3>${this.item.product_name}</h3>
            <p>${this.item.price}$</p>
            <p>${this.item.quantity}</p>
            <button class="basket-button" type="button" data="${a}">x</button>
        </div>`;
    }

}

const basket = new Basket();
const list = new GoodsList(basket);

list.fetchData()
    .then(() => {
        list.render();
    });



