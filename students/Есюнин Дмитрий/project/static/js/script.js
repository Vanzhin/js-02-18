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
                v-bind:key="item.id"
                v-bind:item="item"
                v-on:add="$emit('add-item', $event)"
            />
            <goods-empty v-if="filteredGoods.length === 0" />
        </section>
    `,
    // methods: {
    //     handleAddItem(item) {
    //         this.$emit('add-item', item);
    //     }
    // }
});

Vue.component('goods-item', {
    props: ['item'],
    template: `
        <div class="item">
            <h2>{{ item.title }}</h2>
            <p>{{ item.price }}</p>
            <button name="add-to-basket" v-on:click.prevent="$emit('add', item)">Add to basket</button>
        </div>
    `,
    // methods: {
    //     handleAdd() {
    //         this.$emit('add', this.item);
    //     }
    // }
});


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

Vue.component('v-error', {
    template: `
        <div class="error">Что-то пошло не так</div>
    `,
});

Vue.component('goods-empty', {
    template: `
        <div class="goods--empty">
            Нет товаров
        </div>
    `,
});


new Vue({
    el: '.app',
    data: {
        goods: [],
        searchValue: '',
        basketGoods: [],
        basketVisible: false,
        mytotal:0
    },
    created() {
        this.fetchGoods();
        this.fetchBasket();
    },
    computed: {
        quantity(){
          const qntty = this.basketGoods.reduce(
            (accumulator, currentElement) => accumulator + currentElement.quantity,
            0
           );        
          return (qntty > 9) ? "9+" : (qntty > 0) ? qntty : "";
        },
        filteredGoods() {
            const regexp = new RegExp(this.searchValue, 'i');			
            return this.goods.filter((goodsItem) => 
                regexp.test(goodsItem.product_name)
            );
			
        },
        total() {
            return this.basketGoods.reduce(
                (accumulator, currentElement) => accumulator + currentElement.price *  currentElement.quantity,
                0
            );
        }
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
                    console.log('basket', this.basketGoods);
                })
                .catch((error) => {
                    console.log(`Can't fetch basket data`, error);
                    this.isError = true;
                });
        },

        addItem(item, quantity = 1) {
            fetch(`${API_ROOT}/basket-goods`, {
                method: 'POST',
                body: JSON.stringify({item, quantity}),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then((response) => {
                    if (response.result !== 0) {
                        const itemIndex = this.basketGoods.findIndex((goodsItem) => goodsItem.id === item.id);
                        if (itemIndex > -1) {
                            if (this.basketGoods[itemIndex].quantity + quantity <= 0) return this.handleRemoveItem(this.basketGoods[itemIndex].id);
                            this.basketGoods[itemIndex].quantity += quantity;
                            
                        } else {
                            this.basketGoods.push({ ...item, quantity });
                        }
                        console.log(this.basketGoods);
                    } else {
                        console.error(`Can't add item to basket`, item, this.basketGoods);
                    }
                })
        },

        async handleRemoveItem(id) {
            const rawResponse = await fetch(`${API_ROOT}/basket-goods/${id}`, {
                method: 'DELETE',
            });
            const response = await rawResponse.json();

            if (response.result !== 0) {
                this.basketGoods = this.basketGoods.filter((goodsItem) => goodsItem.id !== parseInt(id));
                console.log(this.basketGoods);
            } else {
                console.error(`Can't remove item from basket`, item, this.basketGoods);
            }
        },        
        getImageSrc(item){
            if (Array.isArray(item['images'])) return item.images[0];
            return "./img/no-photo-available.jpg";            
        }
            
    },
});
