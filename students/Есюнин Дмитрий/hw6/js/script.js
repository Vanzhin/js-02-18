
class GoodList {

  constructor() {
    this.list = {};
  }

  fetchData() {
    this.list = [{
        id_product: 1001,
        product_name: 'Shirt',
        images: ['./img/shirt.jpg'],
        price: 150
      },
      {
        id_product: 1002,
        product_name: 'Socks',
        images: ['./img/socks.jpg', './img/socks.jpg', './img/socks.jpg'],
        price: 50
      },
      {
        id_product: 1003,
        product_name: 'Jacket',
        images: ['./img/jacket.jpg', './img/jacket.jpg'],
        price: 350
      },
      {
        id_product: 1004,
        product_name: 'Shoes',
        images: ['./img/shoes.jpg'],
        price: 250
      }
    ];
  }
}



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
                //const res = await fetch(`${API_ROOT}/catalogData.json`);
                //const goods = await res.json();

                const goods = new GoodList;
                goods.fetchData();
                this.goods = goods.list;

            } catch (err) {
                console.log(`Can't fetch data`, error);
                throw new Error(error);
            }
        },
        fetchBasket() {
            request('getBasket.json')
                .then((goods) => {
                    this.basketGoods = goods.contents;
                    //console.log('basket', this.basketGoods);
                })
                .catch((error) => {
                    console.log(`Can't fetch basket data`, error);
                });
        },
        addItem(item , quantity = 1) {
            request('addToBasket.json')
                .then((response) => {
                    if (response.result !== 0) {
                        const itemIndex = this.basketGoods.findIndex((goodsItem) => goodsItem.id_product === item.id_product);
                        if (itemIndex > -1) {
                            if (this.basketGoods[itemIndex].quantity + quantity <= 0) return this.removeItem(this.basketGoods[itemIndex].id_product);
                            this.basketGoods[itemIndex].quantity += quantity;
                        } else {
                            if (quantity > 0) this.basketGoods.push({ ...item, quantity});
                        }
                        
                        //console.log(this.basketGoods);
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
                        //console.log(this.basketGoods);
                    } else {
                        console.error(`Can't remove item from basket`, item, this.basketGoods);
                    }
                });
        },

          
        
    },
});
