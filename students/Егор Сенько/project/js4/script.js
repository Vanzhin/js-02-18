const str = "Text ' more text' te'xt 'TEXT! ' ";
const regexp = /\'\B|\B\'/g;
let newStr = str.replace(regexp, "\""); 

console.log(newStr);

let username = "Sefiroth";
let phone = "+79067615750";
let email = "vladimir.asd-132@asd.ru";
let text = "Как-то так, или иначе";

let validation = (name, phone, email, text) => {
    const regname = /^[а-яёА-ЯЁa-zA-Z\s]+$/g;
    const regphone = /^\+?\d{11,13}$/g;
    const regemail = /^[a-zA-Z\.\-0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]+$/g;
    const regtext = /^.+$/g;

    if (!regname.test(name) || !regphone.test(phone) || !regemail.test(email) || !regtext.test(text)) {
        return console.log('Ошибка');
    }

    return console.log('Введено корректно');
}

validation(userame, phone, email, text);