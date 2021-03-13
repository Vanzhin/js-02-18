'use strict';
const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
//HTTP-запрос GET 
function makeGETRequest(path = '', method = 'GET', body) {
    //Объект Promise (промис) используется для отложенных и асинхронных вычислений.
    return new Promise((resolve, reject) => {
//узел XMLHttpRequest - это оболочка для встроенного http-клиента, имитирующая объект
      const xhr = new XMLHttpRequest();

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    console.log({ response: xhr.responseText });
                    //вызывает успешное исполнение промиса
                    resolve(JSON.parse(xhr.responseText));
                } else {
                    //отклоняет промис
                    reject(xhr.responseText);
                }
            }
        };

        xhr.open(method, `${API_ROOT}/${path}`);

        xhr.send(body);
    })
}

//отрисовываем список товаров в HTML через класс
 // класса GoodsItem и запрашивать его разметку
class GoodsItem {
    constructor(title, price) {
        this.item = {
            title: title,
            price: price,
        };
    }
    render() {
        //this.item.id_product или title ??
        return `<div class='goods-item' data-id='${this.item.id_product}'> 
            <h3 class=product-title>${this.item.title}</h3> 
            <p class=product-price>${this.item.price} $</p>
            <button class="by-btn">В корзину</button>
        </div>
        `;
    }
}

 // Метод вывод списка товаров. Для каждого элемента массива goods будем создавать экземпляр   
class GoodsList {
    constructor(basket) {
        this.basket = basket;
        //пустой объект куда мы будем отрисовывать список товаров
        this.goods = [];

        //метод варината обработки клика по кнопки можно добавить один раз для всех элементов или повесили событие слушателя "клик"
        document.querySelector('.goods-list').addEventListener('click', (event) => {
            if (event.target.name === 'by-btn') {
                //console.log('button click');
                const itemId = event.target.parentElement.dataset.id;
                const item = this.goods.find((goodsItem) => goodsItem.id_product === parseInt(itemId));
                if (typeof item !== 'undefined') {
                    this.addToBasketItem(item); 
                } else {
                    console.error(`Can't find element with id ${itemId}`);
                }
            }
        });
    }
//метод "получить данные"
   fetchData() {
        this.goods = [
          { title: 'Mango People T-shirt', price: 200 },
          { title: 'Mango People T-shirt', price: 150 },
          { title: 'Mango People T-shirt', price: 150 },
        ];
    }
    render() {
        let goodsList = '';
        //Метод forEach() вызывает func для каждого элемента и ничего не возвращает.
        this.goods.forEach(({title, price}) => {
            const item = new GoodsItem(title, price);
            goodsList += item.render();
        });
        document.querySelector('.goods-list').innerHTML = goodsList;
      //document.querySelector('.goods-list').innerHTML = goodsString.join('');
    }
 
}
//корзина
class Basket {
    constructor() {
        //пустой объект корзины, куда мы будем отрисовывать корзину
        this.basketGoods = [];
    }
    //метод "добавить в корзину"
    addToBasketItem(item) {
        //this.basket.addItem(item);
        let toBasketItem;
        list.goods.forEach(function(item){
        toBasketItem = {
             title: item.title,
             price: item.price,
        }
    });
         //this.basketGoods.push добавить элементы окрзины в конец
         this.basketGoods.push (toBasketItem);
    }

    //метод "удалить товар с корзины"
    deleteBasketItem() {
        let BasketItem;
        list.goods.forEach(function(item){
            BasketItem = {
                title: item.title,
                price: item.price,
        }
    });
    //this.basketGoods.splice удаляет стоймость корзины и вставлет товар
        this.basketGoods.splice(BasketItem);
    }
    //метод "отобразить карзину(данные в карзине)"
    fetchBasket() {
        return new Promise((resolve, reject) => {
            sendRequest('/getBasket.json')
                .then((result) => {
                    //Метод JSON.parse() разбирает строку JSON, возможно с преобразованием получаемого в процессе разбора значения.
                    const { contents } = JSON.parse(result);
                    this.goods = contents;
                    this.render();
                    resolve();
                });
        });

    }
  render() {
     //отрисовываем корзину через let в listHtml
     let listHtml = '';
  }
      //Метод для вывода итоговой суммы всех товаров в корзине
  totalBasketPrice() {
      let totalPrice =  document.getElementById('goods-list__total_price'); 
      let sum = 0;
      this.goods.forEach (goods => { 
          sum += goods.price
      });
      totalPrice.innerText = `Итого  ${sum} $`;
  }

}
class BasketItem {
    constructor(title, price) {
        this.title = title; 
        this.price = price; 
    }
    render() {}
}

const list = new GoodsList();
const basket= new Basket();
list.fetchData();
list.render();
//list.totalBasketPrice();