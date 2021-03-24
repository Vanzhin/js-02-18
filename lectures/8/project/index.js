const fs = require('fs');
const cors = require('cors');
const express = require('express');
const app = express();

app.use(express.static('./static'));
app.use(express.json());
app.use(cors());

app.get('/api/goods', (request, response) => {
    console.log('/goods route handler', request.ip);
    fs.readFile('./goods.json', 'utf-8', (err, data) => {
        if (err) {
            console.log('Read goods.json error!', err);
            response.send('Read goods.json error!');
            return;
        }

        return response.send(data);
    });
});

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

app.post('/api/basket-goods', (request, response) => {
    console.log('/basket-goods POST route handler', request.ip);
    fs.readFile('./basket-goods.json', 'utf-8', (err, data) => {
        if (err) {
            console.log('Read basket-goods.json error!', err);
            response.send('Read basket-goods.json error!');
            return;
        }

        const basket = JSON.parse(data);
        const item = request.body;
        console.log(request.body)
        basket.push(item);

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
});

app.listen(3000, () => {
    console.log('App is running @ localhost:3000')
});
