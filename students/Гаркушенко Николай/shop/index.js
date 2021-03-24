const API_ROOT =
  "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";
const RawGitHubRequest = (path = "", method = "GET", body) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        xhr.status === 200
          ? resolve(JSON.parse(xhr.responseText))
          : reject(xhr.responseText);
      }
    };

    xhr.open(method, `${API_ROOT}/${path}`);
    xhr.send(body);
  });
};

class Cart {
  constructor() {
    this.goods = [];
  }

  getQuantityGood() {
    return this.goods.length;
  }

  findGood(good) {
    const foundedGood = this.goods.find((currentGood) => {
      return currentGood.getId() === good.getId();
    });
    return foundedGood;
  }

  isExistsGood(good) {
    return Boolean(this.findGood(good));
  }

  addGood(good) {
    const increaseGoodQuantity = (currentGood) =>
      currentGood.getId() === good.getId()
        ? currentGood.increaseQuantity(good.getQuantity())
        : currentGood;

    this.goods = this.isExistsGood(good)
      ? this.goods.map(increaseGoodQuantity)
      : [...this.goods, good];
  }

  removeGood(good) {
    if (!this.isExistsGood(good)) {
      return;
    }

    const decreaseGoodQuantity = (goods, currentGood) => {
      if (Number(currentGood.getId()) !== Number(good.getId())) {
        return [...goods, currentGood];
      }

      if (good.getQuantity() >= currentGood.getQuantity()) {
        return [...goods];
      }

      currentGood.decreaseQuantity(good.getQuantity());
      return [...goods, currentGood];
    };

    this.goods = this.goods.reduce(decreaseGoodQuantity, []);
  }

  clear() {
    this.goods = [];
  }

  //Добавьте для GoodsList метод, определяющий суммарную стоимость всех товаров.
  getSumm = function () {
    return this.goods.reduce((summ, good) => summ + good.getSumm(), 0);
  };
}

class Product {
  constructor(id, name, price, measureUnit, quantity = 1, imageList = []) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.measureUnit = measureUnit;
    this.quantity = quantity;
    this.imageList = imageList;
  }

  getId() {
    return this.id;
  }

  getName() {
    return this.name;
  }

  getMainImage() {
    const imageName =
      this.imageList.length > 0 ? this.imageList[0] : "default.png";
    return imageName;
  }

  getPrice() {
    this.price;
  }

  getMeasureUnit() {
    this.measureUnit;
  }

  getQuantity() {
    this.quantity;
  }

  getImageList() {
    this.imageList;
  }

  increaseQuantity(quantity) {
    this.quantity += quantity;
    return this;
  }

  decreaseQuantity(quantity) {
    this.quantity -= quantity;

    if (this.quantity < 1) {
      this.quantity = 1;
    }

    return this;
  }

  getSum() {
    return this.price * this.quantity;
  }
}

//show case
const getMainProductImage = (goodImages) => {
  const imageName = goodImages.length > 0 ? goodImages[0] : "default.png";
  return imageName;
};

const renderShowCase = (htmlIdElement, goodList = []) => {
  const createProductListHtmlElement = (good) =>
    `<div class="showcase__product">
    <img src="assets/img/${getMainProductImage(
      Boolean(good.imageList) ? good.imageList : []
    )}">
    <h2>${good.title}</h2>
    <p>${good.price}</p>
    <button id="addToCart">В корзину</button> 
  </div>`;

  const prdouctCartList = goodList
    .map((good) => createProductListHtmlElement(good))
    .join("");

  const showcase = document.getElementById(htmlIdElement);
  showcase.innerHTML = prdouctCartList;
};

//cart panel
const renderPanelCartHtmlElement = (htmlIdElement, cartGoods) => {
  const createPanelCartProducsListHtmlElement = (good) =>
    `<div class="panelcart__product" >
      <img src="assets/img/${getMainProductImage(
        Boolean(good.imageList) ? good.imageList : []
      )}">
      <div class="panelcart__product-details">
        <div class="panelcart__product-title">${good.title}</div>
        <div class="panelcart__product-price">${good.price}</div>
      </div>
    </div>`;

  const cartProductList = cartGoods
    .map((good) => createPanelCartProducsListHtmlElement(good))
    .join("");

  const panelCartElement = document.getElementById(htmlIdElement);
  cartProductList.length > 0
    ? (panelCartElement.innerHTML = cartProductList)
    : (panelCartElement.innerHTML = "<h3>Корзина пуста</h3>");
};

// app
const renderAppElement = () => {
  //Переделайте GoodsList так, чтобы fetchGoods() возвращал промис, а render() вызывался в обработчике этого промиса.

  const appElement = document.getElementById("app");
  appElement.innerHTML = `<div id="appContainer" class="app__container">
                            <div id="showCase" class="showcase"></div>
                            <div id="panelCart" class="panelcart hidden"></div>
                          </div>`;
  const goodsRequest = RawGitHubRequest("catalogData.json");
  goodsRequest
    .then((goods) => {
      renderShowCase("showCase", goods);
    })
    .catch("FATAL ERROR");

  const cartDataRequest = RawGitHubRequest("catalogData.json");
  cartDataRequest
    .then((cartGoods) => {
      renderPanelCartHtmlElement("panelCart", cartGoods);
    })
    .catch("FATAL CART ERROR");
};

renderAppElement();
