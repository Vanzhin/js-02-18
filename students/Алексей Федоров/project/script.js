'use strict';

const API_ROOT = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

/*
const request = (path = '', callback, method = 'GET', body) => {
    const xhr = new XMLHttpRequest();
    
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                console.log({ response: xhr.responseText });
                callback(JSON.parse(xhr.responseText));
            } else {
                console.error(xhr.responseText);
            }
        }
    }
    
    xhr.open(method, `${API_ROOT}/${path}`);
    
    xhr.send(body);
}*/
 
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
    constructor(title, price){
        this.product_name = title;
        this.price = price;
    }

    render (a) { return `
        <div class="goods-item">
            <h3>${this.product_name}</h3>
            <p>${this.price}$</p>
            <button class="product-button" type="button" data="${a}">Добавить</button>
        </div>`;
    }

}

class GoodsList {   // список товаров
    constructor() {
        this.goods = [];
    }

    fetchData() {
        request('catalogData.json').then( (goods) => {
            return new Promise((resolve, reject) => {
                this.goods = goods;
                console.log(this.goods);
                resolve();
            });
            
        }, (error) => {
               console.log(error);
        }).then(() => {
            this.render();
        })
       
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
        this.goods.forEach(good => {
            const goodItem = new GoodsItem(good.product_name, good.price);
            listHtml += goodItem.render(counter);
            ++counter;
        });
        
        let goodsList = document.querySelector('.goods-list');
        goodsList.innerHTML = listHtml;
        goodsList.addEventListener('click',(event) => {basket.goodsToBasket(event)
        });        
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
       
        request('getBasket.json').then( (goods) => {
            this.bask = goods;
            console.log(this.bask);
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
        }, (error) => {
            console.log(error);
        });
       /*
       */
    }

    render() {   // отрисовка корзины
        let listHtml = '';
        let counter = 1;
        this.bask.contents.forEach(good => {
            const goodItem = new GoodsBasket(good.product_name, good.price, good.quantity);
            listHtml += goodItem.render(counter);
            counter++;
        });

        this.countBasketPrice(); 
        document.querySelector('.basket').innerHTML = "";  
        
        listHtml += this.renderTotal(); //добавление в разметку общего количества и стоимости

        document.querySelector('.basket').insertAdjacentHTML("afterbegin", listHtml);
        document.querySelector('.basket').addEventListener('click',(event) => {basket.goodsRemoveBasket(event)});
        
        /*
        this.goods.forEach(good => {
            const goodItem = new GoodsBasket(good.product_name, good.price, good.quantity);
            //goodItem.quantity(good.quantity);
            listHtml += goodItem.render();
        });
        this.countBasketPrice(); 
        document.querySelector('.basket').innerHTML = "";  
        
        listHtml += this.renderTotal(); //добавление в разметку общего количества и стоимости

        document.querySelector('.basket').insertAdjacentHTML("afterbegin", listHtml);
        */
    }
    
    // отрисовка количества товаров и общей стоимости товаров в корзине
    renderTotal() {
        let listHtml;
        if (this.bask.countGoods===0){
            listHtml = `
            <div class="basket-item">
                <p> Корзина пуста </p>
            </div>`;
        } else {
            listHtml = `
            <div class="basket-item">
                <p> В корзине ${this.bask.countGoods} шт. на сумму ${this.bask.amount}$ </p>
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
           
           
            
           // let count = event.target.getAttribute('data');
           // if (count === null) return;
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

class GoodsBasket extends GoodsItem {   // товар для корзины
   constructor(product_name,price,quantity){
        super(product_name,price);
        this.quantity = quantity;
    }

    render(a) { return `
        <div class="basket-item">
            <h3>${this.product_name}</h3>
            <p>${this.price}$</p>
            <p>${this.quantity}</p>
            <button class="basket-button" type="button" data="${a}">x</button>
        </div>`;
    }

}

const basket = new Basket();
const list = new GoodsList();

list.fetchData();



