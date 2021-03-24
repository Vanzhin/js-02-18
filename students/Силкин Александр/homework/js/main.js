
  /* ДЗ 1
const products = [
    {id: 1, title: 'Notebook', price: 2000},
    {id: 2, title: 'Mouse', price: 20},
    {id: 3, title: 'Keyboard', price: 34},
    {id: 4, title: 'Gamepad', price: 56},
    {id: 5, title: 'Chair', price: 120},
];

const renderProduct = (title, price) => {
    return `<div class="product-item">
                <h3>${title}</h3>
                <p>${price}</p>
                <button class="buy-btn">купить</button>
            </div>`
};

const renderPage = list => {
    const productList = list.map(item => renderProduct(item.title, item.price));
    document.querySelector('.products').innerHTML = productList;
};

renderPage(products);
*/

//ДЗ 2
class GoodsItem {
    constructor(item) {
      this.item = item;
    }
  
    render() {
      return `
        <div class="product-item">
            <h2>${this.item.title}</h2>
            <p>${this.item.price}</p>
            <button class="buy-btn">купить</button>
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
        { title: 'Monitor', price: 50000 },
        { title: 'Keyboard', price: 1500 },
        { title: 'Mouse', price: 700 },
        { title: 'Notebook', price: 35000 },
      ];
    }
    //2. Добавьте для GoodsList метод, определяющий суммарную стоимость
    getTotalPrice() {
        const sum = this.goods.reduce(
        (accumulator, currentElement) => accumulator + currentElement.price, 0);
        console.log(sum)
    }
    render() {
      const goodsString = this.goods.map(element => {
        const item = new GoodsItem(element);
        return item.render();
      });
      document.querySelector('.products').innerHTML = goodsString.join('');
    }
  
  }
  const list = new GoodsList();
  list.fetchData();
  list.render();

  //1. Добавьте пустые классы для корзины товаров и элемента корзины товаров. Продумайте, какие методы понадобятся для работы с этими сущностями.
  class Basket {
    constructor(item) {}
    
    fetchData() {} //запрос данных с сервера
  
    render() {} //отрисовать корзину
  
    calkDelivery() {} //расчитать доставку
  
    calcTotalPrice() {} //расчитать стоимость корзины
  
    clear() {} //очистить корзину
  
    completeOrder() {} //выполнить заказ
  }
  
  
  class BasketItem {
    constructor() {} //указать свойства из полученных данных о товарах с сервера
  
    render() {} //отрисовать товар
  
    calcTotalPrice() {} //рассчитать стоимость указанного количества товара
  
    changeQuantity() {} //изменить количество
  
    deleteItem() {} //удалить товар из корзины
  }
