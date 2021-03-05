'use strict';

class HamburgerItem {   // товар   big  little    Сheese    Salad     Potato  
    constructor(size = "little", stuffing = "cheese"){
        this.stuffing = stuffing;
        this.size = size;
        this.topping = [];  // seasoning  mayonnaise
    }

    addTopping(topping) {    // Добавить добавку 
        this.topping.push(topping);
        console.log(this.topping);
    }
    
    removeTopping(topping) {  // Убрать добавку 
        this.topping.splice(this.topping.indexOf(topping),1); 
        console.log(this.topping);
    }
    
    getToppings() {   // Получить список добавок 
        console.log(this.topping);
        return  this.topping;
    }
    
    getSize() {              // Узнать размер гамбургера 
        console.log(this.size);
        return this.size;
    }
    
    getStuffing() {          // Узнать начинку гамбургера
        console.log(this.stuffing);
        return this.stuffing;
    }
    
    calculatePrice() {       // Узнать цену 
    const size = {
        big : 100,
        little : 50,
    };
    const stuffing = {
        cheese : 10,  
        salad :   20,  
        potato : 15,
    };
    const topping = {
        seasoning : 15,
        mayonnaise : 20,
    };
    
    let priсe = size[this.size] + stuffing[this.stuffing];
    this.topping.forEach(element => { priсe += topping[element] }); 
    console.log(`стоимость: ${priсe}`);
    return priсe;
    }
    
    calculateCalories() {    // Узнать калорийность 
        const size = {
            little : 20,
            big : 40,
        };
        const stuffing = {
            cheese : 20,  
            salad :   5,  
            potato : 10,
        };
        const topping = {
            seasoning : 0,
            mayonnaise : 5,
        };
        
        let calories = size[this.size] + stuffing[this.stuffing];
        this.topping.forEach(element => { calories += topping[element] }); 

        console.log(`калорий:${calories}`);
        return calories;
    }
}
// товар   big  little ,   cheese    salad     potato,  seasoning  mayonnaise
function fastFood() {
    const hamburgers = new HamburgerItem();
    hamburgers.getSize();
    hamburgers.addTopping("seasoning");
    hamburgers.addTopping("mayonnaise");
    hamburgers.calculatePrice();
    hamburgers.calculateCalories();
    hamburgers.removeTopping("seasoning");
    hamburgers.calculatePrice();
    hamburgers.calculateCalories();
}