
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
  fetchGoods() {
    this.goods = [
        { title: 'Монитор', price: 50000 },
        { title: 'Клавиатура', price: 1500 },
        { title: 'Мышь', price: 700 },
        { title: 'Ноутбук', price: 35000 },
    ];
  }
  render() {
    let listHtml = '';
    this.goods.forEach(good => {
      const goodItem = new GoodsItem(good.title, good.price);
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


class Hamburger {

  constructor(size, stuffing) {
    this.size = size
    this.stuffing = stuffing
    this.selected_topping = []

    this.type_list = [
        {name: 'Маленький', price: 50, calory: 20},
        {name: 'Большой', price: 100, calory: 40},
    ]
    this.stuffing_list = [
        {name: 'С сыром', price: 10, calory: 20},
        {name: 'С салатом', price: 20, calory: 5},
        {name: 'С салатом', price: 15, calory: 10}
    ]
    this.topping_list = [
        {name: 'Приправа', price: 15, calory: 0},
        {name: 'Майонез', price: 20, calory: 5},
    ]
  }
  get_item_from_list(list, name_item) {
    for (var item of list){
        if(item.name==name_item){
            return item
        }
    }
    return null
  }
  addTopping(topping) {    // Добавить добавку
    //let s = 0
    //this.topping_list.forEach(item => (if(item.name==topping){s += 1}))
    //Проверяем есть ли такая приправа, если есть - добавляем
    let searchTopping = this.get_item_from_list(this.topping_list, topping)
    if(searchTopping != null){
        this.selected_topping.push(searchTopping)
        console.log('Дополнительная приправа '+topping+' добавлена')
    } else {
        console.log('Дополнительная приправа '+topping+' не предусмотрена')
    }
  }
  removeTopping(topping) { // Убрать добавку
    //this.selected_topping.forEach(item => if(item.name==topping){})
    let searchTopping = this.get_item_from_list(this.selected_topping, topping)
    if(searchTopping != null){
        this.selected_topping.splice(searchTopping,1)
        console.log('Дополнительная приправа '+topping+' удалена')
    }
  }
  getToppings(topping) {   // Получить список добавок
    this.topping_list.forEach(item => console.log(item))
  }
  getSize() {              // Узнать размер гамбургера
    console.log(this.size)
  }
  getStuffing() {          // Узнать начинку гамбургера
    console.log(this.stuffing)
  }
  calculatePrice() {       // Узнать цену
    let price1 = (this.get_item_from_list(this.type_list, this.size)).price
    let price2 = (this.get_item_from_list(this.stuffing_list, this.stuffing)).price
    let price3 = 0
    for(var item of this.selected_topping){
        price3 += item.price
    }
    return price1+price2+price3
  }
  calculateCalories() {    // Узнать калорийность
    let calory1 = (this.get_item_from_list(this.type_list, this.size)).calory
    let calory2 = (this.get_item_from_list(this.stuffing_list, this.stuffing)).calory
    let calory3 = 0
    for(var item of this.selected_topping){
        calory3 += item.calory
    }
    return calory1+calory2+calory3
  }
}

const list = new GoodsList();
list.fetchGoods();
list.render();


H = new Hamburger('Маленький','С сыром')