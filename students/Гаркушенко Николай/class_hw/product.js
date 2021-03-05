/**
 *  class Product
 */

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

export default Product;
