const API_ROOT = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const promisedRequest = (path = '', method = 'GET', body) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(method, `${API_ROOT}/${path}`);
        xhr.onload = () => resolve(xhr.responseText);
        xhr.onerror = () => reject(xhr.statusText);
        xhr.send()
    });
}


class GoodsItem {
    constructor(item) {
        this.item = item;
    }

    render() {
        return `
            <div class="item">
                <h2>${this.item.product_name}</h2>
                <p>${this.item.price}</p>
            </div>
        `;
    }
}

class GoodsList {
    constructor() {
        this.goods = [];
        this.sumOfGoods = undefined;
    }

    fetchData() {
        promisedRequest('catalogData.json')
            .then((answerFromServer) => {
                this.goods = JSON.parse(answerFromServer);
                this.render()
            })
            .catch((error) => {
                console.log(error);
            })
    }

    getTotalPrice() {
        promisedRequest('catalogData.json')
            .then((answerFromServer) => {
                this.goods = JSON.parse(answerFromServer);
                this.sumOfGoods = this.goods.reduce(
                    (accumulator, currentElement) => accumulator + currentElement.price,
                    0
                );
            })
    }

    render() {
        const goodsString = this.goods.map(element => {
            const item = new GoodsItem(element);
            return item.render();
        });
        document.querySelector('.goods-list').innerHTML = goodsString.join(' ');
    }
}


class Basket {

    constructor() {
        this.basket = []
    }

    add(item) {
        this.basket = item
    }

    fetchData() {
        promisedRequest('getBasket.json')
            .then((answerFromServer) => {
                this.basket = JSON.parse(answerFromServer);
                this.render()
                this.add(JSON.parse(answerFromServer));
            })
            .catch((error) => {
                console.log(error);
            })
    }

    addItem(item) {
        console.log(dir)
        // this.basket.add(item)
        // return this.basket
            // if (element.id_product === item.id_product) {
            //     element.quantity += item.quantity
            //     this.basket = element
            //     console.log(this.basket)
            // }
        }


        // promisedRequest('getBasket.json')
        //     .then((answerFromServer) => {
        //         this.basket = JSON.parse(answerFromServer);
        //         this.basket.contents.forEach((element) => {
        //             let count = 0
        //             console.log(this.basket);
        //             if (element.id_product === item.id_product) {
        //                 console.log(this.basket)
        //                 this.basket.contents[count++].quantity += 1;
        //                 return this.basket
        //             }
        //
        //         })
        //
        //
        //         // })
        //         // if (this.basket.id_product.includes(item.id_product)) {
        //         //     this.basket.quantity += 1;
        //         // }
        //         // console.log(item.id_product in this.basket.id_product);
        //         // console.log(this.basket.contents.forEach(element => console.log(element)))
        //         // forEach(elem => { if (Number(item) === elem.id_product){console.log('uspekh')}})
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     })
        // // return this.basket

    // }

    removeItem() {

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
        console.log(this.basket);
        const basketString = this.basket.contents.map(element => {
            const item = new BasketItem(element);
            return item.render();
        });
        document.querySelector('.goods-list').innerHTML = basketString.join(' ');

    }
}


class BasketItem {

    constructor(item) {
        this.item = item;
    }

    changeType() {

    }

    removeItem() {

    }

    changeQuantity() {

    }

    render() {
        return `
            <div class="basket">
                <h2>${this.item.product_name}</h2>
                <p>${this.item.price}</p>
                <p>${this.item.quantity}</p>
            </div>
        `;
    }
}


const list = new GoodsList();
list.fetchData();
list.getTotalPrice();
console.log(list);
cart = new Basket();
cart.fetchData()
a = {id_product: 123, product_name: "Ноутбук", price: 45600, quantity: 3}
cart.addItem(a);
console.log(cart.basket)