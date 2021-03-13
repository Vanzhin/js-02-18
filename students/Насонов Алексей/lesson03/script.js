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
  constructor() {
    this.goods = [];
  }
  //fetchGoods() {
  //  this.goods = [
  //      { title: 'Монитор', price: 50000 },
  //      { title: 'Клавиатура', price: 1500 },
  //      { title: 'Мышь', price: 700 },
  //      { title: 'Ноутбук', price: 35000 },
  //  ];
  //}
  fetchGoods() {
    makeGETRequest(`${API_URL}/catalogData.json`).then(() => {


      //cb();
    }
    )
  }
  render() {
    let listHtml = '';
    this.goods.forEach(good => {
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

class Basket {
  constructor(goodsitem_, count_) {
    this.goodsitem = goodsitem_;
    this.count = count_;
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


function makeGETRequest(url) {
    return  new Promise((resolve, reject) => {
        var xhr;

        xhr = new XMLHttpRequest();

        xhr.open('GET', url, false);
        xhr.send();
        this.goods = JSON.parse(xhr.responseText);
        resolve()

    })

    // Здесь пишем асинхронный код
    // В случае успешного выполнения вызываем колбэк resolve()
    // В случае ошибки вызываем reject()
    //});
}



//const list = new GoodsList();
//list.fetchGoods();
//list.render();

const list = new GoodsList();
list.fetchGoods(() => {
  list.render();
});

