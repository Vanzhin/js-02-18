//Исходный текст
var text = "   '000' '1221' '133331' aren't";

//Задание №1
var regexp = new RegExp('\'', 'g');
res = text.replace(regexp, '\"')
console.log(`Задание №1. Replace result:`, res);

//Задание №2
var regexp = new RegExp(' \'', 'g');
res = text.replace(regexp, ' \"')
var regexp = new RegExp('\' ', 'g');
res = res.replace(regexp, '\" ')
console.log(`Задание №2. Replace result:`, res);

//Задание №3
var selectElement = document.querySelector('[name="sendbutton"]');
selectElement.addEventListener('click', (e) => {
    console.log(selectElement)
    filter_name= /^[a-zA-Zа-яА-Я]+$/
    filter_tel= /^\+\d\(\d{3}\)\d{3}-\d{4}$/
    filter_email= /^.+@.+$/
    error_message = ''
    if(!filter_name.test(document.forms["sendform"].name.value)){
        document.forms["sendform"].name.style.backgroundColor = "red";
        error_message = 'Неверный формат имени. Требуется: только буквы'
    } else {
        document.forms["sendform"].name.style.backgroundColor = "";
    }
    if(!filter_tel.test(document.forms["sendform"].tel.value)){
        document.forms["sendform"].tel.style.backgroundColor = "red";
        error_message = 'Неверный формат телефонного номера. Требуется: +7(000)000-0000'
    } else {
        document.forms["sendform"].tel.style.backgroundColor = "";
    }
    if(!filter_email.test(document.forms["sendform"].email.value)){
        document.forms["sendform"].email.style.backgroundColor = "red";
        error_message = 'Неверный формат электронного адреса. Требуется: name@domain.ru'
    } else {
        document.forms["sendform"].email.style.backgroundColor = "";
    }

    if(error_message === ''){
        alert('Поздравляем, форма отправлена успешна')
    } else {
        alert(error_message)
    }
    e.preventDefault()

});
