const goods = [
  { id: 1, title: "Монитор", price: 50000, imageList: [] },
  { id: 2, title: "Клавиатура", price: 1500, imageList: [] },
  { id: 3, title: "Мышь", price: 700, imageList: [] },
  { id: 4, title: "Ноутбук", price: 35000, imageList: [] },
  { id: 5, title: "Монитор", price: 50000, imageList: [] },
  { id: 6, title: "Клавиатура", price: 1500, imageList: [] },
  { id: 7, title: "Мышь", price: 700, imageList: [] },
  { id: 8, title: "Ноутбук", price: 35000, imageList: [] },
  { id: 9, title: "Монитор", price: 50000, imageList: [] },
  { id: 10, title: "Клавиатура", price: 1500, imageList: [] },
  { id: 11, title: "Мышь", price: 700, imageList: [] },
  { id: 12, title: "Ноутбук", price: 35000, imageList: [] },
  { id: 13, title: "Монитор", price: 50000, imageList: [] },
  { id: 14, title: "Клавиатура", price: 1500, imageList: [] },
  { id: 15, title: "Мышь", price: 700, imageList: [] },
  { id: 16, title: "Ноутбук", price: 35000, imageList: [] },
];

const cartGoods = [
  { id: 15, title: "Мышь", price: 700, imageList: [] },
  { id: 16, title: "Ноутбук", price: 35000, imageList: [] },
];

//show case
const getMainProductImage = (goodImages) => {
  const imageName = goodImages.length > 0 ? goodImages[0] : "default.png";
  return imageName;
};

const renderShowCase = (htmlIdElement, goodList = []) => {
  const createProductListHtmlElement = (good) =>
    `<div class="showcase__product">
    <img src="assets/img/${getMainProductImage(good.imageList)}">
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
      <img src="assets/img/${getMainProductImage(good.imageList)}">
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
  const appElement = document.getElementById("app");
  appElement.innerHTML = `<div id="appContainer" class="app__container">
                            <div id="showCase" class="showcase"></div>
                            <div id="panelCart" class="panelcart hidden"></div>
                          </div>`;
  renderShowCase("showCase", goods);
  renderPanelCartHtmlElement("panelCart", cartGoods);
};

renderAppElement();
