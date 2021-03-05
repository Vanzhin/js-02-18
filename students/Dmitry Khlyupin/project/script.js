// function makeGetRequest(url, callback) {
//     let xhr;

//     if (window.XMLHttpRequest) {
//         xhr = new XMLHttpRequest();
//     } else if (window.ActiveXObject) {
//         xhr = new ActiveXObject("Microsoft.XMLHTTP");
//     }

//     xhr.onreadystatechange = function () {
//         if (xhr.readyState === 4) {
//             callback(xhr.responseText);
//         }
//     }

//     xhr.open('GET', url, true);
//     xhr.send();
// }


function makeGetRequest(url) {
    return new Promise ((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.send();

        xhr.onreadystatechange = function () {
            if(xhr.readyState === 4) {
                resolve(xhr.responseText);
            } 

        }
        
    });
}

const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';






class GoodsItem {
    constructor (product_name, price) {
        this.product_name = product_name;
        this.price = price;
    }
    render() {
        return `
        <div class="goods-item">
            <h3>
                ${this.product_name}
            </h3>
            <p>
                ${this.price}
            </p>
        </div>
        `;
    }
}

class GoodsList {
    constructor(){
        this.goods = [];
    }

    fetchGoods(callback) {
        makeGetRequest(`${API_URL}/catalogData.json`).then((goods) => {
            this.goods = JSON.parse(goods);
            console.log('Загрузка завершена...')
            callback();
        });
        console.log('Идет загрузка...');
    }

    render() {
        let listHtml = '';
        this.goods.forEach(good => {
            const goodItem = new GoodsItem(good.product_name,good.price);
            listHtml += goodItem.render();
        });

        document.querySelector('.goods-list').innerHTML = listHtml;

        //Добавим вывод стоимости всех товаров на страницу
        document.querySelector('.description').innerHTML = `                                                               
        <p>Стоимость всех товаров равна: ${this.calcFullPrice()} рублей.</p>  
        `;
    }


    // метод возвращающий стоимость всех товаров
    calcFullPrice() {   
        return this.goods.reduce((acc, curr) => {return acc + curr.price}, 0);
    }
}

class Cart {
    constructor() {
        this.goods = [];
    }
    // Опишем методы корзины:
    fetchCart(callback) { // Получение корзины с сервера
        makeGetRequest(`${API_URL}/getBasket.json`).then((goods) => {
            this.goods = JSON.parse(goods);
            console.log('Загрузка завершена...')
            callback();
        });
        console.log('Идет загрузка...');
    }


    renderCart() {  // - метод для отрисовки корзины
        console.log(this.goods)
    };     

    addItemToCart() { // - метод для добавления элемента в корзину

    };

    removeItemFromCart() { // - метод удаления элемента из корзины

    };

    calcItems() {  // - метод для подсчета количества элементов в корзине и их стоимости 

    };

    clearCart() { // - метод для очистки корзины

    };

    cartToBuy() {  // - метод продолжения покупки

    };

}

class CartItem {
    constructor(title, price, quantity = 1, discount = 0) { // Я бы ввел еще ID элемента, так как названия могут совпадать, в прошлом курсе так и делал.
        this.title = title;
        this.price = price;
        this.quantity = quantity;
        this.discount = discount;
    }

    //  Опишем методы элемента корзины
    changeItemQuantity() { // - Изменение количества данного элемента в корзине

    };

    changeItemChars() {  // - Изменение характеристик элемента (например, размера)

    };

    renderItem() {  // - отрисовка элемента

    };

    calcDiscount() { // - расчет скидки

    };
}


const list = new GoodsList();
list.fetchGoods(() => {
    list.render();
});

const cart = new Cart();
cart.fetchCart(() => cart.renderCart());


