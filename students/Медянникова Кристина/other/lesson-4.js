'use strict';
/*  1. Дан большой текст, в котором для оформления прямой речи используются одинарные кавычки. Придумать шаблон, который заменяет одинарные кавычки на двойные.
    2. Улучшить шаблон так, чтобы в конструкциях типа aren't одинарная кавычка не заменялась на двойную.*/

    let form = document.forms.regform;
    //Возвращает ссылку на элемент по его идентификатору (ID) - document.getElements
    let boxNextEx = document.getElementsByClassName('content-box-btn');
    
    let textBefore = document.getElementById('text-box__content-text'); 
    let textAfter = document.getElementById('text-box__after-text'); 
    
    
    let changeText = () => {
        //textContent-это свойство, которое предназначено для работы с текстовым контентом элемента
        let str = textBefore.textContent;
        console.log(str);
    //извлекаем и копируем текст 
        textAfter.innerText = str.replace(/^'|(\s)'|'(\s)|'$/g, '$1"$2');
   
    };
    
/*3. Создать форму обратной связи с полями: Имя, Телефон, E-mail, текст, кнопка Отправить. При нажатии на кнопку Отправить произвести валидацию полей следующим образом:
a.  Имя содержит только буквы.
b.  Телефон имеет вид +7(000)000-0000.
c.  E-mail имеет вид mymail@mail.ru, или my.mail@mail.ru, или my-mail@mail.ru.
d.  Текст произвольный.
e.  Если одно из полей не прошло валидацию, необходимо выделить это поле красной рамкой и сообщить пользователю об ошибке.*/

//задаем объект и возвращаем документ в текущую форму
 let form = document.forms.regform;
 let spanErrorText = document.getElementsByClassName('error_text');
 let inputArea = document.getElementsByClassName('form-content__feedback');

//ИМЯ валидация 
 let nameValidation = (name) => {
    console.log('funcNameValid');
    
    //Конструктор RegExp создаёт объект регулярного выражения для сопоставления текста с шаблоном.
    let regExp = /^[A-Za-zА-Яа-я ]+$/;

    if (name.value == '') {
        spanErrorText[0].innerText = 'Заполните поле.';
        return false;
    }
    if (name.value.match(regExp)) { 
        return true;
    } else {
        spanErrorText[0].innerText = 'Имя должно содержать только буквы ';
        name.classList.add("input_error");
        name.classList.add("p_error");
        name.focus();
        return false;
    }
};
//Mail валидация 
 let mailValidation = (mail) => {
    console.log('funcMailValid');
    
    let regExp = /^[-._a-z0-9]+@(?:[a-z0-9][-a-z0-9]+\.)+[a-z]{2,6}$/;
    
    if (mail.value == '') {
        spanErrorText[1].innerText = 'Заполните поле.';
        return false;
    }
    if (mail.value.match(regExp)) { 
        return true;
    } else {
       
        spanErrorText[1].innerText = 'E-mail должен иметь вид mymail@mail.ru, или my.mail@mail.ru, или my-mail@mail.ru.';
        mail.classList.add('input_error');
        mail.classList.add('p_error');
        mail.focus();
        return false;
    }
};

//telephone валидация 
 let telephoneValidation = (telephone) => {
    console.log('funcPhoneValid');
    
    let regExp = /^\+\d{1}\(\d{3}\)\d{3}-\d{4}$/;
    
    if (telephone.value == '' ||  telephone.value == '+7(000)000-0000') {
        spanErrorText[2].innerText = 'Заполните поле.';
        return false;
    }

    if (telephone.value.match(regExp)) { 
        return true;
    } else {
       
        spanErrorText[2].innerText = 'Телефон должен иметь вид +7(000)000-0000.';
        telephone.classList.add('input_error');
        telephone.classList.add('p_error');
        telephone.focus();
        return false;
    }
};

//очистка всех текстов с ошибками
let clearErrorText = () => {
    for (let n = 0; n < spanErrorText.length; n++) {
        spanErrorText[n].innerText = ' ';
    }
};
//очистка красной рамки в input с ошибками
let clearInputArea = () => {
    for (let n = 0; n < inputArea.length; n++) {
        let classList = inputArea[n].classList;
        console.log(classList);

        if (classList.contains('input_error') === true) {
            classList.remove('input_error');
            classList.remove('p_error');
        }
    }
};
//валидация формы глобальная функция 
let formValidation = function(e) {
    e.preventDefault();
    console.log('Run validation');

     clearErrorText(); //очистка ВСЕХ текстов с ошибками
     clearInputArea(); //очистка красной рамки в input с ошибками

    let name = form.elements.name;
    let mail = form.elements.email;
    let telephone = form.elements.telephone; 
    
    let result = true;

    if (nameValidation(name) == false) {
        
        result = false;
    }

    if (mailValidation(mail) == false) {
        result = false;
    }

    if (telephoneValidation(telephone) == false) {
        result = false;
    }

    if (result == false) {
        document.getElementById('form-content__feedback__headline').innerText = 'Ошибка, данные не приняты.'
    }
    if (result == true) {
        document.getElementById('form-content__feedback__headline').innerText = 'Спасибо, Ваши данные приняты.'
    }
    
    return result;
};