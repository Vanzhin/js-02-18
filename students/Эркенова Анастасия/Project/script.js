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
                    console.error(xhr.responseText);
                    reject(xhr.responseText);
                }
            }
        }

        xhr.open(method, `${API_ROOT}/${path}`);

        xhr.send(body);
    });
}

class GoodsItem {
    constructor(item) {
        this.item = item;
    }

    render() {
        return `
            <div class="item" data-id="${this.item.id_product}">
                <h2>${this.item.product_name}</h2>
                <p>${this.item.price}</p>
                <button class="add-to-basket" name="add-to-basket">Add to basket</button>
            </div>
        `;
    }
}

class GoodsList {
    constructor(basket) {
        this.basket = basket;
        this.goods = [];

        document.querySelector('.goods').addEventListener('click', (event) => {
            console.log(event)
            if (event.target.name === 'add-to-basket') {
                console.log('button click')
                const itemId = event.target.parentElement.dataset.id;
                const item = this.goods.find((goodsItem) => goodsItem.id_product === parseInt(itemId));
                console.log(item, itemId)
                if (typeof item !== 'undefined') {
                    this.addToBasket(item);
                } else {
                    console.error(`Can't find element with id ${itemId}`);
                }
            }
        });

    }


    fetchData() {
        return new Promise((resolve, reject) => {
            request('catalogData.json')
                .then((goods) => {
                    this.goods = goods;
                    resolve();
                })
                .catch((error) => {
                    console.log(`Can't fetch data`, error);
                    reject(error);
                })
        });
    }
    inCartButton() {
        const btn = document.createElement('div')
        btn.classList.add('btn')
        btn.innerHTML = 'Купить'
        btn.addEventListener('click', () => {
            const basket = new Cart()
            basket.addItem(this)
        })
        return btn
    }

    render() {
        const goodsString = this.goods.map(element => {
            const item = new GoodsItem(element);
            return item.render();
        });
        document.querySelector('.goods').innerHTML = goodsString.join('');
    }
    addToBasket(item) {
        this.basket.addItem(item);
    }
}


class Cart {

    constructor() {
        this.goods = [];
    }
    fetchData() {
        request('getBasket.json')
            .then((goods) => {
                this.goods = goods.contents;
                console.log(this.goods);
            })
            .catch((error) => {
                console.log(`Can't fetch basket data`, error);
            });
    }
    addItem(item) {
        this.goods.push(item);
        console.log(this.goods);

    }
    removeItem(id) {
        this.goods = this.goods.filter((goodsItem) => goodsItem.id_product !== parseInt(id));
        console.log(this.goods);
    }


    render() {

    }
    calcTotalPrice() {
        const how = this.items.reduce((result, cur) => {
            return result + cur.price * cur.count
        }, 0)
        const totalPrice = document.createElement('div')
        totalPrice.innerHTML = `<p> Итоговая цена: ${how} р.</p>`
        totalPrice.classList.add('totalPrice')
        return totalPrice
    }
}


class CartItem {
    name = ''
    price = 0
    count = 1

    constructor(name, price) {
        this.name = name
        this.price = price
    }
    inc() {
        this.count++
    }

    dec() {
        this.count--
    }
    render() {

    }
    inCartButton() {
        // кнопка добавления в корзину
    }
    minusButton() {
        // кнопка удаления итема из корзины
    }
}

const basket = new Cart();
basket.fetchData();

const list = new GoodsList(basket);
list.fetchData()
    .then(() => {
        list.render();
    });
