'use strict';

const goods = [
  { title: 'Mango People T-shirt', price: 200 },
  { title: 'Mango People T-shirt', price: 150 },
  { title: 'Mango People T-shirt', price: 150 },
];

  
const renderGoodsItem = (title, price) => {
    return `
        <div class='goods-item'>
            <h3 class='product-title'>${title}</h3>
            <p class='product-price'>${price} $</p>
            <button class="by-btn">В корзину</button>
        </div>`;
  };
  
  const renderGoodsList = (list) => {
      /*beforeend( сразу перед закрывающим тегом element (после последнего потомка))- параметр DOMString который определеет позицию добовляймого 
      элемента относительно элемента, вызвавшего метод.
      По умолчанию, элементы массива разделены запятой, это можно исправить передав в качестве параметра метода значение, 
      которое будет использовано в качестве разделителя, а именно метод join(''), так как он объединяет все элементы массива 
      (или массивоподобного объекта) в строку. */
      
    document.querySelector('.goods-list').insertAdjacentHTML('beforeend', list.map(item => renderGoodsItem(item.title, item.price)).join(''));

    /*let goodsList = list.map(item => renderGoodsItem(item.title, item.price));
    document.querySelector('.goods-list').innerHTML = goodsList;*/
};
  
  renderGoodsList(goods);