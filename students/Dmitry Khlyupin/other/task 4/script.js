//ДЗ 4

// 1. Дан большой текст, в котором для оформления прямой речи используются одинарные кавычки. Придумать шаблон, который заменяет одинарные кавычки на двойные.
// 2. Улучшить шаблон так, чтобы в конструкциях типа aren't одинарная кавычка не заменялась на двойную.



let str = "She said: 'I can't speak five foreign languages'. Не asked me: 'When did you send the letter?'";

const regexp = /(\s|^)'(.+?)'(\s|\,|\!|\?|\.|$)/g

const str2 = str.replace(regexp, '$1"$2"$3');

console.log(str2);


// 3. *Создать форму обратной связи с полями: Имя, Телефон, E-mail, текст, кнопка Отправить. При нажатии на кнопку Отправить произвести валидацию полей следующим образом:
// a. Имя содержит только буквы.
// b. Телефон имеет вид +7(000)000-0000.
// c. E-mail имеет вид mymail@mail.ru, или my.mail@mail.ru, или my-mail@mail.ru.
// d. Текст произвольный.
// e. Если одно из полей не прошло валидацию, необходимо выделить это поле красной рамкой и сообщить пользователю об ошибке.



class Field {
    constructor(obj, regexp, template) {
        this.obj = obj;
        this.regexp = regexp;
        this.template = template;
        
    }

    validation(){
        if(this.obj.value === ''){
            this.obj.insertAdjacentHTML("afterEnd",'<span class="error" style="color: red">Пустое поле!</span>');
            this.obj.style.border = "2px solid red";
            return false;
        }
        if(this.regexp.test(this.obj.value)){
            return true;
        } else {
            this.obj.insertAdjacentHTML("afterEnd",`<span class="error" style="color: red">Строка не удовлетворяет шаблону "${this.template}"</span>`);
            this.obj.style.border = "2px solid red";
            return false;
        }
        
    }
}



function validate(){
    const nameField = document.getElementById('nameField');
    const emailField = document.getElementById('emailField');
    const phoneField = document.getElementById('phoneField');
    
    console.log(phoneField.value);
    const name = new Field(nameField, /^[A-Za-zА-Яа-я]+\s[A-Za-zА-Яа-я]+$/, 'Имя Фамилия');
    const email = new Field(emailField, /^([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z\.]{2,6})$/, 'mymail@mail.ru, my.mail@mail.ru или my-mail@mail.ru');
    const phone = new Field(phoneField, /^\+7\(\d{3}\)\d{3}-\d{4}$/, '+7(000)000-0000');
    if(!name.validation()|!email.validation()|!phone.validation()) return false;
}

