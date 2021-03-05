"use strict";

class GoodsList {
    constructor() {
      this.goods = [];
    }

    fetchGoods() {
      this.goods = [
        { title: 'Shirt', price: 150 },
        { title: 'Socks', price: 50 },
        { title: 'Jacket', price: 350 },
        { title: 'Shoes', price: 250 },
      ];
    }

    render() {
      let listHtml = '';
      this.goods.forEach(good => {
        const goodItem = new GoodsItem(good.title, good.price);
        listHtml += goodItem.render();
      });
      document.querySelector('.goods-list').innerHTML = listHtml;
    }

    /*addProduct() {
    }

    removeProduct() {
    }*/

    totalPrice() {
        let fullPrice = 0;

        for (let i = 0; i < this.goods.length; i++) {
            fullPrice += this.goods[i].price;
        }

        return fullPrice;
    }
}

const goods = [
    { title: 'Shirt', price: 150 },
    { title: 'Socks', price: 50 },
    { title: 'Jacket', price: 350 },
    { title: 'Shoes', price: 250 },
];
  
const renderGoodsItem = (title = 'Empty', price = 'Empty') => {
    return `<div class="goods-item"><h3>${title}</h3><p>${price}</p></div>`;
};
  
const renderGoodsList = (list) => {
    let goodsList = list.map(item => renderGoodsItem(item.title, item.price));
    document.querySelector('.goods-list').innerHTML = goodsList.join('');
}

renderGoodsList(goods);

let cart = new GoodsList();

cart.fetchGoods();