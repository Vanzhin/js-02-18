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

  //2. Добавьте для GoodsList метод, определяющий суммарную стоимость всех товаров.
  calcTotalPrice() {
    let totalPrice = this.goods.reduce((sum, item) => sum + item.price, 0);
    let str = `<p class=total-price>Сумма корзины: ${totalPrice}</p>`;

    document.querySelector('main').innerHTML += str;
  }
}

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


const list = new GoodsList();
list.fetchData();
list.render();

//2
list.calcTotalPrice();