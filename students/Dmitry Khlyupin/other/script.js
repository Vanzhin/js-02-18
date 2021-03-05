// Задание к уроку 2 со звездочкой

// Моя идея в том, что при выборе гамбургера в неком интерфейсе используются чекбоксы, то есть "да"/"нет", 
// Поэтому в конструктор передается 6 булевых значений, соответствующих виду бургера
// На основании набора этих значений в функциях расчета с помощью тернарных операторов расчитывается стоимость и калорийность
// Можно было попробовать и по другому - создать для каждого компонента бургера свой объект со свойством цены и калорийности, и формировать объект бургера из этих объектов

class Burger {
    constructor(smallSize = true, cheese = true, salad = false, potato = false, spice = false, mayo = false) {
        this.smallSize = smallSize;
        this.cheese = cheese;
        this.potato = potato;
        this.salad = salad;
        this.spice = spice;
        this.mayo = mayo;
        this.price = 0;
        this.energy = 0; 
    }

    calcCalories() {
        
        this.energy += (this.smallSize?20: 40) + 
                       (this.cheese? 20 :0) + 
                       (this.salad?5:0) +
                       (this.potato?10:0) +
                       (this.mayo?5:0)
                       ;
        return this.energy;
    }
    calcPrice() {
        this.price += (this.smallSize?50: 100) + 
                       (this.cheese? 10 :0) + 
                       (this.salad?20:0) +
                       (this.potato?15:0) +
                       (this.spice?15:0) +
                       (this.mayo?5:0)
                       ;
        return this.price;
    }
    output() {
        const string = `Вы выбрали ${(this.smallSize?'Маленький':'Большой')} гамбургер c ${(this.cheese?'сыром ':'')}${(this.salad?'салатом ':'')}${(this.potato?'картошкой ':'')}${(this.spice?'специями ':'')}${(this.mayo?'и майонезом':'')}. `;
        console.log(string + `Его цена: ${this.calcPrice()} рублей а калорийность ${this.calcCalories()} калорий`)
    }
}
const burger = new Burger(false, false, true, true, true, false);
const burger2 = new Burger();
const burger3 = new Burger(false, true, true, true, true, true);
burger.output();                                                        //Тестим разные бургеры
burger2.output();
burger3.output();