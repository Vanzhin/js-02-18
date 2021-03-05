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


class Basket {

    constructor() {
        this.basketItems = [
            { title: 'Монитор', price: 50000, amount: 2 },
            { title: 'Клавиатура', price: 1500, amount: 1 },
            { title: 'Что-то', price: 5000, amount: 3 },
        ];
        this.totalCost = 0;
    }
    calcCost() {
        this.totalCost = 0;
        this.basketItems.forEach(element => this.totalCost += element.price*element.amount);
    }

    fetchData() {
        // запрос данных с сервера
    }

    render() {
        //
    }

    saveBasket() {
        //сохраняет содержимое корзины на сервере
    }

    wipeBasket() {
        //удаляет все содержимое корзины
    }


}


class BasketItem {
    deleteItem() {
        //удаляет предмет из корзины
    }
    increase() {
        //увеличивает кол-во предметов в корзине
    }
    decrease(){
        //уменьшает
    }
}


const list = new GoodsList();
const basket1 = new Basket();
basket1.calcCost()
list.fetchData();
list.render();