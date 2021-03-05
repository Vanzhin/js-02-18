let fileNoPhotoAvailable = "./img/no-photo-available.jpg";


class Application {

  constructor() {
    this.basket;
    this.goodList;
    this.render;
  }

  create() {   

    // рисую страницу
    this.render = new HTMLRender();
    this.render.start();  


    // создаю объекты корзиын и перечня товаров
    this.basket = new Basket();    
    this.goods = new GoodList();

    this.goodsload();

    // отрисовка полученных товаров
    //this.render.goodList(this.goods.list);
  }

  goodsload() {
    // успех загрузки данных с псевдосервера  0 < sucessChance < 1
    let sucessChance = 0.7; 
    // время ожидания отклика от псевдосервера
    let responseTimeMS = 2000; 
    // попытка загрузить данные с псевдосервера 
    this.render.goodsload();

    const p = new Promise( (resolve,reject) => {
      setTimeout( () => {
        let IsServerAvailable = (Math.random() <= sucessChance) ? true : false;      
        if (IsServerAvailable) { 
          this.goods.fetchData(); 
          resolve();
        } else{ 
          reject();
        }
      },responseTimeMS);
    });

    p.then( () => this.render.goodList(this.goods.list))
    .catch(() => this.render.serverIsNotAvailable());
  }

}


class GoodList {

  constructor() {
    this.list = {};
  }

  fetchData() {
    this.list = [
      {
        id: 1001,
        title: 'Shirt',
        images:['./img/shirt.jpg'],
        price: 150
      },      
      { 
        id: 1002,
        title: 'Socks',
        images:['./img/socks.jpg', './img/socks.jpg' , './img/socks.jpg'],
        price: 50
      },
      {
        id: 1003,
        title: 'Jacket',
        images:['./img/jacket.jpg', './img/jacket.jpg'],
        price: 350
      },
      {
        id:1004,
        title: 'Shoes',
        images:['./img/shoes.jpg'],
        price: 250
      }
    ];    
  }
}


class Basket {

  // общая стоимость всех товаров в корзине (приватная)
  #totalprice = 0;
  #totalquantity = 0;

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
   * количество товаров в корзине
   */
  get quantity() {
    return this.#totalquantity;
  }

  /*
   * метод добавляет товары в корзину
   */
  addItem(goods, quantity = 1) {

    let id = goods.id;
    let cost = goods.price * quantity;
    
    this.#totalprice += cost;
    this.#totalquantity += quantity;

    if (this.items[id]) {
      this.items[id].quantity += quantity;
      this.items[id].cost += cost;
      return
    } 

    this.items[id] = {
      goods,
      quantity,
      cost
    };
  } 

  /*
   * метод убирает определенное количество товаров из корзины
   */
  minusItem(goods, quantity = 1) {
    
    let id = goods.id;
    if (!this.items[id]) return;
    if (quantity >= this.items[id].quantity) return removeItem(id);

    let deltacost = this.items[id].goods.price  * quantity;
    this.#totalprice -=  deltacost;
    this.items[id].cost -= deltacost;

    this.items[id].quantity -= quantity;
    this.#totalquantity -= quantity;
  }

  /*
   * метод удаляет из корзины товар по его id
   */
  removeItem(id) {

    if (!this.items[id]) return;
    this.#totalprice -= this.items[id].cost;
    this.#totalquantity -= this.items[id].quantity;    
    delete this.items[id];
  }

  /*
   * метод очищает корзину
   */
  removeAllItems() {

    this.#totalprice = 0;
    this.#totalquantity = 0;
    this.items = {};
  }
}


class HTMLRender{
  
  constructor() {
    this.divbasket = '.cart-button';
    this.divGoodList = '.goods-list';
    this.divCartItemsQantity = '.qntty';
    
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
                  <div class="cart-button" OnClick="showbasket()"><span class="qntty"></span></div>
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
    if (!el) return console.log("not found DOM Element:", this.divGoodList);

    let HTML = "";
    for (let index in goods) {

      HTML += `
<div class="goods-item">
  <img src="${(Array.isArray(goods[index].images)) ? goods[index].images[0] : fileNoPhotoAvailable}">
  <h3>${goods[index].title}</h3>
  <p>${goods[index].price}</p>
  <div class="addbutton unselectable" OnClick="additem(${index})">в корзину</div>
</div>`;   
    }

    el.innerHTML = HTML;
  }

  cartItemsRenew(num = 0){
    let el  = document.querySelector(this.divCartItemsQantity);
    if (!el) return console.log("not found DOM Element:",  this.divCartItemsQantity);

    el.innerHTML = (num > 9)? "9+": (num > 0)? num : ""; 
  }

  goodsload(){
    let el  = document.querySelector(this.divGoodList);
    if (!el) return console.log("not found DOM Element:", this.divGoodList);
    el.innerHTML = '<div class="loading"></div>';
  }

  serverIsNotAvailable(){
    let el  = document.querySelector(this.divGoodList);
    if (!el) return console.log("not found DOM Element:", this.divGoodList);
    el.innerHTML = `
    <div class="serverIsNotAvailable">
      <h1>Что-то пошло не так... сервер недоступен</h1>
      <a href="index.html">Попробуйте еще раз</a>
    </div>
    `;
  } 
}

///////////////////////////////////////////////////////////////////////////////////
// общедоступные функции 


function additem(index){  
  app.basket.addItem(app.goods.list[index]);
  app.render.cartItemsRenew(app.basket.quantity);
}

function showbasket(){

  if (app.basket.quantity === 0) return alert("Корзина пуста");
  
  let text = ` *****  КОРЗИНА  *****\n\n`;
  for( let id in app.basket.items){
    text +=`Наименование: ${app.basket.items[id].goods.title}`;
    text +=`, Цена: ${app.basket.items[id].goods.price}$`;
    text +=`, Количество: ${app.basket.items[id].quantity}`;
    text +=`, Стоимость: ${app.basket.items[id].cost}$\n`;
  }
  text += `\nКоличество товаров: ${app.basket.quantity}`;
  text += `\nВсего товаров на сумму: ${app.basket.total}$`;
  alert(text);
  
}

///////////////////////////////////////////////////////////////////////////////////
// пуск 
const app = new Application();
app.create();
