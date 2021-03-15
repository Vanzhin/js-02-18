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
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.send();

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    resolve(xhr.responseText);
                } else {
                    reject(xhr.responseText);
                }
            }
        }
    });
}

const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';






class GoodsItem {
    constructor(item) {
        this.item = item;

    }
    render() {
        
        return `
        <div class="goods-item" data-id="${this.item.id_product}" >
            <img src="#" class="itemImg" alt="No image">
            </img>
            <h3>
                ${this.item.product_name}
            </h3>
            <p>
                ${this.item.price}
            </p>
            <div class="addToCart">
                В корзину
            </div>
        </div>
        `;
    }
}

class GoodsList {
    constructor(cart) {
        this.cart = cart;
        this.goods = [];
        document.querySelector('.goods-list').addEventListener('click', (event) => {
            console.log(event);
            if (event.target.className === "addToCart") {
                const itemId = +event.target.parentElement.dataset.id;
                const item = this.goods.find((goodsItem) => goodsItem.id_product === itemId);
                if (typeof item !== 'undefined') {
                    this.addToCart(item);
                } else {
                    console.error(`Нет элемента с ID = ${itemId}`);
                }

            }
        })
    }
    //  ----------- Callback-метод -------------
    // fetchGoods(callback) {
    //     makeGetRequest(`${API_URL}/catalogData.json`)
    //         .then((goods) => {
    //             this.goods = JSON.parse(goods);
    //             console.log('Загрузка списка товаров завершена...')
    //             callback();
    //         })
    //         .catch(() => {console.log('Невозможно загрузить список товаров!')});
    //     console.log('Идет загрузка списка товаров...');
    // }

    // ----------Promise-метод -------------
    fetchGoods() {
        return new Promise((resolve, reject) => {
            makeGetRequest(`${API_URL}/catalogData.json`)
                .then((goods) => {
                    this.goods = JSON.parse(goods);
                    resolve();
                    console.log('Загрузка списка товаров завершена')
                })
                .catch((error) => {
                    console.log(`${error}: Невозможно загрузить список товаров.`);
                    reject(error);
                });
            console.log('Идет загрузка списка товаров');
        })
    }

    render() {
        let listHtml = '';
        this.goods.forEach(good => {
            const goodItem = new GoodsItem(good);
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
        return this.goods.reduce((acc, curr) => {
            return acc + curr.price
        }, 0);
    }

    addToCart(item) {
        this.cart.addItemToCart(item);
    }
}

class Cart {
    constructor() {
        this.goods = {};
    }
    // Опишем методы корзины:

    // ------- callback-метод --------
    // fetchCart(callback) { // Получение корзины с сервера
    //     makeGetRequest(`${API_URL}/getBasket.json`).then((goods) => {
    //         this.goods = JSON.parse(goods);
    //         console.log('Загрузка корзины завершена...')
    //         callback();
    //     });
    //     console.log('Идет загрузка корзины...');
    // }

    // ------- Promise-метод ---------
    fetchCart() {
        return new Promise((resolve, reject) => {
            makeGetRequest(`${API_URL}/getBasket.json`)
                .then((goods) => {
                    this.goods = JSON.parse(goods);
                    resolve();
                    console.log('Загрузка корзины завершена...')
                })
                .catch((error) => {
                    console.log(`${error}: Невозможно загрузить товары корзины.`);
                    reject(error);
                });
            console.log('Идет загрузка корзины...');
        });
    }


    renderCart() { // - метод для отрисовки корзины
        console.log(this.goods)
    };

    addItemToCart(item) { // - метод для добавления элемента в корзину
        makeGetRequest(`${API_URL}/addToBasket.json`)
            .then((response) => {
                if (response.result !== 0) {
                    const itemIndex = this.goods.contents.findIndex((goodsItem) => goodsItem.id_product === item.id_product);
                    if (itemIndex > -1) {
                        this.goods.contents[itemIndex].quantity += 1;
                    } else {
                        this.goods.contents.push({
                            ...item,
                            quantity: 1
                        });
                    }
                    this.calcItems();
                    this.renderCart();
                } else {
                    console.log(`Не получается загрузить корзину на сервер...`)
                }
            })
    };

    removeItemFromCart(id) { // - метод удаления элемента из корзины
        const itemIndex = this.goods.contents.findIndex((goodsItem) => goodsItem.id_product === id);
        if (itemIndex > -1) {
            if (this.goods.contents[itemIndex].quantity > 1) {
                this.goods.contents[itemIndex].quantity -= 1;
            } else {
                this.goods.contents = this.goods.contents.filter((item) => item.id_product !== +id);
            }
        } else {
            console.log(`Нет такого элемента в корзине`)
        }
        this.calcItems();
        this.renderCart();
    };

    calcItems() { // - метод для подсчета количества элементов в корзине и их стоимости 
        this.goods.amount = this.goods.contents.reduce((acc, curr) => {
            return acc + curr.price*curr.quantity
        }, 0);
        this.goods.countGoods = this.goods.contents.reduce((acc,curr) => {
            return acc + curr.quantity;
        }, 0)
    };

    clearCart() { // - метод для очистки корзины
        this.goods.contents = [];
        this.renderCart();
    };

    cartToBuy() { // - метод продолжения покупки

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

    changeItemChars() { // - Изменение характеристик элемента (например, размера)

    };

    renderItem() { // - отрисовка элемента

    };

    calcDiscount() { // - расчет скидки

    };
}

const cart = new Cart();
const list = new GoodsList(cart);
list.fetchGoods()
    .then(() => {
        list.render();
    });


cart.fetchCart()
    .then(() => {
        cart.renderCart();
    });