const API_ROOT =
  'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
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
          reject();
        }
      }
    };

    xhr.open(method, `${API_ROOT}/${path}`);

    xhr.send(body);
  });
};

class GoodsItem {
  constructor(item) {
    this.item = item;
  }

  render() {
    return `
          <div class="item" data-id='${this.item.id_product}'>
              <h2>${this.item.product_name}</h2>
              <p>${this.item.price}</p>
              <button name = 'add-to-basket'>Добавить в корзину</button>
          </div>
      `;
  }
}

class GoodsList {
  constructor(basket) {
    this.basket = basket;
    this.goods = [];

    document.querySelector('.goods').addEventListener('click', (event) => {
      if (event.target.name === 'add-to-basket') {
        const itemId = event.target.parentElement.dataset.id;
        const item = this.goods.find(
          (goodsItem) => goodsItem.id_product === parseInt(itemId)
        );
        if (typeof item !== 'undefined') {
          this.addToBasket(item);
        } else {
          console.error('Cant find');
        }
      }
    });
  }

  fetchData() {
    return new Promise((resolve, reject) => {
      request('catalogData.json').then((goods) => {
        this.goods = goods;
        resolve();
      });
    });
  }

  getTotalPrice() {
    const sum = this.goods.reduce(
      (accumulator, currentElement) => accumulator + currentElement.price,
      0
    );
    console.log(sum);
  }

  render() {
    const goodsString = this.goods.map((element) => {
      const item = new GoodsItem(element);
      return item.render();
    });
    document.querySelector('.goods').innerHTML = goodsString.join('');
  }

  addToBasket(item) {
    this.basket.addItem(item);
  }
}

class Basket {
  constructor() {
    this.goods = [];
  }
  fetchData() {
    request('getBasket.json').then((goods) => {
      this.goods = goods;
    });
  } // запрос данны с сервера на получение списка товара

  addItem(item) {
    this.goods.push(item);
    console.log(this.goods);
  }

  basketRemove(id) {
    this.goods = this.goods.filter(
      (goodsItem) => goodsItem.id_product !== parseInt(id)
    );
  } // удаление из корзины

  cartClear() {} // очистка корзины

  changeCartCount() {} // меняем количество товаров в корзине

  cartRecalculate() {} // пересчет корзины

  basketTotal() {
    const sum = goods.reduce((total, current) => total + current.price, 0);
    console.log(sum);
  }

  render() {} // отрисовка полученных товаров
}

const list = new GoodsList();
list.fetchData().then(() => {
  list.render();
  list.getTotalPrice();
});
