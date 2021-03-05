const goods = [
    { title: 'Монитор', price: 5000 },
    { title: 'Клавиатура', price: 1500 },
    { title: 'Мышь', price: 700 },
    { title: 'Ноутбук', price: 35000 },
];

const getGoodsLayout = (title, price) => {
    return `
        <div class="item">
            <h2>${title}</h2> 
            <p>${price}</p>
        </div>
        `;  
}
    

const renderGoods = (list = []) => {
    const goodString = list.map( element => getGoodsLayout(element.title, element.price));
    document.querySelector('.goods').innerHTML = goodString.join('');
}

renderGoods(goods);
