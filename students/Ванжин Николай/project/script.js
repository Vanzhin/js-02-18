const API_ROOT = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
const request = (path = '', method = 'GET', body) => {
	return new Promise((resolve, reject) => {
		let xhr;
		if (window.XMLHttpRequest) {
			xhr = new XMLHttpRequest();
		} else if (window.ActiveXObject) {
			xhr = new ActiveXObject("Microsoft.XMLHTTP");
		}

		xhr.onreadystatechange = () => {
			if (xhr.readyState === 4) {
				if (xhr.status === 200) {
					console.log(xhr.responseText);
					console.log(JSON.parse(xhr.responseText))
					resolve(JSON.parse(xhr.responseText));
				} else {
					reject(xhr.responseText);
				}
			}
		}

		xhr.open(method, `${API_ROOT}/${path}`);

		xhr.send(body);
	});



}


class GoodsItem {
	constructor(item) {
		this.item = item;
		if (!this.item.picture) {
			this.item.picture = `https://santehprom-r.ru/image/catalog/photo/armatura/0/prom-r-ru-konv6.png`;
		};
	}
	render() {
		return `
	<div class="item">
	<img src="${this.item.picture}" alt="${this.item.product_name}">
		<h2>${this.item.product_name}</h2>
		<p>${this.item.price}</p>
		<button class="buy" data = "${this.item.id_product}">купить</button>
	</div>
`
	}
};

class GoodsList {
	constructor() {
		this.goods = [];
	}
	fetchData() {
		return new Promise((resolve, reject) => {
			request('catalogData.json').then((goods) => {
				this.goods = goods;
				resolve();
			}).catch((data) => {
				console.log(data);
			});
		})
	}
	getTotalPrice() {
		const price = this.goods.reduce(function (sum, current) { //цена всех товаров
			if (!isNaN(current.price)) {
				return sum + current.price;
			} else
				return sum;
		}, 0);
		console.log(price);
	}
	render() {
		const goodsString = this.goods.map(element => {
			const item = new GoodsItem(element);
			return item.render();
		});
		document.querySelector('.goods').innerHTML = goodsString.join('');
	}
};
class BasketItem {
	constructor(item) {
		this.item = item;
	}

	changeType() {

	}

	removeItem() {

	}

	changeQuantity() {

	}

	render() {
		return `
	<div class="basket-item">
		<h2>${this.item.product_name}</h2>
		<p>${this.item.price} RUB</p>
		<p>количество: ${this.item.quantity}</p>
		<button class="delete-btn" data = "${this.item.id_product}">удалить</button>
	</div>
`
	}
};
class Basket {
	constructor() {
		this.basketGoods = [];
		this.itemToCart = 0;
	}
	ButtonClick() {
		document
			.querySelector("body")
			.addEventListener('click', (event) => this.buttonItemHandler(event));
	}
	buttonItemHandler(event) { //обрабатываю клик по кнопке
		if (!document.querySelector('.basket-item') && event.target.className === "cart-btn") {
			this.fetchData(() => {
				this.render();
				this.getTotalPrice();
				this.getTotalQuantity()
			})
		};
		if (document.querySelector('.basket-item') && event.target.className === "cart-btn") {
			document.querySelector('.basket').innerHTML = `<div class="basket-item-wrap"></div>`

		};
		if (event.target.className === "buy") {
			basketlist.addItem(() => {
				basketlist.renderItemInButton();
			});
		};
		if (event.target.className === "delete-btn") {
			basketlist.removeItem(() => {
				basketlist.renderItemInButton();
			});
		}


	}
	fetchData(callback) {
		request('getBasket.json').then((basketGoods) => {
			this.basketGoods = basketGoods;
			callback();
		}).catch((data) => {
			console.log(data);
		});
	}

	addItem(callback) {
		request('addToBasket.json').then((itemToCart) => {
			this.itemToCart += itemToCart.result;
			callback();
		}).catch((data) => {
			console.log(data);
		});

	}
	renderItemInButton() { //отрисовываю количество товаров на кнопке, делаю невидимой, если товаров нет
		document.querySelector('.cart-qiantity > span').innerHTML = `${this.itemToCart}`;
		if (this.itemToCart === 0) {
			document.querySelector('.cart-qiantity').style.opacity = "0"
		} else document.querySelector('.cart-qiantity').style.opacity = "1";

	}

