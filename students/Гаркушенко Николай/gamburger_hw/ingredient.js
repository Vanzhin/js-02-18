import fixtures from "./fixtures.js";

const fixtureIngredients = fixtures.fixtureIngredients;

class Ingredient {
  constructor(name, price, calories) {
    this.name = name;
    this.price = price;
    this.calories = calories;
  }

  getName() {
    return this.name;
  }

  getPrice() {
    return this.price;
  }

  getCalories() {
    return this.calories;
  }

  static findAndCreate(name) {
    let searchingIngredient = {};
    const searchingIngredientIndex = fixtureIngredients.findIndex(
      (ingredient) => ingredient.name === name
    );

    const createIngredient = (indx) => {
      searchingIngredient = new Ingredient(
        fixtureIngredients[indx].name,
        fixtureIngredients[indx].price,
        fixtureIngredients[indx].calories
      );
    };

    searchingIngredientIndex === -1
      ? (searchingIngredient = null)
      : createIngredient(searchingIngredientIndex);
    // console.log();
    return searchingIngredient;
  }
}

export default Ingredient;
