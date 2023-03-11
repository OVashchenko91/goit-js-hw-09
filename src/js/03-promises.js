

//визначає елемент форми з назвою класу "form" і вибирає три елементи введення з іменами "delay", "step" і "amount" за допомогою методу querySelector. Ці вхідні елементи використовуються для налаштування промісів, які будуть створені та вирішені або відхилені.
const form = document.querySelector('.form');

const firstDelay = document.querySelector('[name="delay"]');
const step = document.querySelector('[name="step"]');
const amount = document.querySelector('[name="amount"]');

form.addEventListener('submit', submitPromises);//прикріплює слухач подій до елемента форми для події надсилання

function submitPromises(e) {//Коли форма надсилається, викликається функція 'submitPromises'. Ця функція запобігає поведінці надсилання форми за допомогою «e.preventDefault», а потім ініціалізує змінну «delay» значенням вхідного елемента «firstDelay»
  e.preventDefault();

  let delay = firstDelay.valueAsNumber;

  for (let i = 1; i <= amount.valueAsNumber; i += 1) {// цикл виконується ? разів, щоразу створюючи новий Promise за допомогою функції «createPromise».
    createPromise(i, delay) //створює Promise, який вирішує або відхиляє випадковим чином після затримки, визначеної змінною 'delay'.
      .then(({ position, delay }) => {//для кожного створеного Promise викликається метод then із функцією зворотного виклику успіху, яка відображає сповіщення про успіх за допомогою об’єкта Notify
        Notify.success(`✅ Fulfilled promise ${i} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {//метод catch викликається функцією зворотного виклику помилки, яка відображає сповіщення про помилку за допомогою об’єкта Notify
        Notify.failure(`❌ Rejected promise ${i} in ${delay}ms`);
      });
    delay += step.valueAsNumber; //змінна «delay» збільшується на значення вхідного елемента «step» у кожній ітерації циклу, так що кожен проміс створюється з більшою затримкою, ніж попередня
  }
}

function createPromise(position, delay) { //призначена для повернення нового промісу, який вирішується або відхиляється після визначеної затримки за допомогою методу setTimeout. Проміс вирішується або відхиляється на основі випадково згенерованого значення, яке визначає, чи потрібно виконати проміс чи відхилити.
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}