	removeItem(callback) {
		if (this.itemToCart > 0) {
			request('deleteFromBasket.json').then((deleteItem) => {
				this.itemToCart -= deleteItem.result;
				callback();
			}).catch((data) => {
				console.log(data);
			});
		} else return;

	}

	changeQuantity() {

	}

	applyCoupon() {

	}

	getDeliveryPrice() {

	}

	createOrder() {

	}

	clear() {

	}
	renderBasketPrice(basketPrice) { //отрисовка общей цены через сервер
		return document.querySelector('.basket').insertAdjacentHTML('beforeend', `<div class="basket-price">итого: ${basketPrice} RUB</div>`);
	};
	getTotalPrice() { //получение общей цены корзины через сервер
		const basketPrice = this.basketGoods.amount;
		console.log(basketPrice);
		this.renderBasketPrice(basketPrice);
	}
	renderBasketQuantity(basketQuantity) { //отрисовка общего количества товаров через сервер
		return document.querySelector('.basket').insertAdjacentHTML('beforeend', `<div class="basket-quantity">общее количество: ${basketQuantity}</div>`);
	};
	getTotalQuantity() { //получение общего количества товаров корзины через сервер
		const basketQuantity = this.basketGoods.countGoods;
		console.log(basketQuantity);
		this.renderBasketQuantity(basketQuantity);
	}

	render() { //отрисовка товаров корзины и их количества через сервер
		const basketString = this.basketGoods.contents.map(element => {
			const item = new BasketItem(element);
			return item.render();
		});
		document.querySelector('.basket-item-wrap').innerHTML = basketString.join('');
	}
}





const list = new GoodsList();
list.fetchData().then(() => {
	list.render();
	list.getTotalPrice();
});
const basketlist = new Basket();
basketlist.ButtonClick();




// const async = (a, callback) => {
// 	setTimeout(() => {
// 		const b = a + 1;
// 		callback(b)
// 	}, 200);
// };
// async (4, (b) => {
// 	console.log(b)
// });

// const asyncP = (a) => {
// 	return new Promise((resolve, reject) => {
// 		setTimeout(() => {
// 			if (a) {
// 				const b = a + 1;
// 				resolve(b);
// 			} else {
// 				reject('Error');
// 			}
// 		}, 200);
// 	});
// };


// asyncP(5).then((b) => {
// 	console.log(b); // Сработает первый колбэк и выведет в консоль 6
// }, (error) => {
// 	console.log(error)
// });

// asyncP().then((b) => {
// 	console.log(b);
// }, (error) => {
// 	console.log(error) // Сработает второй колбэк и выведет в консоль 'Error'
// });


// const makePizza = function (title, cb) {
// 	console.log(`Заказ на приготовление пиццы «${title}» получен. Начинаем готовить…`);
// 	setTimeout(cb, 3000);
// }

// const readBook = function () {
// 	console.log('Читаю книгу «Колдун и кристалл»…');
// }

// const eatPizza = function () {
// 	console.log('Ура! Пицца готова, пора подкрепиться.');
// }

// makePizza('Пеперонни', eatPizza);
// readBook();

// const washCar = (carName, callback) => {
// 	console.log(`your car ${carName} is washing now`);
// 	setTimeout(callback, 2000)
// };

// const carIsReady = function () {
// 	console.log(`car is washed,you can ride now`);
// };
// washCar("Volvo", carIsReady);
// const readPaper = (paperName) => {
// 	console.log(`now you are readind ${paperName}`);
// };
// readPaper("New York times");



