const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

new Vue({
    el: '#app',
    data: {
        goods: [],
        cartGoods: [],
        filteredGoods: [],
        cartVisibility: false,
        searchLine: ''
    },
    created() {
        this.fetchCart();
        this.fetchGoods();
    },
    computed: {
        fullPrice() {
            return this.cartGoods.reduce((acc, curr) => {
                return acc + curr.price*curr.quantity
            }, 0);
        },
        
    },
    methods: {
        async fetchGoods() {
            try {
                console.log(`Загрузка товаров...`)
                const request = await fetch(`${API_URL}/catalogData.json`);
                const goods = await request.json();
                this.goods = goods;
                this.filteredGoods = goods;
                console.log(`Загрузка товаров завершена!`);
                
            } catch (err) {
                console.log(`Невозможно загрузить товары!`, err);
            }
        },
        async fetchCart() {
            try {
                console.log(`Загрузка корзины...`);
                const response = await fetch(`${API_URL}/getBasket.json`);
                const goods = await response.json();
                this.cartGoods = goods.contents;
                console.log(`загрузка корзины завершена!`);  
                console.log(this.cartGoods);  
            } catch (err) {
                console.log(err);
            }
        },
        
    async addItemToCart(item) { // - метод для добавления элемента в корзину
        try {
            const answer = await fetch(`${API_URL}/addToBasket.json`);
            const response = await answer.json();
            if (response.result !== 0) {
                const itemIndex = this.cartGoods.findIndex((goodsItem) => goodsItem.id_product === item.id_product);
                if (itemIndex > -1) {
                    this.cartGoods[itemIndex].quantity += 1;
                } else {
                    this.cartGoods.push({
                        ...item,
                        quantity: 1
                    });
                }
            } else {
                console.log(`Не получается загрузить корзину на сервер...`)
            }

        } catch (err) {
            console.log(err)
        }
    },
    removeItemFromCart(id) { // - метод удаления элемента из корзины
        const itemIndex = this.cartGoods.findIndex((goodsItem) => goodsItem.id_product === id);
        if (itemIndex > -1) {
            if (this.cartGoods[itemIndex].quantity > 1) {
                this.cartGoods[itemIndex].quantity -= 1;
            } else {
                this.cartGoods = this.cartGoods.filter((item) => item.id_product !== +id);
            }
        } else {
            console.log(`Нет такого элемента в корзине`)
        }

    },
        pathToImage(id) {
            return `./img/${id}.jpg`;
        },
        filterGoods() {
            const regexp = new RegExp(this.searchLine, 'i');
            this.filteredGoods = this.goods.filter(good => regexp.test(good.product_name));
        },
        clearFilter() {
            this.searchLine='';
            this.filterGoods();
        }

    }
});