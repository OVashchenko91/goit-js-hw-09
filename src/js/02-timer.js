import flatpickr from 'flatpickr'; //створення поля введення дати й часу, за допомогою якого користувач може вибрати майбутню дату й час
import 'flatpickr/dist/flatpickr.min.css';


let userDate = null;
let timerInterval = null;
//код налаштовує елементи HTML для таймера та отримує необхідні елементи за допомогою querySelector методу.
timerStyle();
function timerStyle() {
  const timerContainerStyle = document.querySelector('.timer').style;
  timerContainerStyle.display = 'flex';
  timerContainerStyle.gap = '1%';

  document.querySelectorAll('.field').forEach(item => {
    const { style } = item;
    style.display = 'flex';
    style.flexDirection = 'column';
    style.alignItems = 'center';
    style.gap = '10%';
  });
}

const refs = {
  dateTimeField: document.querySelector('input#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),

  daysField: document.querySelector('[data-days]'),
  hoursField: document.querySelector('[data-hours]'),
  minutesField: document.querySelector('[data-minutes]'),
  secondsField: document.querySelector('[data-seconds]'),
};

const {
  dateTimeField: dateTimeInput,
  startBtn,
  daysField: daysInput,
  hoursField: hoursInput,
  minutesField: minutesInput,
  secondsField: secondsInput,
} = refs;

startBtn.disabled = true;
const options = {
  enableTime: true,
  time_24hr: true,
  minuteIncrement: 1,
  defaultDate: new Date(),
  onClose([selectedDate]) {//Коли користувач вибирає дату, onCloseзапускається функція, яка перевіряє, чи є вибрана дата в майбутньому, і якщо так, активує кнопку start та зберігає вибрану дату для подальшого використання


    if (!selectedDate || selectedDate < options['defaultDate']) {
      Notify.failure('Please choose Date in the future!');
      return;
    }
    userDate = selectedDate;
    startBtn.disabled = false;
  },
};

flatpickr(dateTimeInput, options);

const addLeadingZero = value => String(value).padStart(2, 0);//доповнити однозначне число нулем на початку 

const convertMs = ms => {//перетворити мілісекунди на дні, години, хвилини та секунди
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
};

const updateTimer = () => {//обчислює час, що залишився до вибраної дати й часу, і відповідно оновлює дисплей таймера. Якщо час, що залишився, менше або дорівнює нулю, функція зупиняє інтервал таймера за допомогою clearInterval.
  const timerValue = userDate - Date.now();
  if (timerValue <= 0) {
    clearInterval(timerInterval);
    return;
  }

  const { days, hours, minutes, seconds } = convertMs(timerValue);

  daysInput.textContent = addLeadingZero(days);
  hoursInput.textContent = addLeadingZero(hours);
  minutesInput.textContent = addLeadingZero(minutes);
  secondsInput.textContent = addLeadingZero(seconds);
};

const start = () => {//запускає інтервал таймера та вимикає інструмент вибору дати й часу та кнопку start
  updateTimer();
  timerInterval = setInterval(updateTimer, 1000);
  dateTimeInput.disabled = true;
  startBtn.disabled = true;
};

const onStartBtn = () => {//перевіряє, чи є вибрана дата в майбутньому, і якщо так, викликає функцію start. start потім налаштовується подія натискання кнопки для запуску функції onStartBtn
  const currentDate = new Date();

  if (userDate < currentDate) {
    Notify.failure('Please choose Date in the future!');
    return;
  }

  start();
};

startBtn.addEventListener('click', onStartBtn);
