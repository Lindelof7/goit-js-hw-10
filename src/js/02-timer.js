import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix, { Notify } from 'notiflix';

const startButtonEl = document.querySelector(('button[data-start]'));
const inputEl = document.querySelector('#datetime-picker');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minsEl = document.querySelector('[data-minutes]');
const secsEl = document.querySelector('[data-seconds]');
const Interval = 1000;


const dateNow = Date.now();
let convertedDate = {days:0, hours:0, minutes:0, seconds:0};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const ms = selectedDates[0] - dateNow;
    onInputDate(selectedDates[0]);
  },
};

startButtonEl.disabled = true;

function onInputDate(selectedDates) {
  if (selectedDates <= Date.now()) {
    startButtonEl.disabled = true;
    Notify.failure('Please choose a date in the future');
  } else {
    startButtonEl.disabled = false;
    timerStart(selectedDates)
  }
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
 
   return { days:days, hours, minutes, seconds } ;
}

const fp = flatpickr("#datetime-picker", options)

function timerStart(selectedDates) {
  startButtonEl.addEventListener("click", () => {
    startButtonEl.disabled = true;
    inputEl.setAttribute('disabled', '');
    timerStart = setInterval(() => {
      let currentTime = Date.now();
      let timeLeft = Date.parse(selectedDates) - currentTime;
      convertedDate = convertMs(timeLeft);
      onStartClick();
      if (timeLeft <= 1000) {
        clearInterval(timerStart);
        return;
      }
}, Interval)
  })
}

function onStartClick(selectedDates) {
  daysEl.textContent = convertedDate.days.toString().padStart(2, '0');
  hoursEl.textContent = convertedDate.hours.toString().padStart(2, '0');
  minsEl.textContent = convertedDate.minutes.toString().padStart(2, '0');
  secsEl.textContent = convertedDate.seconds.toString().padStart(2, '0');
}


