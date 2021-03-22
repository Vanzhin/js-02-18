const API_URL = 'https://dmhlupin.github.io/';

Vue.component('cart-items',{
    props:['cart','full'],
    template: `
        
        <div class="cartSection">
            <h3 class="cartHeader" v-if="cart.length>0">Ваша корзина:</h3>
            <h3 class="cartHeader" v-if="cart.length===0">Ваша корзина пуста!</h3>
            <div class="cartItem cartItemNaming" v-if="cart.length>0">
                <div></div>
                <h3>Наименование</h3>   
                <p>Цена</p>
                <p>Количество</p>
            </div>
            <cart-item v-for="(item) in cart"
                v-bind:item="item"
                v-bind:key="item.id_product"
                
                v-on:addItem="$emit('add', $event)"
                v-on:removeItem="$emit('remove', $event)"
                >
                    
            </cart-item>
            <div v-if="cart.length>0" class="fullCartPrice">Полная стоимость товаров: {{full}} рублей </div>  
        </div>
    `
})


Vue.component('cart-item',{
    props:['item','full'],
    template: `
        <div class="cartItem">
            <img v-bind:src="pathToImage(item.id_product)" class="cartItemImg" alt="No image"></img>
            <h3>{{item.product_name}}</h3>
            <p>{{item.price}}</p>
            <p>{{item.quantity}}</p>
            <div class="buttonBlock">
                <div class="removeButton" @click="$emit('removeItem',item.id_product)">
                    <i class="fas  fa-minus"></i>
                </div>
                <div class="addButton" @click="$emit('addItem',item)">
                    <i class="fas  fa-plus"></i>
                </div>
            </div>
        </div>
    `,
    methods: {
        pathToImage(id) {
            return `./img/${id}.jpg`;
        }
    }
})

Vue.component('goods-list', {
    props:['fgoods'],
    template: `
    <div class="goods-list">
        <goods-item v-for="item in fgoods"
                v-bind:item="item"
                v-bind:key="item.id_product"
                @addItem="$emit('add', item)"
        >
        </goods-item>
    </div>

    `

})

Vue.component('goods-item',{
    props:['item'],
    template: `
    <div class="goods-item">
        <img v-bind:src="pathToImage(item.id_product)" class="itemImg" alt="No image"></img>
        <h3> {{item.product_name}} </h3>
        <p> {{item.price}} </p>
        <div class="addToCart" @click="$emit('addItem', item)"> В корзину </div>
    </div>`
        ,
    methods: {
        pathToImage(id) {
            return `./img/${id}.jpg`;
        }
    }

})

Vue.component('goods-empty',{
    template: `
        <div class="emptyBlock">По вашему запросу товаров нет</div>
    `
})

Vue.component('goods-error',{
    template: `
        <div class="emptyBlock">
            Доступ к серверу органичен!
        </div>
    
    `
})

Vue.component('search',{
    props:['sline'],

    template:`
        <div class="searchContainer">
            <input type="text" class="goods-search" v-model="this.sline"/>
            <button class="search-button" type="button" @click="$emit('start-search',this.sline)">Искать</button>
        </div>
    `
})

const app = new Vue({
    el: "#app",
    data: {
        goods: [],
        cartGoods: [],
        filteredGoods: [],
        searchLine: "",
        cartVisibility: false,
        connected: false
    },

    created() {
        this.fetchGoods();
        this.fetchCart();
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
                console.log(`Загрузка товаров из ${API_URL}/response.json...`)
                const request = await fetch(`${API_URL}/response.json`);
                const goods = await request.json();
                this.connected = true;
                this.goods = goods;
                this.filteredGoods = goods;
                console.log(`Загрузка товаров завершена!`);
            } catch (err) {
                this.connected = false;
                console.log(`Невозможно загрузить товары!`, err);
            }
        },
        async fetchCart() {
            try {
                console.log(`Загрузка корзины...`);
                const response = await fetch(`${API_URL}/getBasket.json`);
                const goods = await response.json();
                this.connected = true;
                this.cartGoods = goods.contents;
                console.log(`загрузка корзины завершена!`);  
                console.log(this.cartGoods);  
            } catch (err) {
                this.connected = false;
                console.log(err);
            }
        },
        filterGoods(line) {
            this.searchLine = line;
            const regexp = new RegExp(this.searchLine, 'i');
            this.filteredGoods = this.goods.filter(good => regexp.test(good.product_name));
        },
        clearFilter() {
            this.searchLine='';
            this.filterGoods();
        },
        async addItem(item) { // - метод для добавления элемента в корзину
            try {
                const answer = await fetch(`${API_URL}/addToBasket.json`);
                const response = await answer.json();
                if (response.result !== 0) {
                    this.connected = true;
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
                this.connected = false;
                console.log(err)
            }
        },
        removeItem(id) { // - метод удаления элемента из корзины
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
        }
    }
}
)