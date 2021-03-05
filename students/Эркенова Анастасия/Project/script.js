class GoodsItem {
    constructor(item) {
        this.item = item;
    }

    render() {
        return `
            <div class="item">
                <h2>${this.item.title}</h2>
                <p>${this.item.price}</p>
            </div>
        `;
    }
}

class GoodsList {
    constructor() {
        this.goods = [];
    }

    fetchData() {
        this.goods = [
            { title: 'Монитор', price: 50000 },
            { title: 'Клавиатура', price: 1500 },
            { title: 'Мышь', price: 700 },
            { title: 'Ноутбук', price: 35000 },
        ];
    }

    render() {
        const goodsString = this.goods.map(element => {
            const item = new GoodsItem(element);
            return item.render();
        });
        document.querySelector('.goods').innerHTML = goodsString.join('');
    }
}


class Cart {
    items = []

    constructor(items = []) {
        this.items = items
    }
    addItem() {
        // добавление итема в корзину
    }
    removeItem() {
        // убрать итем из корзины
    }
    fetchData() {
        // запрос данных с сервера
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
    // показалось логичным добавить метод, определяющий суммарную стоимость всех товаров
    // не для GoodList, а для корзины (Cart)
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


const list = new GoodsList();
list.fetchData();
list.render();