const goods = [
    { title: 'Монитор', price: 50000 },
    { title: 'Клавиатура', price: 1500 },
    { title: 'Мышь', price: 700 },
    { title: 'Ноутбук', price: 35000 },
];

const getGoodsLayout = (title, price = 'По запросу') => `
        <div class="item">
            <h2>${title}</h2>
            <p>${price}</p>
        </div>
    `;

const renderGoods = (list = []) => {
    const goodsString = list.map(element => getGoodsLayout(element.title, element.price));
    document.querySelector('.goods').innerHTML = goodsString.join('');
}

renderGoods(goods);
