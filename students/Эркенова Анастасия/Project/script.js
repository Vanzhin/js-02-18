const API_ROOT = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
const request = (path = '', method = 'GET', body) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    console.log({ response: xhr.responseText });
                    resolve(JSON.parse(xhr.responseText));
                } else {
                    console.error(xhr.responseText);
                    reject(xhr.responseText);
                }
            }
        }

        xhr.open(method, `${API_ROOT}/${path}`);

        xhr.send(body);
    });
}


Vue.component('goods-list', {
    props: ['filteredGoods'],
    template: `
    <section class="goods">
        <goods-item 
        v-for="item in filteredGoods"
        v-bind:key="item.id_product" 
        v-bind:item="item" 
        v-on:add="handleAddItem"
        />
        <goods-empty v-if="filteredGoods.lenght === 0" />
    </section>
    `,
    methods: {
        handleAddItem(item) {
            this.$emit('add-item', item)
        }
    }
});

Vue.component('goods-item', {
    props: ['item'],
    template: `
    <div class="item">
        <h2>{{ item.product_name }}</h2>
        <p>{{ item.price }}</p>
        <button class="add-to-basket" name="add-to-basket" v-on:click.prevent="handleAdd(item)">Add to basket</button>
    </div>
    `,
    methods: {
        handleAdd(item) {
            this.$emit('add', item)
        }
    }
});

Vue.component('goods-empty', {
    template: `
    <div class="goods_empty">
     «Нет данных» 
     </div>
     `,
});
Vue.component('goods-search', {
    props: ['value'],
    template: `
    <input type="text" class="search" v-bind:value="value" v-on:input="handleInput" />
    `,
    methods: {
        handleInput(event) {
            this.$emit('input', event.target.value)
        }
    }
});

Vue.component('basket', {
    props: ['basketGoods', 'calcTotalPrice'],
    template: `
    <div class="basket">
        <div class="basket_item" v-for="item in basketGoods">
            <h3>{{ item.product_name }}</h3>
            <p>{{ item.price }} x {{ item.quantity }}</p>
            <button class="delete_button" v-on:click="$emit('remove-item', item.id_product)"> - </button>
        </div>
        <div class="calcTotalPrice">Общая стоимость: {{ calcTotalPrice }}</div>
    </div>
    `,
});

Vue.component('error', {
    template: `
    <div class="error">
     «Не удаётся выполнить запрос к серверу» 
    </div>
    `,
});

new Vue({
    el: '#app',
    data: {
        goods: [],
        searchValue: '',
        basketGoods: [],
        isVisibleCart: false,
        isError: false,
    },
    created() {
        this.fetchGoods();
        this.fetchBasket();
    },
    computed: {
        filteredGoods() {
            const regexp = new RegExp(this.searchValue, 'i');
            return this.goods.filter((goodsItem) =>
                regexp.test(goodsItem.product_name)
            );
        },
        calcTotalPrice() {
            return this.basketGoods.reduce((result, cur) => {
                return result + cur.price * cur.quantity
            }, 0)
        },
    },
    methods: {
        async fetchGoods() {
            try {
                const res = await fetch(`${API_ROOT}/catalogData.json`);
                const goods = await res.json();
                this.goods = goods;
            } catch (err) {
                console.log(`Can't fetch data`, error);
                this.isError = true;
                throw new Error(error);
            }
        },
        fetchBasket() {
            request('getBasket.json')
                .then((goods) => {
                    this.basketGoods = goods.contents;
                    console.log('basket', this.basketGoods);
                })
                .catch((error) => {
                    console.log(`Can't fetch basket data`, error);
                    this.isError = true;
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