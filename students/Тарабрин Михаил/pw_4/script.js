let text = document.querySelector('.text');
let btn1 = document.querySelector('.totalChange')
let btn2 = document.querySelector('.uniqueChange')
let reset = document.querySelector('.resetAll')
let regExToAllTxt = /'/g
let regExToSpecTxt = /(\s'|'\s)/g
let example = text.innerHTML;
let received = document.querySelector('.button')

btn1.addEventListener('click', (event) => {
    text.innerHTML = example.replace(regExToAllTxt, '"')
});

btn2.addEventListener('click', (event) => {
    text.innerHTML = example.replace(regExToSpecTxt, '"')
});

reset.addEventListener('click', (event) => {
    text.innerHTML = example
});

received.addEventListener('click', (event) => {

    let arr = {
    name: document.testForm.name.value,
    mail: document.testForm.mail.value,
    phone: document.testForm.phone.value,
    textArea: document.testForm.letter.value,
        };
    
    let correctMail = /^([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z\.]{2})$/;
    let correctPhone = /^\+7\(\d{3}\)\d{3}\-\d{4}$/;
    
    if (arr.name.length == 0) {
        document.testForm.name.style = 'border: 2px solid red; color: red'
        document.testForm.name.value = 'fill that field'
    } else if (arr.textArea.length == 0) {
        document.testForm.letter.style = 'border: 2px solid red; color: red'
        document.testForm.letter.value = 'fill that field'
    } else if (!(correctMail.test(arr.mail))){
        document.testForm.mail.style = 'border: 2px solid red; color: red'
        document.testForm.mail.value += ' incorrect email' 
    } else if (!(correctPhone.test(arr.phone))){
        document.testForm.phone.style = 'border: 2px solid red; color: red'
        document.testForm.phone.value += ' incorrect phone number' 
    };
})
