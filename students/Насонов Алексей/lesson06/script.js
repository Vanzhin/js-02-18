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

Vue.component('goods-search', {
    props: ['value'],
    template: `
        <input v-bind:value="value" v-on:input="handleInput" type="text" class="search" />
    `,
    methods: {
        handleInput(event) {
            this.$emit('change', event.target.value);
        }
    }
});


Vue.component('goods-list', {
    props: ['filteredGoods'],
    template: `
        <section class="goods">
            <goods-item
                v-for="item in filteredGoods"
                v-bind:key="item.id"
                v-bind:item="item"
                v-on:add="$emit('add-item', $event)"
            />
            <goods-empty v-if="filteredGoods.length === 0" />
        </section>
    `,
});

Vue.component('goods-item', {
    props: ['item'],
    template: `
        <div class="item">
            <h2>{{ item.product_name }}</h2>
            <p>{{ item.price }}</p>
            <button name="add-to-basket" v-on:click.prevent="$emit('add', item)">Add to basket</button>
        </div>
    `,
});

Vue.component('goods-empty', {
    template: `
        <div class="goods--empty">
            Нет товаров
        </div>
    `,
});

Vue.component('v-basket', {
    props: ['goods', 'total'],
    template: `
        <div class="basket">
            <div class="basket-item" v-for="item in goods">
                <h4>{{ item.title }}</h4>
                <p>{{ item.price }} x {{ item.quantity }}</p>
                <button v-on:click="$emit('remove-item', item.id)">
                    Удалить
                </button>
            </div>
            <p class="basket-total">Общая стоимость: <b>{{ total }}</b></p>
        </div>
    `,
});

Vue.component('v-error', {
    template: `
        <div class="error">Что-то пошло не так</div>
    `,
});

new Vue({
    el: '#app',
    data: {
        goods: [],
        searchValue: '',
        basketGoods: [],
        isBasketVisible: false,
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
        total() {
            return this.goods.reduce(
                (accumulator, currentElement) => accumulator + currentElement.price,
                0
            );
        }
    },
    methods: {
        async fetchGoods() {
            try {
                const res = await fetch(`${API_ROOT}/catalogData.json`);
                const goods = await res.json();
                this.goods = goods;
            } catch (err) {
                console.log(`Can't fetch data`, error);
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
        handleRemoveItem(id) {
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

//Vue.component('goods-list', {
//  props: ['goods'],
//  template: `
//    <section class="goods">
//      <goods-item v-for="good in goods" :good="good"></goods-item>
//    </section>
//  `
//});


//Vue.component('goods-item', {
//  props: ['good'],
//  template: `
//    <div class="item">
//      <h3>{{ good.product_name }}</h3>
//      <p>{{ good.price }}</p>
//      <button name="add-to-basket" v-on:click.prevent="addItem(good)">Add to basket</button>
//    </div>
//  `
//});


