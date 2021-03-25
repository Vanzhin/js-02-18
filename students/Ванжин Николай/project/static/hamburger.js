class Hamburger {
	#price;
	#calories;
	#size;
	#stuffing;
	#topping;
	#stuff=['cheese','salad','potato'];
	#topp=['spice','mayonnaise'];
	#sizeArr=['small','big'];
	constructor(stuffing = this.#stuff[Math.floor(Math.random()*this.#stuff.length)], size= this.#sizeArr[Math.floor(Math.random()*this.#sizeArr.length)]) {
		this.#size = size;
		this.#stuffing = stuffing;
		if(!this.#stuff.includes(stuffing)){
			this.#stuffing = "";
			console.log(`такой начинки нет, можно выбрать один из вариантов: ${this.#stuff.join(", ")}`)	
		};
		if(!this.#sizeArr.includes(size)){
			this.#size = "";
			console.log(`такого размера нет, можно выбрать один из вариантов: ${this.#sizeArr.join(", ")}`)	
		}

	}
	changeStuffing (stuffing){
		this.#stuffing=stuffing;
	}
	changeSize(size){
		this.#size=size;
	}
	addTopping(topping) {
		if(this.#topp.includes(topping)){
			this.#topping = topping;
		} else console.log(`такой добавки нет, можно выбрать один из вариантов: ${this.#topp.join(", ")}`)

	} // Добавить добавку }
	removeTopping() {
		if (this.#topping) {
			this.#topping=null;
		} else {
			console.log('добавок еще нет')
		}
	} // Убрать добавку }
	getToppings() {
		console.log(` можно выбрать один из вариантов: ${this.#topp.join(", ")}`);
		if (this.#topping) {
			console.log(`гамбургер уже содержит добавку ${this.#topping}`);
			return this.#topping;
		} else console.log('добавок нет');


	} // Получить список добавок }
	getSize() {
		if (this.#size) {
			console.log(`размер гамбургера ${this.#size}`);
			return this.#size;
		} else console.log('размер не выбран');


	} // Узнать размер гамбургера }
	getStuffing() {
		console.log(`можно выбрать начинку: ${this.#stuff.join(", ")}`)
		if (this.#stuffing) {
			console.log(`сейчас начинка гамбургера ${this.#stuffing}`);
			return this.#stuffing;
		} else console.log('начинка не выбрана');

	} // Узнать начинку гамбургера }

	calculatePriceCalories() {
		this.#price = 0;
		this.#calories = 0;
		if (this.#size === 'small') {
			this.#price += 50;
			this.#calories += 20;

		} else if (this.#size === 'big') {
			this.#price += 100;
			this.#calories += 40;
		};
		if (this.#stuffing === 'chease') {
			this.#price += 10;
			this.#calories += 20;
		} else if (this.#stuffing === 'salad') {
			this.#price += 20;
			this.#calories += 5;
		} else if (this.#stuffing === 'potato') {
			this.#price += 15;
			this.#calories += 10;
		};
		if (this.#topping === 'spice') {
			this.#price += 15;
		} else if (this.#topping === 'mayonnaise') {
			this.#price += 20;
			this.#calories += 5;
		}

		console.log(`стоимость бургера сейчас ${this.#price} рублей, калорийность бургера сейчас ${this.#calories} калорий`);

	} // Узнать цену и калорийность}

}
console.log('Маленький (50 рублей, 20 калорий).Большой (100 рублей, 40 калорий).Гамбургер может быть с одним из нескольких видов начинок (обязательно): С сыром (+10 рублей, +20 калорий).С салатом (+20 рублей, +5 калорий).С картофелем (+15 рублей, +10 калорий). Дополнительно гамбургер можно посыпать приправой (+15 рублей, +0 калорий) и полить майонезом (+20 рублей, +5 калорий)')
//const burger = new Hamburger('big', 'chease');

class SmallHamburger extends Hamburger {
	constructor(stuffing, size = 'small') {
		super(stuffing, size);
	}
}
class BigHamburger extends Hamburger {
	constructor(stuffing, size = 'big') {
		super(stuffing, size);
	}
}