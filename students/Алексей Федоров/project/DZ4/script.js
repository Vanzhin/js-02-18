const str = `'Что-то похолодало, может, неподалеку град прошел', - подумал Петр. 
Я тебе приказываю: 'Оставь брата в покое, пусть сам разбирается со своей жизнью'.
aren't aren't aren't 
said 'It's a boy, Walter.'
` ;
const regexp = /'/gm;              
console.log('Исходный текст');
console.log(str);

const strB = str.replace(regexp, '"'); 
console.log('1 задание:');
console.log(strB);

console.log('2 задание 1 вариант:');
const regexpC = /'(?!\b)/gm; 
const strC = str.replace(regexpC, '"'); 
console.log(strC);

console.log('2 задание 2 вариант:');
const regexpA = /(?<!\w)'(?!=\w)/gm;
const strA = str.replace(regexpA, '"'); 
console.log(strA);



let elements = document.querySelector('.search').querySelectorAll('input');

//console.log(elements);
let d=0
elements.forEach(good => {
  good.setAttribute("data-al", d);
  
  d++;
});

document.querySelector('.search').addEventListener('input', (event) => {
  validationInput(event.target);
});

document.querySelector('.search > button').addEventListener('click',() => {
  validationSend(elements);
});



function validationInput(e) {
  const pattern=[/[А-Яа-я]+/g, /\+\d\(\d{3}\)\d{3}-\d{4}/g, /\w+[.-]?\w+@mail.ru/g, /\S+/g]
   
  if (!pattern[parseFloat(e.dataset.al)].test(e.value) || (e.value.match(pattern[parseFloat(e.dataset.al)]) != e.value)) {
    e.classList.add("red");
  } else {
    e.classList.remove("red");
  }
}

function validationSend(elements) {
  let hint = false; 
  let mistake = true; 
  elements.forEach(good => {
    
    validationInput(good);
    
    if (good.classList.contains("red") && !hint) {
      let listHtml = '';
      mistake = false;
      if (good.value === '' ) {
        listHtml = `<div class="hint"><p>Заполните это поле</p></div>`
      } else {
        listHtml = `<div class="hint"><p>Введите данные в указанном формате</p></div>`
      }
      good.insertAdjacentHTML("afterend",listHtml );
      hint = true;
      setTimeout(() => {
        document.querySelector('.hint').remove();
        hint = false;
      }, 3000);
    }

  });

  if (mistake)  {sendingTo()}
  
};

function sendingTo() {
  console.log('отправка');
}