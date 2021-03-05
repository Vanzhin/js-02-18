/**
 * Class Cart
 */

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

export default ModelCart;
