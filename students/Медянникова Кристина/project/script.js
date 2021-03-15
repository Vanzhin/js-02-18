'use strict';

/*const API_ROOT = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
const request = (path = '', method = 'GET', body) => {
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
                    console.error(xhr.responseText);
                    reject(xhr.responseText);
                }
            }
        }
        
        xhr.open(method, `${API_ROOT}/${path}`);
        
        xhr.send(body);
    });
}
*/

new Vue({
    el: '#app',
    data: {
        goods_list: [
            { product_name: 'Футболка', price: 1500 },
            { product_name: 'Куртка', price: 6000 },
            { product_name: 'Джинсы', price: 5000 },
        ],
        searchValue: '',
        basketGoods: [],  
        isVisibleBasket: false,
    },

    created() {
        this.fetchGoods();
        this.fetchBasket();
    },
    computed: {
        filteredGoods() {
            const regexp = new RegExp(this.searchValue, 'i');
            return this.goods_list.filter((goodsItem) => 
                regexp.test(goodsItem.product_name)
            );
        },
        total() {
            return this.basketGoods.reduce(
                (accumulator, currentElement) => accumulator + (currentElement.price * quantity),
                0
            );
        }
    },
    methods: {
        async fetchGoods() {
            try {
                //const res = await fetch(`${API_ROOT}/catalogData.json`);
                const goods_list = await res.json();
                this.goods_list = goods_list;
            } catch (err) {
                console.log(`Can't fetch data`, error);
                throw new Error(error);
            }
        },
        fetchBasket() {
            request('getBasket.json')
                .then((goods_list) => {
                    this.basketGoods = goods_list.contents;
                    console.log('basket', this.basketGoods);
                })
                .catch((error) => {
                    console.log(`Can't fetch basket data`, error);
                });
        },
        addItem(item) {
            request('addToBasket.json')
                .then((response) => {
                    if (response.result !== 0) {
                        const itemIndex = this.basketGoods.findIndex((goodsItem) => goodsItem.id_product === item.id_product);
                        if (itemIndex > -1) {
                            this.basketGoods[itemIndex].quantity += 1;
                        } else {
                            this.basketGoods.push({ ...item, quantity: 1 });
                        }
                        console.log(this.basketGoods);
                    } else {
                        console.error(`Can't add item to basket`, item, this.basketGoods);
                    }
                })
        },
        removeItem(id) {
            request('deleteFromBasket.json')
                .then((response) => {
                    if (response.result !== 0) {
                        this.basketGoods = this.basketGoods.filter((goodsItem) => goodsItem.id_product !== parseInt(id));
                        console.log(this.basketGoods);
                    } else {
                        console.error(`Can't remove item from basket`, item, this.basketGoods);
                    }
                });
        }
    },
});