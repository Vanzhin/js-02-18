const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';



class GoodsItem {
  constructor(title, price) {
    this.title = title;
    this.price = price;
  }
  render() {
    return `<div class="item"><h3>${this.title}</h3><p>${this.price}</p></div>`;
  }
}


class GoodsList {
  constructor(basket) {
    this.goods = [];
    this.basket = basket;
    this.filteredGoods = [];
  }
  //fetchGoods() {
  //  this.goods = [
  //      { title: 'Монитор', price: 50000 },
  //      { title: 'Клавиатура', price: 1500 },
  //      { title: 'Мышь', price: 700 },
  //      { title: 'Ноутбук', price: 35000 },
  //  ];
  //}
  //fetchGoods(cb) {
  //  makeGETRequest(`${API_URL}/catalogData.json`).then((responseText) => {
  //      this.goods = JSON.parse(responseText);
  //  }
  //  )
  //  cb()
  filterGoods(value) {
    const regexp = new RegExp(value, 'i');
    this.filteredGoods = this.goods.filter(good => regexp.test(good.product_name));
    this.render();
  }
  fetchData() {
    return new Promise((resolve, reject) => {
      request('catalogData.json')
        .then((goods) => {
          this.goods = goods;
          this.filteredGoods = goods;
          resolve();
        })
        .catch((error) => {
          console.log(`Can't fetch data`, error);
          reject(error);
        });
      });
  }

  getTotalPrice() {
    const totalPrice = this.goods.reduce((sum, item) => sum + item.price, 0);

    document.querySelector('.total-price').innerHTML = `Стоимость корзины: ${totalPrice}`;
  }


  render() {
    let listHtml = '';
    this.filteredGoods.forEach(good => {
      const goodItem = new GoodsItem(good.product_name, good.price);
      listHtml += goodItem.render();
    });
    listHtml += `<h3>All sum: ${list.all_sum()}</h3>`;
    document.querySelector('.goods').innerHTML = listHtml;
  }
  all_sum() {
    let sum = 0
    this.goods.forEach(item => sum += item.price)
    //console.log(sum)
    return sum
  }
}

//class Basket {
//  constructor(goodsitem_, count_) {
//    this.goodsitem = goodsitem_;
//    this.count = count_;
//  }
//}

class Basket {
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
}


class BasketItem {
  constructor() {
    this.list_items = [];
  }
  add_items(){
  }
  del_items(){
  }
  clear(){
  }
  all_count_price(){
  }
}




const basket = new Basket();
basket.fetchData();

const list = new GoodsList(basket);
//list.fetchGoods(() => {
//  list.render();
//});

list.fetchData()
  .then(() => {
    list.render();
    list.getTotalPrice();
  });

const app = new Vue({
  el: '#app',
  data: {
    goods: [],
    filteredGoods: [],
    searchLine: ''
  }
  methods: {
    request(path ='', method = 'GET', body) {
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

        xhr.open(method, `${API_URL}/${path}`);
        xhr.send(body);
      });
    }
  },
  mounted() {
    request('catalogData.json')
            .then((goods) => {
              this.goods = goods;
              this.filteredGoods = goods;
              resolve();
            })
    }
  }
});