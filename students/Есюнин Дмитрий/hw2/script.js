
class Application {

  constructor() {
    this.basket;
    this.goodList;
    this.render;
  }

  create() {   
    this.basket = new Basket();    
    this.goods = new GoodList();
    this.goods.fetchData();

    this.render = new HTMLRender();
    this.render.start();  
    this.render.goodList(this.goods.list);
  }

}



class GoodList {

  constructor() {
    this.list = {};
  }

  fetchData() {
    this.list = {
        1001:{
        title: 'Shirt',
        price: 150
      },      
        1002:{
        title: 'Socks',
        price: 50
      },
        1003:{
        title: 'Jacket',
        price: 350
      },
        1004:{
        title: 'Shoes',
        price: 250
      }    
    };
  }

}



class Basket {

  // общая стоимость всех товаров в корзине (приватная)
  #totalprice = 0;


  // типа конструктор
  constructor() {
    this.items = {};
  }

  /*
   * получение общей стоимости всех товаров в корзине
   */
  get total() {
    return this.#totalprice;
  }

  /*
   * метод добавляет товары в корзину
   */
  addItem(id, price, quantity = 1) {
    if (this.items[id]) {
      this.items[id].quantity += quantity;
    } else {
      this.items[id] = {
        price,
        quantity
      };
    }

    this.#totalprice += price * quantity;
  }

  /*
   * метод убирает определенное количество товаров из корзины
   */
  minusItem(id, quantity = 1) {
    if (!this.items[id]) return;

    if (quantity >= this.items[id].quantity) {
      removeItem(id);
    } else {
      this.items[id].quantity -= quantity;
      this.#totalprice -= this.items[id].price * quantity;
    }
  }

  /*
   * метод убирает из корзины товар по его id
   */
  removeItem(id) {
    if (!(this.items[id])) return;
    this.#totalprice -= this.items[id].price * this.products[id].quantity;
    delete this.items[id];
  }

  /*
   * метод очищает корзину
   */
  removeAllItems() {
    this.#totalprice = 0;
    this.items = {};
  }

}


class HTMLRender{
  
  constructor() {
    this.divbasket = '.cart-button';
    this.divGoodList = '.goods-list';
  }  


  createEl (name , type = "id", element = "div") {		
		let el = document.createElement(element);
		el.setAttribute(type, name);
    document.body.appendChild(el);
    return el;
  }

  start(){
    let elWrapp = this.createEl("wrapper", "class");
    elWrapp.innerHTML= `
              <header>
              <div class="header-wrapp">
                  <div class="logo"></div>
                  <div class="name">eShop</div>
                  <button class="cart-button unselectable" type="button" OnClick="showbasket()">Корзина</button>
              </div>
              </header>
              <main>
              <div class="main-wrapp">
                  <div class="goods-list"></div>
              </div>
              </main>
              <footer>
              <div class="footer-wrapp">

              </div>
              </footer>`;
  }
  


  goodList(goods) {
    let el  = document.querySelector(this.divGoodList);
    if (!el) {
      return console.log("not found DOM Element:", this.divGoodList);
    }


    let HTML = "";
    for (let id in goods) {
      HTML += `
<div class="goods-item">
  <img src="">
  <h3>${goods[id].title}</h3>
  <p>${goods[id].price}</p>
  <div class="addbutton unselectable" OnClick="additem(${id})">в корзину</div>
</div>`;   
    }

    el.innerHTML = HTML;
  }


}

///////////////////////////////////////////////////////////////////////////////////
// общедоступные функции 


function additem(id){  
  app.basket.addItem(id, app.goods.list[id].price);
}

function showbasket(){

  if (app.basket.total == 0) return alert("Корзина пуста");
  
  let text = ` *****  КОРЗИНА  *****\n\n`;
  for( let id in app.basket.items){
    text +=`id: ${id}   имя: ${app.goods.list[id].title}   цена: ${app.goods.list[id].price}$   количество: ${app.basket.items[id].quantity}  стоимость: ${app.goods.list[id].price * app.basket.items[id].quantity}$\n`;
  }
  text += `\nВсего товаров на сумму: ${app.basket.total}$`;
  alert(text);
  
}


///////////////////////////////////////////////////////////////////////////////////
// пуск 
const app = new Application();
app.create();
