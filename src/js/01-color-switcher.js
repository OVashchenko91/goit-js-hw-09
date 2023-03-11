
const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
let interval;

startBtn.addEventListener('click', changeColorOnBody);
stopBtn.addEventListener('click', stopChangeColor);
buttonsGrowPlease();

function buttonsGrowPlease() { //встановлює розміри всіх кнопок на сторінці одинаковими,за допомогою циклу forEach, який перебирає всі кнопки на сторінці та встановлює відповідні  "width" і "height"
  let buttons = document.querySelectorAll('button');
  buttons.forEach(btn => {
    btn.style.width = '100px';
    btn.style.height = '60px';
  });
}

function getRandomHexColor() { //генерує випадковий колір, який використовується в якості значення властивості "backgroundColor" елемента "body"
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function changeColorOnBody() {//встановлює інтервал в 1 секунду для оновлення кольору фону сторінки за допомогою функції "getRandomHexColor". При цьому кнопка "Пуск" блокується, щоб користувач не міг запустити функцію два рази
  interval = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  startBtn.disabled = true;
}

function stopChangeColor() { //зупиняє інтервал, встановлений у функції "changeColorOnBody", і розблокує кнопку "Старт", викликається при натисканні на кнопку «Стоп»
  clearInterval(interval);
  startBtn.disabled = false;
}
