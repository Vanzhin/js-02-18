
const fs = require('fs');
const cors = require('cors');
const express = require('express');
const app = express();

app.use(express.static('./static'));
app.use(express.json());
app.use(cors());
// запрос списка товаров
app.get('/api/goods', (request, response) => {
    console.log('/goods route handler', request.ip);
    fs.readFile('./goods.json', 'utf-8', (err, data) => {
        if (err) {
            console.log('Read goods.json error!', err);
            response.send('Read goods.json error!');
            //return ;
        }

        //return 
        response.send(data);
    });
});

// добавление элемента статистики Метод fs.appendFile()
const stats = (item) => {
    return new Promise((resolve, reject) => { 
        fs.appendFile('./stats.json', `${JSON.stringify(item)},`, (err) => {
            //err=true;
            if (err) {
                console.log('AppendFile stats.json error!', err);
                reject('AppendFile stats.json error!');
                return;
            }
            console.log('запись в файл  stats.json  выполнена  ');
            resolve({ status: 1 })
        });
    });
}

// запрос списка корзины
app.get('/api/basket-goods', (request, response) => {
    console.log('/basket-goods route handler', request.ip);
    fs.readFile('./basket-goods.json', 'utf-8', (err, data) => {
        if (err) {
            console.log('Read basket-goods.json error!', err);
            response.send('Read basket-goods.json error!');
            return;
        }

        const basket = JSON.parse(data);
        const total = basket.reduce((acc, cur) => acc + (cur.price * cur.quantity), 0);

        return response.json({
            total,
            contents: basket,
        });
    });
});
// запрос на добавление товара в корзину
app.post('/api/basket-goods', (request, response) => {
    console.log('/basket-goods POST route handler', request.ip);
    
    const stat = {
        date: new Date(),
        title: request.body.title, actions: 'товар добавлен в корзину', quantity: request.body.quantity
    };
    console.log('stat в запросе на добавление',stat);
    
    stats(stat)
       .then(()=> {
            //чтение из файла списка корзины
            fs.readFile('./basket-goods.json', 'utf-8', (err, data) => {
                if (err) {
                    console.log('Read basket-goods.json error!', err);
                    response.send('Read basket-goods.json error!');
                    return;
                }

                const basket = JSON.parse(data);
                const item = request.body;
                const itemIndex = basket.findIndex((goodsItem) => goodsItem.id === item.id);
                if (itemIndex > -1) {
                    basket[itemIndex].quantity += 1;
                } else {
                    basket.push({ ...item, quantity: 1 });
                }
                
                fs.writeFile('./basket-goods.json', JSON.stringify(basket), (err) => {
                    if (err) {
                        console.log('Write basket-goods.json error!', err);
                        response.json({ 
                            status: 0,
                            message: 'Write basket-goods.json error!',
                            error: err,
                        });
                        return;
                    }
                    response.json({ status: 1});
                })
            });

        })
        .catch((error) => {
            console.log('Добавление Промис ошибка:', error);
            return response.json({error});
        });
});

// запрос на удаление товара из корзины
app.post('/api/basket-delete', (request, response) => {
    console.log('/basket-delete POST route handler', request.ip);
    const stat = {
        date: new Date(),
        id: request.body.id, title: request.body.title, actions: 'товар удален из корзины', quantity: request.body.quantity
    } ;
    console.log('stat в запросе на удаление',stat);
    stats(stat)
        .then(()=> {
            //чтение из файла списка корзины
            fs.readFile('./basket-goods.json', 'utf-8', (err, data) => {
                if (err) {
                    console.log('Read basket-goods.json error!', err);
                    response.send('Read basket-goods.json error!');
                    return;
                }

                const basket = JSON.parse(data);
                const item = request.body;
                const itemIndex = basket.findIndex((goodsItem) => goodsItem.id === item.id);
                basket.splice(itemIndex, 1);
                // запись в файл
                fs.writeFile('./basket-goods.json', JSON.stringify(basket), (err) => {
                    if (err) {
                        console.log('Write basket-goods.json error!', err);
                        response.json({ 
                            status: 0,
                            message: 'Write basket-goods.json error!',
                            error: err,
                        });
                        return;
                    }
                    response.json({ status: 1});
                })
            });
        }) 
        .catch((error) => {
            console.log('Удаление Промис ошибка:', error);
            return response.json({error});
        });   
});

// запрос на изменение колличества товара в корзине
app.post('/api/basket-quantity', (request, response) => {
    console.log('/basket-delete POST route handler', request.ip);
    
    const stat = {
        date: new Date(),
        id: request.body.item.id, title: request.body.item.title, actions: 'изменено колличество ', quantity: +request.body.e,
    } ;
    console.log('stat в запросе на изменение колличества',stat);
    
    stats(stat)
        .then(()=> {
            //чтение из файла списка корзины
            fs.readFile('./basket-goods.json', 'utf-8', (err, data) => {
                if (err) {
                    console.log('Read basket-goods.json error!', err);
                    response.send('Read basket-goods.json error!');
                    return;
                }

                const basket = JSON.parse(data);
                const item = request.body;
                const itemIndex = basket.findIndex((goodsItem) => goodsItem.id === item.item.id);
                basket[itemIndex].quantity = +item.e
                
                fs.writeFile('./basket-goods.json', JSON.stringify(basket), (err) => {
                    if (err) {
                        console.log('Write basket-goods.json error!', err);
                        response.json({ 
                            status: 0,
                            message: 'Write basket-goods.json error!',
                            error: err,
                        });
                        return;
                    }
                    response.json({ status: 1});
                })
            });
        })
        .catch((error) => {
            console.log('Изменение колличества Промис ошибка:', error);
            return response.json({error});
        });
});

app.listen(3000, () => {
    console.log('App is running @ localhost:3000')
});
