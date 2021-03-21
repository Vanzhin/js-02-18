'use strict';

const API_ROOT = 'http://localhost:3000/api';


 
const request = (path = '', method = 'GET', body) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    console.log({ response: xhr.responseText });
                    resolve(JSON.parse(xhr.responseText));
                } else {
                    reject(xhr.responseText);
                }
            }
        };
        
        xhr.open(method, `${API_ROOT}/${path}`);

        xhr.setRequestHeader('Content-Type', 'application/json');
        
        xhr.send(body);
    })
}

Vue.component('goodslist', {
    props: ['goods'],
    template: `
        <div class="goods-list">
            <goods-item v-for="good in goods" 
                :key="good.id"
                :good="good"
                v-on:tobasket="$emit( 'addtobas', good)"
            />
            <goods-list-no v-if="goods.length == 0"/>
        </div>
    `
});
Vue.component('goods-item', {
    props: ['good'],
    template: `
        <div class="goods-item">
            <h3>{{ good.title }}</h3>
            <p>{{ good.price }}</p>
            <button class="product-button"                 
                v-on:click="$emit('tobasket')"
            >Добавить</button>
        </div>
    `
});
Vue.component('goods-list-no', {
    props: ['goods'],
    template: `
        <p class="goods-list-no" >Нет данных.</p>
    `
});
Vue.component('cart-button-block', {
    props: ['basketOpen','quantity'],
    template: `
        <div class="cart-button-block">
            <button class="cart-button" type="button" v-on:click.prevent="$emit( 'basket')">Корзина</button>
            <div class="cart-button-counter" v-if="!basketOpen"><p id="basket_count"> {{ quantity }} </p></div>
        </div>
    `
});
Vue.component('search-blok', {
    props: ['searchv'],
    template: `
        <div class="search-blok">
            <input type="text" class="search" 
                v-on:input="(e) => inputKey(e)"
                v-bind:value="searchv"/>
            <button class="search-button"  v-on:click.prevent="$emit('filter-goods',)">Искать</button>
        </div>
    `,
     methods: {

       //v-on:input="(e) => inputKey(e)"
       // v-on:input="$emit('add-task', e.target.value)"
        inputKey(e) {
            console.log('инпут')
            this.$emit('addtask', e.target.value);
        },
    }
});

Vue.component('v-error', {
    template: `
        <div class="error">Что-то пошло не так</div>
    `,
});

Vue.component('v-basket', {
    props: ['quantity','total','basketGoods'],

    template: `
        <div class="basket">
            <basket-item
                v-for="item, index in basketGoods"
                :key="index"
                :item="item"
                :index="index"
                v-on:remove="$emit('remov', item)"
                v-on:input="$emit('inputu', {item:item, e:$event} )"
            ></basket-item>

            <p class="basket-totall" v-if="quantity !== 0">
                В корзине {{ quantity }} шт. на сумму {{ total }}$ 
            </p>
            <p class="basket-totall" v-else>
                Корзина пуста. 
            </p>
        </div>
    `
});


Vue.component('basket-item', {
    props: ['index','item'

    ],
    template: `
            <div class="basket-item" >
                <h3> {{ index + 1 }}. {{ item.title }}</h3>
                <p> {{ item.price }}$</p>
                <input class="basket-quantity" type="number" required min="0" max="100" 
                v-on:click.prevent ="(e) => inputQuantityClik(e)" v-bind:value="item.quantity"
                >
                <button class="basket-button" type="button"  
                    v-on:click.prevent="buttonClikDelBask"
                >x</button>
            </div>
    `,

    methods: {
        buttonClikDelBask() {
          //  console.log('дел корзина   ' );
            this.$emit('remove');
        },
        inputQuantityClik(e) {
         //   console.log('количество   '+ e.target.value);
            this.$emit('input', e.target.value);
        },

    }
});

new Vue({
        el: '#app',
        data: {
            goods: [],
            searchValue: '',
            searchValueD: '',
            basketGoods: [],
            basketOpen: false,
            name: 'Kont',
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
                    regexp.test(goodsItem.title)
                );
            },
            total() {
                return this.basketGoods.reduce(
                    (accumulator, currentElement) => (accumulator + (currentElement.price*currentElement.quantity ))
                ,0);
            },
            quantity() {
                return this.basketGoods.reduce(
                    (accumulator, currentElement) => (accumulator + (currentElement.quantity ))
                ,0);
            },

        },
        methods: {
            async fetchGoods() {
                try {
                    const res = await fetch(`${API_ROOT}/goods`);
                    const goods = await res.json();
                    this.goods = goods;
                } catch (error) {
                    console.log(`Can't fetch data`, error);
                    this.isError = true;
                    throw new Error(error);
                }
            },
            fetchBasket() {
                request('basket-goods')
                    .then((goods) => {
                        this.basketGoods = goods.contents;
                        //console.log('basket', this.basketGoods);
                    })
                    .catch((error) => {
                        console.log(`Can't fetch basket data`, error);
                        this.isError = true;
                    });
            },
            oldAddItem(item) {
                request('basket-goods', 'POST', JSON.stringify(item))
                    .then((response) => {
                        if (response.result !== 0) {
                            const itemIndex = this.basketGoods.findIndex((goodsItem) => goodsItem.id === item.id);
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
            addItem(item) {
                fetch(`${API_ROOT}/basket-goods`, {
                    method: 'POST',
                    body: JSON.stringify(item),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                    .then((response) => {
                        console.log('' + response.status);
                        if (response.status !== 0) {
                            const itemIndex = this.basketGoods.findIndex((goodsItem) => goodsItem.id === item.id);
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
                fetch(`${API_ROOT}/basket-delete`, {
                    method: 'POST',
                    body: JSON.stringify(id),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })               
                    .then((response) => {
                        console.log(response.status);
                        if (response.status !== 0) {
                            console.log(id);
                            this.basketGoods = this.basketGoods.filter((goodsItem) => goodsItem.id !== parseInt(id.id));
                            console.log(this.basketGoods);
                        } else {
                            console.error(`Can't remove item from basket`, item, this.basketGoods);
                        }
                    });
            },
            filterGoods() {
                console.log('фильтер')
                this.searchValue = this.searchValueD; 
                console.log(this.searchValue)
            },
            basketGoodsOpen() {
                this.basketOpen = ! this.basketOpen
            },

            inputQuantityClik(q){
                if (q.e > 0) {
                    fetch(`${API_ROOT}/basket-quantity`, {
                        method: 'POST',
                        body: JSON.stringify(q),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                        .then((response) => {
                            console.log('изменение колличества ' + response.status);
                            if (response.status !== 0) {
                                q.item.quantity = +q.e
                            } else {
                                console.error(`Can't remove item from basket`, item, this.basketGoods);
                            }
                        })
                } else {
                    this.removeItem(q.item)
                }
            },

            addTask(val) {
                console.log('фильтер ' + val)
                this.searchValueD = val;
            },

            addToBasket(q) {
                console.log('добавить в корзину   ' + q)
                console.dir(q)
            },


        },
    });