// class Hamburger {
// 	#price;
// 	#calories;
// 	#size;
// 	#stuffing;
// 	#topping;
// 	#stuff=['cheese','salad','potato'];
// 	#topp=['spice','mayonnaise'];
// 	#sizeArr=['small','big'];
// 	constructor(stuffing = this.#stuff[Math.floor(Math.random()*this.#stuff.length)], size= this.#sizeArr[Math.floor(Math.random()*this.#sizeArr.length)]) {
// 		this.#size = size;
// 		this.#stuffing = stuffing;
// 		if(!this.#stuff.includes(stuffing)){
// 			this.#stuffing = "";
// 			console.log(`такой начинки нет, можно выбрать один из вариантов: ${this.#stuff.join(", ")}`)	
// 		};
// 		if(!this.#sizeArr.includes(size)){
// 			this.#size = "";
// 			console.log(`такого размера нет, можно выбрать один из вариантов: ${this.#sizeArr.join(", ")}`)	
// 		}

// 	}
// 	changeStuffing (stuffing){
// 		this.#stuffing=stuffing;
// 	}
// 	changeSize(size){
// 		this.#size=size;
// 	}
// 	addTopping(topping) {
// 		if(this.#topp.includes(topping)){
// 			this.#topping = topping;
// 		} else console.log(`такой добавки нет, можно выбрать один из вариантов: ${this.#topp.join(", ")}`)

// 	} // Добавить добавку }
// 	removeTopping() {
// 		if (this.#topping) {
// 			this.#topping=null;
// 		} else {
// 			console.log('добавок еще нет')
// 		}
// 	} // Убрать добавку }
// 	getToppings() {
// 		console.log(` можно выбрать один из вариантов: ${this.#topp.join(", ")}`);
// 		if (this.#topping) {
// 			console.log(`гамбургер уже содержит добавку ${this.#topping}`);
// 			return this.#topping;
// 		} else console.log('добавок нет');


// 	} // Получить список добавок }
// 	getSize() {
// 		if (this.#size) {
// 			console.log(`размер гамбургера ${this.#size}`);
// 			return this.#size;
// 		} else console.log('размер не выбран');


// 	} // Узнать размер гамбургера }
// 	getStuffing() {
// 		console.log(`можно выбрать начинку: ${this.#stuff.join(", ")}`)
// 		if (this.#stuffing) {
// 			console.log(`сейчас начинка гамбургера ${this.#stuffing}`);
// 			return this.#stuffing;
// 		} else console.log('начинка не выбрана');

// 	} // Узнать начинку гамбургера }

// 	calculatePriceCalories() {
// 		this.#price = 0;
// 		this.#calories = 0;
// 		if (this.#size === 'small') {
// 			this.#price += 50;
// 			this.#calories += 20;

// 		} else if (this.#size === 'big') {
// 			this.#price += 100;
// 			this.#calories += 40;
// 		};
// 		if (this.#stuffing === 'chease') {
// 			this.#price += 10;
// 			this.#calories += 20;
// 		} else if (this.#stuffing === 'salad') {
// 			this.#price += 20;
// 			this.#calories += 5;
// 		} else if (this.#stuffing === 'potato') {
// 			this.#price += 15;
// 			this.#calories += 10;
// 		};
// 		if (this.#topping === 'spice') {
// 			this.#price += 15;
// 		} else if (this.#topping === 'mayonnaise') {
// 			this.#price += 20;
// 			this.#calories += 5;
// 		}

// 		console.log(`стоимость бургера сейчас ${this.#price} рублей, калорийность бургера сейчас ${this.#calories} калорий`);

// 	} // Узнать цену и калорийность}

// }
// console.log('Маленький (50 рублей, 20 калорий).Большой (100 рублей, 40 калорий).Гамбургер может быть с одним из нескольких видов начинок (обязательно): С сыром (+10 рублей, +20 калорий).С салатом (+20 рублей, +5 калорий).С картофелем (+15 рублей, +10 калорий). Дополнительно гамбургер можно посыпать приправой (+15 рублей, +0 калорий) и полить майонезом (+20 рублей, +5 калорий)')
// //const burger = new Hamburger('big', 'chease');

// class SmallHamburger extends Hamburger {
// 	constructor(stuffing, size = 'small') {
// 		super(stuffing, size);
// 	}
// }
// class BigHamburger extends Hamburger {
// 	constructor(stuffing, size = 'big') {
// 		super(stuffing, size);
// 	}
// }