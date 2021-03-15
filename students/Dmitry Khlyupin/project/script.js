const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
class GoodsItem {
    constructor(item) {
        this.item = item;

    }
    render() {

        return `
        <div class="goods-item" data-id="${this.item.id_product}" >
            <img src="./img/${this.item.id_product}.jpg" class="itemImg" alt="No image">
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
        // this.cart = cart;
        // this.goods = [];
        // this.filteredGoods = [];
        // document.querySelector('.goods-list').addEventListener('click', (event) => {
        //     console.log(event);
        //     if (event.target.className === "addToCart") {
        //         const itemId = +event.target.parentElement.dataset.id;
        //         const item = this.goods.find((goodsItem) => goodsItem.id_product === itemId);
        //         if (typeof item !== 'undefined') {
        //             this.addToCart(item);
        //         } else {
        //             console.error(`Нет элемента с ID = ${itemId}`);
        //         }

        //     }
        // })
        // document.querySelector('.search-button').addEventListener('click', (event) => {
        //     console.log(event);
        //     const value = document.querySelector('.goods-search').value;
        //     this.filterGoods(value);
        // })
    }


    render() {
        let listHtml = '';
        this.filteredGoods.forEach(good => {
            const goodItem = new GoodsItem(good);
            listHtml += goodItem.render();
        });

        document.querySelector('.goods-list').innerHTML = listHtml;

        //Добавим вывод стоимости всех товаров на страницу
        document.querySelector('.description').innerHTML = `                                                               
        <p>Стоимость всех товаров равна: ${this.calcFullPrice()} рублей.</p>  
        `;
    }
    filterGoods(value) {
        console.log(value);
        const regexp = new RegExp(value, 'i');
        this.filteredGoods = this.goods.filter(good => regexp.test(good.product_name));
        this.render();
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

    async newFetchCart() {
        try {
            console.log(`Загрузка корзины...`);
            const response = await fetch(`${API_URL}/getBasket.json`);
            const goods = await response.json();
            this.goods = goods;
            console.log(`загрузка корзины завершена!`);
            this.renderCart();

        } catch (err) {
            console.log(err);
        }
    }


    renderCart() { // - метод для отрисовки корзины
        console.log(this.goods)
    };


    async addItemToCart(item) { // - метод для добавления элемента в корзину
        try {
            const answer = await fetch(`${API_URL}/addToBasket.json`);
            const response = await answer.json();
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

        } catch (err) {
            console.log(err)
        }
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
            return acc + curr.price * curr.quantity
        }, 0);
        this.goods.countGoods = this.goods.contents.reduce((acc, curr) => {
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
list.newFetchGoods();
cart.newFetchCart();

const app = new Vue({
    el: '#app',
    data: {
        goods: [],
        searchLine: ''
    },
    computed: {
        filteredGoods() {

        },
        total() {

        }
    },
    methods: {
        async newFetchGoods() {
            try {
                console.log(`Загрузка товаров...`)
                const request = await fetch(`${API_URL}/catalogData.json`);
                const goods = await request.json();
                this.goods = goods;

                console.log(`Загрузка товаров завершена!`);

            } catch (err) {
                console.log(`Невозможно загрузить товары!`, err);
            }
        }

    }
});