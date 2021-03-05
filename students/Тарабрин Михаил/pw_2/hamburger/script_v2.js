class HamburgerSize {
    constructor() {
        this.big = [100, 40];
        this.small = [50, 20];
    }
}


class HamburgerMaker extends HamburgerSize {
    constructor(choise, big, small) {
        super(big, small);
        this.choise = choise
        this.cheese = [10, 20];
        this.salad = [20, 5];
        this.potato = [15, 10];
        this.sprinkle = [15, 0];
        this.mayonnaise = [20, 5];
        this.arr = {
            1: 'cheese',
            2: 'salad',
            3: 'potato',
            4: 'sprinkle',
            5: 'mayonnaise',
        }
        if (choise === 'small') { 
            this.totalPrice = this.small[0];
            this.totalCalories = this.small[1];
        } else {
            this.totalPrice = this.big[0];
            this.totalCalories = this.big[1];
        }
        this.selectTopping()
    }
    selectTopping() {
        let answer = prompt('hamburger with 1)cheese 2)salad or 3)potato?');
        switch (answer) {

            case '1':
                document.querySelector('.topping').innerHTML = `${this.arr[1]} hamburger, `;
                this.totalPrice += this.cheese[0];
                this.totalCalories += this.cheese[1];
                this.addCondiment()
                break;

            case '2':
                document.querySelector('.topping').innerHTML = `${this.arr[2]} hamburger, `;
                this.totalPrice += this.salad[0];
                this.totalCalories += this.salad[1];
                this.addCondiment()
                break;

            case '3':
                document.querySelector('.topping').innerHTML = `${this.arr[3]} hamburger, `;
                this.totalPrice += this.potato[0];
                this.totalCalories += this.potato[1];
                this.addCondiment()
                break;
        }
    }
    addCondiment() {
        let answer = prompt(`add condiment? 1) sprinkle, 2) mayonnaise`);
            if ('2') {
                this.totalPrice += this.mayonnaise[0];
                this.totalCalories += this.mayonnaise[1];
                document.querySelector('.condiment').innerHTML = ` with ${this.arr[5]} as condiment, `;
            } else if ('1') {
                this.totalPrice += this.sprinkle[0];
                this.totalCalories += this.sprinkle[1];
                document.querySelector('.condiment').innerHTML = ` with ${this.arr[4]} as condiment, `;
            } else {
                document.querySelector('.condiment').innerHTML = ` without condiment`;
            }
        document.querySelector('.hamburger').innerHTML = `total price: ${this.totalPrice} total calories ${this.totalCalories}`
    }
}


function orderHamburgerV2() {
    const bigHamburger = new HamburgerMaker('big');
    return bigHamburger;
}

function orderSmallHamburger() {
    const smallHamburger = new HamburgerMaker('small');
    return smallHamburger;
}

