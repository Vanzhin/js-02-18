import fixtures from "./fixtures.js";
import Ingredient from "./ingredient.js";

const fixtureGamburgersTypes = fixtures.fixtureGamburgersTypes;
const fixtureIngredients = fixtures.fixtureIngredients;

class Gamburger {
  constructor(name, price, calories) {
    this.name = name;
    this.calories = calories;
    this.price = price;
    this.ingredients = [];
    this.totalCalories = 0;
    this.totalPrice = 0;
  }

  getName() {
    return this.name;
  }

  getCalories() {
    return this.calories;
  }

  getPrice() {
    return this.price;
  }

  static findAndCreateGamburger(name) {
    let searchingBurger = {};
    const searchingGamburgerIndex = fixtureGamburgersTypes.findIndex(
      (ingredient) => ingredient.name === name
    );

    const createIngredient = (indx) => {
      searchingBurger = new Gamburger(
        fixtureGamburgersTypes[indx].name,
        fixtureGamburgersTypes[indx].price,
        fixtureGamburgersTypes[indx].calories
      );
    };

    searchingGamburgerIndex === -1
      ? (searchingBurger = null)
      : createIngredient(searchingGamburgerIndex);

    return searchingBurger;
  }

  addIngredient(ingredientName) {
    const newIngredient = Ingredient.findAndCreate(ingredientName);
    if (newIngredient !== null) {
      this.ingredients = [...this.ingredients, newIngredient];
    }
  }

  printTotal() {
    this.totalCalories = 0;
    this.totalPrice = 0;
    const productToString = (product) => {
      this.totalPrice += product.getPrice();
      this.totalCalories += product.getCalories();

      return `${product
        .getName()
        .padStart(
          10,
          " "
        )} \t\t| ${product.getPrice()} \t\t| ${product.getCalories()} \t\t| ${
        this.totalPrice
      } \t\t| ${Number(this.totalCalories)}\t\t|`;
    };

    const header = `Totals:`;
    const table = `Product name \t\t| Price \t| calories \t| total price \t| total calories | `;
    const burger = productToString(this);

    const ingredientListToString = this.ingredients
      .map(productToString)
      .join("\n");

    console.log(
      `${header}
${table}
${burger}
${ingredientListToString}
    `
    );
  }
}

export default Gamburger;
