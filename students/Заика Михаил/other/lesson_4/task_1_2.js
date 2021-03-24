// 1. Дан большой текст, в котором для оформления прямой речи используются одинарные кавычки.
// Придумать шаблон, который заменяет одинарные кавычки на двойные.

const content = document.getElementById('content');
const text = "Lorem ipsum dolor's sit amet consectetur adipisicing elit. Non a illo doloribus tenetur enim fugit dolor id reiciendis voluptatem delectus, ab ex odio accusantium quae perspiciatis. 'Adipisci, sint dicta!' 'Velit!'";
const p = document.createElement("p");
p.textContent = text;
content.appendChild(p);

// Задача 1
const p1_title = document.createElement("p");
const p1 = document.createElement("p");

p1_title.innerHTML = "<b>Задача 1:</b>";
p1.textContent = text.replace(/'/g, '"');

content.appendChild(p1_title);
content.appendChild(p1);

// Задача 2
const p2_title = document.createElement("p");
const p2 = document.createElement("p");

p2_title.innerHTML = "<b>Задача 2:</b>";
p2.textContent = text.replace(/(?!s'|[a-z]'[a-z])([\s\S])'|^'/ig, '$1"');

content.appendChild(p2_title);
content.appendChild(p2);
