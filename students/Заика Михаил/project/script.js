const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

function makeGETRequest(url) {
    return new Promise((resolve, reject) => {
        var xhr;
  
        if (window.XMLHttpRequest) {
          xhr = new XMLHttpRequest();
        } else if (window.ActiveXObject) { 
          xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }
      
        //xhr.onreadystatechange = function () {
        xhr.onload = function () {
            if (xhr.readyState === 4) {
                resolve(xhr.responseText);
            }
            else {
                reject('Ошибка получения товаров');
            }
        }
      
        xhr.open('GET', url, true);
        xhr.send();
    });
}


class GoodsItem {
    constructor(id_product, product_name, price){
        this.id_product = id_product;
        this.product_name = product_name;
        this.price = price;
    }

    render (a) { return `
        <div class="item">
            <h2>${this.product_name}</h2>
            <p>${this.price}</p>
            <button class="product-button" type="button" data="${a}">Добавить</button>
        </div>`;
    }
}


class GoodsList {
    constructor() {
        this.goods = [];
    }

    fetchData()  {
        return new Promise((resolve, reject) => {
            makeGETRequest(`${API_URL}/catalogData.json`)
            .then(
                (goodsData) => {
                    this.goods = JSON.parse(goodsData);
                    list.render();
                    resolve();
                }
            )
            .catch((error) => {
                console.log(error);
                reject()
            })
        })
    }

    render() {
        let listHtml = '';
        let counter = 0;
        this.goods.forEach(good => {
            const goodItem = new GoodsItem(good.id_product, good.product_name, good.price);
            listHtml += goodItem.render(counter);
            counter++;
        });
        
        let goodsList=document.querySelector('.goods');
        goodsList.innerHTML = listHtml;
        goodsList.addEventListener('click',(event) => {basket.goodsToBasket(event)
        });
    }
}


class Basket {
    constructor() {
        this.goods = [];
        this.price = 0;
        this.quantity = 0;
        this.open = false;

        const button = document.getElementsByClassName('card-button')[0];
        button.addEventListener('click', () => {
            this.buttonClik();
        });
    }

    fetchData()  {
        makeGETRequest(`${API_URL}/getBasket.json`)
        .then(
            (basketData) => {
                basketData = JSON.parse(basketData)
                basket.goods = basketData.contents;
                basket.quantity = basketData.countGoods;
                basket.renderQuantity();
            }
        )
        .catch((error) => {
            console.log(error);
        })
    }

    countBasketPrice() {
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
    }

    buttonClik() {
        if (!this.open) {
            this.open = true;
            this.render();
            document.querySelector('.cart-button-counter').style.display='none';
        } else {
            this.open = false;
            document.querySelector('.basket').innerHTML = ""; 
            document.querySelector('.cart-button-counter').style.display='block';
            this.renderQuantity();
        }
    }

    render() {
        let listHtml = '';
        this.goods.forEach(good => {
            const goodItem = new GoodsBasket(good.id_product, good.product_name, good.price, good.quantity);
            listHtml += goodItem.render();
        });
        this.countBasketPrice(); 
        document.querySelector('.basket').innerHTML = "";  
        
        listHtml += this.renderTotal();

        document.querySelector('.basket').insertAdjacentHTML("afterbegin", listHtml);
    }
    
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
                <p> В корзине ${this.quantity} шт. на сумму ${this.price} </p>
            </div>`;
        }
        return listHtml;
    }

    renderQuantity() {
        const button = document.getElementsByClassName('card-button')[0];
        if (this.quantity)
            button.innerHTML = `Корзина (${this.quantity})`;
        else
            button.innerHTML = `Корзина`;
    }

    goodsToBasket(event) {
        let count = event.target.getAttribute('data');
        if (count === null) return;
        let productName = list.goods[count].product_name;
        
        for (let goods of this.goods){
            if (goods.product_name === productName) {
                // если добавленный товар есть в корзине, увеличиваем кол-во штук в корзине
                goods.quantity++;
                this.setOfProcessingBasket();
                return;
            } 
        }

        this.goods.push(list.goods[count]);
        this.goods[this.goods.length-1].quantity = 1;
        
        this.setOfProcessingBasket();
    }
    
    setOfProcessingBasket() {
        this.countBasketPrice();
        if (!this.open) this.renderQuantity();
        if (this.open) { 
            this.render();
            this.renderTotal();
        }
    }

    goodsRemoveBasket(num) {

    }
}


class GoodsBasket extends GoodsItem {
   constructor(id_product, product_name, price, quantity) {
        super(id_product, product_name, price);
        this.quantity = quantity;
    }

    render() { return `
        <div class="basket-item">
            <p style="width: 250px;"><b>${this.product_name}</b></p>
            <p style="width: 100px;">${this.price}</p>
            <p style="width: 50px;">${this.quantity}</p>
            <button class="button-remove" type="button"><p>x</p></button>
        </div>`;
    }
}


const list = new GoodsList();
const basket = new Basket();

list.fetchData()
.then(
    () => {
        basket.fetchData();
    }
)
.catch((errMessage) => {
    console.log(errMessage);
})
