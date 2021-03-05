import Gamburger from "./gamburger.js";

const myBigGamburger = Gamburger.findAndCreateGamburger("BigGambgurger");
myBigGamburger.addIngredient("cheese");
myBigGamburger.addIngredient("salat");
myBigGamburger.addIngredient("potato");
myBigGamburger.addIngredient("cheespeciesse");
myBigGamburger.addIngredient("mayones");
myBigGamburger.addIngredient("cheese");
myBigGamburger.printTotal();
