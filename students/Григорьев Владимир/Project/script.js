class GoodsItem {
  constructor(item) {
    this.item = item;
  }
  render(){
  return `
  <div class="goods_item">
  <h3>Модель ${this.item.title}</h3>
  <p>Цена: ${this.item.price} руб.</p>
  <img ${this.item.pict}>
  <button class="buy_btn">Купить</button>
  </div>
   `;
};
}
class GoodsList {
  constructor() {
      this.goods = [];
  }
  fetchData() {
      this.goods = [
        { title: 'Bf109', price: 150, pict:'src="img/1s.jpg"' },
        { title: 'P-40', price: 250, pict:'src="img/2s.jpg"' },
        { title: 'Tornado', price: 300, pict:'src="img/3s.jpg"' },
        { title: 'Hawk T1', price: 200, pict:'src="img/4s.jpg"' },
      ];
    }
      render() {
        const goodsString = this.goods.map(element => {
            const item = new GoodsItem(element);
            return item.render();
        });
        document.querySelector('.goods').innerHTML = goodsString.join('');
    } 

    // суммарную стоимость всех товаров
    calcGoods() {
      let totalPrice = 0;
      this.goods.forEach((goods) => {
          if(goods.price !== undefined) {
              totalPrice += goods.price;
              console.log(goods.price);
          }
      });
      let totalGoodsAnswer = "Все товары на сумму $" + totalPrice;
      document.querySelector('.goods-total').innerHTML = totalGoodsAnswer;
  }
  }



class Basket {
  fetchdata(){
    constructor() {
      // добавляем товары
      this.addGoods = [];
      addBasket() {}
      // Удаление из корзины
      deleteBasket() {}
      // добовляем количество
      addQtyBasket() {}
      // стоимость в корзине
    calcBasket() {}
  }
  render(){
    
  }
}

const list = new GoodsList();
list.render();
list.fetchData();   



// const goods = [
//     { title: 'Bf109', price: 150, pict:'src="img/1s.jpg"' },
//     { title: 'P-40', price: 250, pict:'src="img/2s.jpg"' },
//     { title: 'Tornado', price: 300, pict:'src="img/3s.jpg"' },
//     { title: 'Hawk T1', price: 200, pict:'src="img/4s.jpg"' },
//   ];


//   const renderGoodsItem = (title, price, pict) => {
//     return `
//      <div class="goods_item">
//     <h3>Модель ${title}</h3>
//      <p>Цена: ${price} руб.</p>
//      <img ${pict}>
//      <button class="buy_btn">Купить</button>
//      </div>
//      `;
//   };
  
//   const renderGoodsList = (list) => {
//     let goodsList = list.map(item => renderGoodsItem(item.title, item.price, item.pict));
//     document.querySelector('.goods__list').innerHTML = goodsList.join('');
//   }
  
//   renderGoodsList(goods);