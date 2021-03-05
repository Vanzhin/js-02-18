class Hamburger {
    constructor() {
        this.toppingList = {'cheese': [10, 20], 'salad': [20, 5], 'potato': [15, 10]};
        this.condimentList = {'sprinkle': [15, 0], 'mayonnaise': [20, 5]};
        this.hamburgerSize = {'large': [50, 20], 'small': [100, 40]};
        this.infoAboutPrice = undefined;
        this.infoAboutCalories = undefined;
        this.selectSize()
    }
    selectSize() {
        let answer = prompt('small or large?');
        document.querySelector('.size').innerHTML = `${answer} hamburger, 
        `;
        this.infoAboutPrice = this.hamburgerSize[answer][0];
        this.infoAboutCalories = this.hamburgerSize[answer][1];
        this.selectTopping()
    }

    selectTopping() {
        console.log(this.toppingList);
        let answer = prompt('with which topping? (cheese, salad, potato)')
        document.querySelector('.topping').innerHTML = `
        with ${answer}`;
        this.infoAboutPrice += this.toppingList[answer][0]
        this.infoAboutCalories += this.toppingList[answer][1]
        this.selectCondiments()
    }
    selectCondiments() {
        let answer = prompt('do you want add condiments? (y/n)')
        if (answer === 'y') {
            answer = prompt('which one? mayonnaise or sprinkle?')
            document.querySelector('.condiment').innerHTML = `
            and with ${answer}
            `;
            this.infoAboutPrice += this.condimentList[answer][0]
            this.infoAboutCalories += this.condimentList[answer][1]
        }
        this.lastPreparation()
    }
    lastPreparation() {
      document.querySelector('.hamburger').innerHTML = `
      Your order's total: 
      price: ${this.infoAboutPrice}
      calories: ${this.infoAboutCalories}
      `;
    }
};
function orderHamburger() {
    const hamburger = new Hamburger();
    return hamburger;
}
