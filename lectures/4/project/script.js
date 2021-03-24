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

class GoodsItem {
    constructor(item) {
        this.item = item;
    }

    render() {
        return `
            <div class="item" data-id="${this.item.id_product}">
                <h2>${this.item.product_name}</h2>
                <p>${this.item.price}</p>
                <button name="add-to-basket">Add to basket</button>
            </div>
        `;
    }
}

class GoodsList {
    constructor(basket) {
        this.basket = basket;
        this.goods = [];
        this.filteredGoods = [];

        document.querySelector('.goods').addEventListener('click', (event) => {
            if (event.target.name === 'add-to-basket') {
                const itemId = event.target.parentElement.dataset.id;
                const item = this.goods.find((goodsItem) => goodsItem.id_product === parseInt(itemId));
                if (typeof item !== 'undefined') {
                    this.addToBasket(item);
                } else {
                    console.error(`Can't find element with id ${itemId}`);
                }
            }
        });

        document.querySelector('.search').addEventListener('input', (event) => {
            this.filterGoods(event.target.value);
        });
    }

    fetchData() {
        return new Promise((resolve, reject) => {
            request('catalogData.json')
                .then((goods) => {
                    this.goods = goods;
                    this.filteredGoods = goods;
                    resolve();
                })
                .catch((error) => {
                    console.log(`Can't fetch data`, error);
                    reject(error);
                })
        });
    }

    newFetchData(){
        return new Promise((resolve, reject) => {
            fetch(`${API_ROOT}/catalogData.json`)
                .then((res) => res.json())
                .then((goods) => {
                    this.goods = goods;
                    this.filteredGoods = goods;
                    resolve();
                })
                .catch((error) => {
                    console.log(`Can't fetch data`, error);
                    reject(error);
                })
        });
    }

    async newNewFetchData() {
        try {
            const res = await fetch(`${API_ROOT}/catalogData.json`);
            const goods = await res.json();
            this.goods = goods;
            this.filteredGoods = goods;
        } catch (err) {
            console.log(`Can't fetch data`, error);
            throw new Error(error);
        }
    }

    getTotalPrice() {
        const sum = this.goods.reduce(
            (accumulator, currentElement) => accumulator + currentElement.price,
            0
        );
        console.log(sum)
    }

    render() {
        const goodsString = this.filteredGoods.map(element => {
            const item = new GoodsItem(element);
            return item.render();
        });
        document.querySelector('.goods').innerHTML = goodsString.join('');
    }

    addToBasket(item) {
        this.basket.addItem(item);
    }

    filterGoods(searchValue) {
        const regexp = new RegExp(searchValue, 'i');
        this.filteredGoods = this.goods.filter((goodsItem) => regexp.test(goodsItem.product_name));
        this.render();
    }
}


class Basket {
    constructor() {
        this.goods = [];
    }

    fetchData() {
        request('getBasket.json')
            .then((goods) => {
                this.goods = goods.contents;
                console.log(this.goods);
            })
            .catch((error) => {
                console.log(`Can't fetch basket data`, error);
            });
    }

    addItem(item) {
        request('addToBasket.json')
            .then((response) => {
                if (response.result !== 0) {
                    const itemIndex = this.goods.findIndex((goodsItem) => goodsItem.id_product === item.id_product);
                    if (itemIndex > -1) {
                        this.goods[itemIndex].quantity += 1;
                    } else {
                        this.goods.push({ ...item, quantity: 1 });
                    }
                    console.log(this.goods);
                } else {
                    console.error(`Can't add item to basket`, item, this.goods);
                }
            })
    }

    removeItem(id) {
        request('deleteFromBasket.json')
            .then((response) => {
                if (response.result !== 0) {
                    this.goods = this.goods.filter((goodsItem) => goodsItem.id_product !== parseInt(id));
                    console.log(this.goods);
                } else {
                    console.error(`Can't remove item from basket`, item, this.goods);
                }
            });
    }

    changeQuantity() {

    }

    applyCoupon() {

    }

    getDeliveryPrice() {

    }

    createOrder() {

    }

    clear() {

    }

    getTotalPrice() {

    }
    
    render() {

    }
}


class BasketItem {

    changeType() {

    }
    
    removeItem() {

    }

    changeQuantity() {
        
    }

    render() {

    }
}

const basket = new Basket();
basket.fetchData();

const list = new GoodsList(basket);
list.newNewFetchData()
    .then(() => {
        list.render();
        list.getTotalPrice();
    });
