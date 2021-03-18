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



new Vue({
		el: '#app',
		data: {
			goods: [],
			filterGoods: [],
			searchValue: '',
			basketGoods: [],

		},
		created() {
			this.fetchData();
			// this.fetchBasket();
		},
		methods: {
			fetchData() {
				return new Promise(() => {
					request('catalogData.json').then((goods) => {
						this.goods = goods;
						this.filterGoods = goods;
					}).catch((data) => {
						console.log(data);
					});
				})
			},
			fetchBasket() {
				request('getBasket.json').then((goods) => {
					this.basketGoods = goods.contents;
					console.log(this.basketGoods);
				}).catch((data) => {
					console.log(data);
				});

			},

			addItem(item) {
				request('addToBasket.json').then((response) => {
					if (response.result === 1) {
						if (!this.basketGoods.find((goodsItem) => goodsItem.id_product === parseInt(item.id_product))) {
							this.basketGoods.push(item);
							item.quantity = 1;
						} else {
							this.basketGoods.find((goodsItem) => goodsItem.id_product === parseInt(item.id_product)).quantity += 1;
						};
						console.log(this.basketGoods);

					}
				})

			},
			reduceItem(id) {
				request('deleteFromBasket.json').then((response) => {
					if (response.result === 1) {

						let itemQuantity = this.basketGoods.find((goodsItem) => goodsItem.id_product === parseInt(id)).quantity -= 1;
						console.log(this.basketGoods);
						if (itemQuantity === 0) {
							this.removeItem(id)
						}

					}
				})

			},

			removeItem(id) { // удаляю товар из корзины
				request('deleteFromBasket.json').then((response) => {
					if (response.result === 1) {
						if (this.basketGoods.find((goodsItem) => goodsItem.id_product === parseInt(id))) {
							let newGoods = this.basketGoods.filter((item) => item.id_product !== parseInt(id));
							this.basketGoods = newGoods;

						};
					}
				});
			},
			filteredGoods() {
				const regexp = new RegExp(this.searchValue, 'i');
				console.log("search done")
				return this.filterGoods = this.goods.filter((goodsItem) => regexp.test(goodsItem.product_name));

			},

		},
		computed: {

			total() {
				return this.basketGoods.reduce(function (sum, current) { //цена всех товаров
					if (!isNaN(current.price)) {
						return sum + current.price * current.quantity;
					} else
						return sum;
				}, 0);

			},
			totalQuantity() {
				return this.basketGoods.reduce(function (sum, current) { //цена всех товаров
					if (!isNaN(current.quantity)) {
						return sum + current.quantity;
					} else
						return sum;
				}, 0);
			},
		},
	}

)






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