const API_ROOT = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
const request = (path = '', method = 'GET', body) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    console.log({response: xhr.responseText});
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
    el: '#app',
    data: {
        goods: [],
        searchValue: '',
        basketGoods: [],
        banana: "display:none",
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
        basketTotal() {
            return this.basketGoods.reduce(
                (accumulator, currentElement) => accumulator + currentElement.price * currentElement.quantity,
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
            } catch (error) {
                console.log(`Can't fetch data`, error);
                throw new Error(error);
            }
        },
        // дублирует isVisibleCart, работает с внутр. аттрибутом
        bananaChanger() {
            if (this.banana == "display:none") {
                this.banana = "display:block"
            } else {
                this.banana = "display:none"
            }
        },
        isVisibleCart() {
            let modal = document.querySelector('.modal');
            if (modal.style.display === 'block') {
                modal.style.display = 'none';
            } else {
                modal.style.display = 'block';
            }
        },
        async fetchBasket() {
            try {
                const res = await fetch(`${API_ROOT}/getBasket.json`);
                const goods = await res.json();
                this.basketGoods = goods.contents;
            } catch (error) {
                console.log(`Can't fetch data`, error);
                throw new Error(error);
            }
        },
        async addItem(item) {
            try {
                const res = await fetch(`${API_ROOT}/addToBasket.json`);
                const response = await res.json();
                    if (response.result !== 0) {
                        const itemIndex = this.basketGoods.findIndex((goodsItem) => goodsItem.id_product === item.id_product);
                        if (itemIndex > -1) {
                            this.basketGoods[itemIndex].quantity += 1;
                        } else {
                            this.basketGoods.push({...item, quantity: 1});
                        console.log(itemIndex)
                        }}
            } catch (err) {
                console.error(`Can't add item to basket`, item, this.basketGoods, err);;
            }
        },
        async removeItem(item) {
            try {
                const res = await fetch(`${API_ROOT}/deleteFromBasket.json`);
                const response = await res.json();
                    if (response.result !== 0) {
                        this.basketGoods = this.basketGoods.filter((goodsItem) => goodsItem.id_product !== parseInt(item.id_product));
            }
        } catch(err) {
            console.error(`Can't remove item from basket`, item, this.basketGoods, err);
        }
        },
    },
});
