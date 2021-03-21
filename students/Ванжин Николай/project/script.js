const API_ROOT = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
const request = (path = '', method = 'GET', body) => {
	return new Promise((resolve, reject) => {
		let xhr;
		if (window.XMLHttpRequest) {
			xhr = new XMLHttpRequest();
		} else if (window.ActiveXObject) {
			xhr = new ActiveXObject("Microsoft.XMLHTTP");
		}
		isFetchDataObtained
		xhr.open(method, `${API_ROOT}/${path}`);

		xhr.send(body);
	});
}


Vue.component('goods-not-found', {
	template: `<div class="goods-no"><h2>Нет данных</h2>
	<img src="https://autostol63.ru/image/catalog/podbor-tovara1.jpg" style="width: 100px;" alt="no data"></div>`
});
Vue.component('goods-list', {
	props: ['filterGoods', 'isFetchDataObtained'],
	template: `<div class="goods">
	 <goods-not-found v-if="filterGoods.length==0 && isFetchDataObtained" ></goods-not-found>
	 <goods-item v-for="item in filterGoods" v-bind:item='item' v-on:add='handleAddItem'></goods-item>
 </div>`,
	methods: {
		handleAddItem(item) {
			this.$emit('add-item', item);
		}
	}
});
Vue.component('goods-item', {
	props: ['item'],
	template: `<div class="item" >
<img src="https://santehprom-r.ru/image/catalog/photo/armatura/0/prom-r-ru-konv6.png" :alt="item.product_name">
	<h2>{{item.product_name}}</h2>
	<p>{{item.price}}</p>
	<button name="add-to-basket" class="buy" v-on:click.prevent="handleAdd">купить</button>
</div>`,
	methods: {
		handleAdd() {
			this.$emit('add', this.item);
		}
	}
});
Vue.component('search', {
		template: `<div class="search-wrap">
	<input type="text" placeholder="поиск по каталогу" class="search" v-on:input="handleInput">
	<button class="search-btn" v-on:click="handleSearch"><span>найти</span></button>

</div>`,
		methods: {
			handleInput(e) {
				this.inputValue = e.target.value;
			},
			handleSearch() {
				this.$emit('search', this.inputValue);
			}
		},
		data() {
			return {
				inputValue: '',
			};
		}
	}),
	Vue.component('basket', {
		props: ['basketGoods', 'totalSumm'],
		template: ` <div class="basket">
	<h2>В корзине:</h2>
	<div class="basket-item-wrap">
		<basket-item 
		v-for="item in basketGoods" 
		v-if="item.quantity>0"
		v-bind:item='item' 
		v-on:add='handleAddItem'
		v-on:reduce='handleReduceItem'
		v-on:delete='handleDeleteItem'

		></basket-item>		 
	</div>
	<div class="basket-total-price">
		<p>Товаров на сумму: {{totalSumm}} RUB</p>
	</div>
</div>`,
		methods: {
			handleAddItem(item) {
				this.$emit('add-item', item);
			},
			handleReduceItem(item) {
				this.$emit('reduce-item', item);
			},
			handleDeleteItem(item) {
				this.$emit('delete-item', item);
			},
		}
	}),
	Vue.component('basket-item', {
		props: ['item'],
		template: `<div class="basket-item">
					<h2>{{item.product_name}}</h2>
					<p>{{item.price}} RUB</p>
					 <p>количество: {{item.quantity}}</p>
					 <button class="add-btn" v-on:click="handleAdd">+</button>
					 <button class="reduce-btn" v-on:click="handleReduce">-</button>
					<button class="delete-btn" v-on:click="handleDelete">удалить</button>
				 </div>`,
		methods: {

			handleAdd() {
				this.$emit('add', this.item);
			},
			handleReduce() {
				this.$emit('reduce', this.item.id_product);
			},
			handleDelete() {
				this.$emit('delete', this.item.id_product);
			},

		}
	}),
	Vue.component('error', {
		props: ['errorData'],
		template: `
	<div class="error"><h2>Что-то пошло не так. <br></h2>
	<p>Код ошибки: <b>{{errorData}}</b></p>
	</div>
	`
	}),
	new Vue({
			el: '#app',
			data: {
				goods: [],
				filterGoods: [],
				searchValue: '',
				basketGoods: [],
				isBasketVisible: false,
				isFetchDataObtained: true,
				errorServer: '',

			},
			created() {
				this.fetchData();
				// this.fetchBasket();
			},
			methods: {
				valueFromChild(data) {
					return this.searchValue = data
				},
				fetchData() {
					return new Promise(() => {
						request('catalogData.json').then((goods) => {
							this.goods = goods;
							this.filterGoods = goods;
						}).catch((data) => {
							console.log("can not access data from server", data);
							this.errorServer = data
							this.fetchDataError()
						});
					})
				},
				fetchDataError() {
					this.isFetchDataObtained = false;
					console.log(this.errorServer);
				},
				fetchBasket(callback) {
					request('getBasket.json').then((goods) => {
						this.basketGoods = goods.contents;
						console.log(this.basketGoods);
						callback();

					}).catch((data) => {
						console.log(data);
					});

				},
				changeVisibility() {
					console.log(this.basketGoods);
					this.isBasketVisible = !this.isBasketVisible;


				},

				addItem(item) {
					request('addToBasket.json').then((response) => {
						if (response.result === 1) {
							if (!this.basketGoods.find((goodsItem) => goodsItem.id_product === parseInt(item.id_product))) {
								this.basketGoods.push(item);
								this.$set(item, 'quantity', 1);
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
								console.log(this.basketGoods);

							};
						}
					});
				},
				filteredGoods() {
					console.log(this.searchValue)

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