const goods = [
  { title: 'Монитор', price: 50000 },
  { title: 'Клавиатура', price: 1500 },
  { title: 'Мышь', price: 700 },
  { title: 'Ноутбук', price: 35000 },
];

class GoodItem {
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

class GoodList {
  constructor(goodsArray) {
    this.goods = goodsArray;
  }

  render() {
    const goodsString = this.goods.map((element) => {
      const item = new GoodItem(element);
      return item.render();
    });
    document.querySelector('.goods').innerHTML = goodsString.join('');
  }
}

class Basket {
  fetchData() {} // запрос данны с сервера на получение списка товара

  addOnCart() {} // добавление в корзину

  cartRemove() {} // удаление из корзины

  cartClear() {} // очистка корзины

  changeCartCount() {} // меняем количество товаров в корзине

  cartRecalculate() {} // пересчет корзины

  basketTotal() {
    const sum = goods.reduce((total, current) => total + current.price, 0);
    console.log(sum);
  }

  render() {} // отрисовка полученных товаров
}

class BasketItem {}

const list = new GoodList(goods);

list.render();
