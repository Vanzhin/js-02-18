
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

function createEl(named, attribute = "id", type = "div") {
  let el = document.createElement(type);
  el.setAttribute(attribute, named);
  document.body.appendChild(el);
  return el;
}

createEl("wrapper", "class").innerHTML = `
<header>
<div class="header-wrapp">
  <div class="logo"></div>
  <div class="cart-button" @click="showBasket()"><span class="qntty unselectable">{{quantity}}</span></div>
</div>
</header>
<main>
<div class="main-wrapp">
	<div class="goods-filter">
		<div class="search-icon">
			<input type="text" class="search" v-model="searchValue"/>
		</div>
	</div>
	<div v-if="filteredGoods.length > 0">
		<div class="goods-list" >					
			<div class="goods-item" v-for="item in filteredGoods">
				<img :src="item.images[0]">
				<h3>{{ item.product_name }}</h2>
				<p>{{ item.price }}</p>
				<button class="addbutton" name="add-to-basket" v-on:click.prevent="addItem(item)">Add to basket</button>
			</div>			
		</div>
	</div>
	<div v-else>
		<h3>Пусто</h3>
	</div>
    <div class="modal"></div>
</div>
</main>
<footer>
<div class="footer-wrapp">
</div>
</footer>`;



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

new Vue({
    el: '.wrapper',
    data: {
        goods: [],
        searchValue: '',
        basketGoods: [],
        
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
                (accumulator, currentElement) => accumulator + currentElement.price,
                0
            );
        }
    },
    methods: {
        async fetchGoods() {
            try {
                // const res = await fetch(`${API_ROOT}/catalogData.json`);
                // const goods = await res.json();

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
        showBasket() {


            let msg ="Basket";

            alert(msg);
            





            
        },
          
        
    },
});
