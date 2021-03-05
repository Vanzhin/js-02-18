const goods = [
    { title: 'Монитор', price: 50000 },
    { title: 'Клавиатура', price: 1500 },
    { title: 'Мышь', price: 700 },
    { title: 'Ноутбук', price: 35000 },
];

// const getGoodsLayout = (title = 'Товар', price = 'Цена') => {
//     return `
//         <div class="item">
//             <h2>${title}</h2>
//             <p>${price}</p>
//         </div>
//     `;
// }

// const renderGoods = (list) => {
//     const goodsString = list.map(element => getGoodsLayout(element.title, element.price));
//     document.querySelector('.goods').innerHTML = goodsString.join("");
// }

// renderGoods(goods);

//Элемент списка товаров
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
        ;`
    }

}

//Класс отвечающий за отрисовку всего списка и элементов товара
class GoodList {
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
// Задание №2
    orderPrice() {
        const sum = this.goods.reduce((acc, current) => {
            return acc + current.price;
        }, 0)
    }

    render(){
        const goodsString = goods.map(element => {
            const item = new GoodsItem(element);
            return item.render();
        });
        document.querySelector('.goods').innerHTML = goodsString.join("");
    }
}

const list = new GoodList(goods)
list.fetchData();
list.render();

//Задание № 1 
class Basket {
    fetchData(){
        //Запрос данных с сервера
    }

    addProduct(){
        //Добавление товара в корзину
    }

    render(){

    }

    clear(){
        //Очистить корзину
    }

    removeProduct(){
        // Удалить товар
    }

    sales(){
        //Расчитать скидку
    }
}

class BasketProduct{
    changeSize(){
        //Выбор цвета
    }

    changeColor(){
        //Выбор размера
    }

    render(){

    }

}
