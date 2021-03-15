 class GoodsItem {  
    constructor(item) { 
        this.item = item;
    }

    render () {
        return `
        <div class="item">
            <h2>${this.item.title}</h2> 
            <p>${this.item.price}</p>
        </div>
        `;  
    }
}

class GoodsList { //отрисовка всего списка и элементов товара
    constructor() {
        this.goods =  [];
    }

    fetchData() {
        this.goods = [
            { title: 'Монитор', price: 5000 },
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
        document.querySelector(".goods").innerHTML = goodsString.join('');
    }

    getTotalPrice() {
        const Prices = [this.goods[0].price, this.goods[1].price, this.goods[2].price, this.goods[3].price];
        const TotalPrice = Prices.reduce(function(previousValue, currentValue) {
            return previousValue + currentValue;
        });
        console.log(TotalPrice);
    }
}

class Basket {
    fetcData() {
        //запрос с сервера
    }
    addItem() {
        //добавление в корзину
    }
    deleteItem() {
        //удаление из корзины
    }

    deleteAll() {
        //удалить все элементы
    }

    sendOrder() {
        //отправка сформерованного заказа на сервер
    }
    payOrder() {
        //оплата заказа
    }
    confirmOrder() {
        //подтверждение оплаты, номер заказа
    }

    sumOrder() {
        //сумма цены всех элементов
    }

    render() {

    }

}

class BasketItem {
    changeAmount() {
        //изменить кол-во
    }

    render() {

    }
}

const list = new GoodsList();
list.fetchData();   
list.render();







