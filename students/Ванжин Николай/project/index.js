const express = require('express');
const app = express();
const fs = require('fs');
const cors = require('cors');
const log = require('./logger');


app.use(express.static('./static'));
app.use(cors());
app.use(express.json());
app.get('/api/goods', (request, response) => {
	fs.readFile('./goods.json', 'utf-8', (err, data) => {
		if (err) {
			console.log("read goods.json error", err);
			response.send("read goods.json error");
			return;
		}
		const goods = JSON.parse(data)
		console.log(goods);
		return response.send(data);
	})
});
app.get('/api/basket', (request, response) => {
	fs.readFile('./basket.json', 'utf-8', (err, data) => {
		if (err) {
			console.log("read basket.json error", err);
			response.send("read basket.json error");
			return;
		}
		const basket = JSON.parse(data);
		const total = basket.reduce(function (sum, current) { //цена всех товаров
			if (!isNaN(current.price)) {
				return sum + current.price * current.quantity;
			} else
				return sum;
		}, 0);
		console.log(basket);

		return response.send({
			total,
			contents: basket,
		});
	})
});
app.post('/api/basket', (request, response) => {


	fs.readFile('./basket.json', 'utf-8', (err, data) => {
		if (err) {
			console.log("read basket.json error", err);
			response.send("read basket.json error");
			return;
		}
		const basket = JSON.parse(data);
		const item = request.body;

		if (!basket.find((goodsItem) => parseInt(goodsItem.id) === parseInt(item.id))) {
			item.quantity = 1;
			basket.push(item);
		} else {
			basket.find((goodsItem) => parseInt(goodsItem.id) === parseInt(item.id)).quantity += 1;
		};
		log('ADD', item.id);

		fs.writeFile('basket.json', JSON.stringify(basket), (err) => {
			if (err) {
				console.log("write basket.json error", err);
				response.json({
					status: 0,
					message: "write basket.json error",
					error: err,
				});
				return;
			};
			response.json({
				result: 1
			})
		})
	})
});
app.delete('/api/basket/:id', (req, res) => {
	fs.readFile('./basket.json', 'utf-8', (err, data) => {
		if (err) {
			console.log('Read basket.json error!', err);
			res.send('Read basket.json error!');
			return;
		}

		let basket = JSON.parse(data);
		const id = parseInt(req.params.id);
		console.log(req.params);

		if (basket.find((goodsItem) => +goodsItem.id === parseInt(id))) {
			let newGoods = basket.filter((item) => +item.id !== parseInt(id));
			basket = newGoods;
			console.log(basket);

		};
		log('DELETE', id);

		fs.writeFile('./basket.json', JSON.stringify(basket), (err) => {
			if (err) {
				console.log('Write basket.json error!', err);
				res.json({
					result: 0,
					message: 'Write basket.json error!',
					error: err,
				});
				return;
			}
			res.json({
				result: 1
			});
		})
	});
});
app.put('/api/basket/:id', (req, res) => {
	fs.readFile('./basket.json', 'utf-8', (err, data) => {
		if (err) {
			console.log('Read basket.json error!', err);
			res.send('Read basket.json error!');
			return;
		}

		let basket = JSON.parse(data);
		const id = parseInt(req.params.id);
		console.log(req.params);

		let itemQuantity = basket.find((goodsItem) => parseInt(goodsItem.id) === parseInt(id)).quantity -= 1;
		console.log(basket);
		if (itemQuantity === 0) {
			let newGoods = basket.filter((item) => +item.id !== parseInt(id));
			basket = newGoods;
			console.log(basket);
		}
		log('REDUCE', id);

		fs.writeFile('./basket.json', JSON.stringify(basket), (err) => {
			if (err) {
				console.log('Write basket.json error!', err);
				res.json({
					result: 0,
					message: 'Write basket.json error!',
					error: err,
				});
				return;
			}
			res.json({
				result: 1
			});
		})
	});
});
app.listen(3000, () => {
	console.log("app is running 3000")
})