import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const elements = {
  datePicker: document.querySelector('input#datetime-picker'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
  startBtn: document.querySelector('button[data-start]'),
};

let countDown = null;
let intervalId = null;
let isActiveCountDown = false;
elements.startBtn.setAttribute('disabled', 'true');

elements.startBtn.addEventListener('click', handleStartBtn);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < options.defaultDate) {
      iziToast.show({
        title: 'Wrong date chosen',
        message: 'Please choose a date in the future',
        color: 'blue', // blue, red, green, yellow
      });
    } else {
      elements.startBtn.removeAttribute('disabled');
      countDown = selectedDates[0];
    }
  },
  onOpen() {
    clearInterval(intervalId);
    isActiveCountDown = false;
    elements.startBtn.setAttribute('disabled', 'true');
  },
};

const timer = {
  start() {
    if (isActiveCountDown) {
      return;
    }

    isActiveCountDown = true;
    intervalId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = countDown - currentTime;
      const { days, hours, minutes, seconds } = convertMs(deltaTime);

      if (deltaTime <= 1000) {
        this.stop();
      }

      updateCountDown({ days, hours, minutes, seconds });
    }, 1000);
  },

  stop() {
    clearInterval(intervalId);
    isActiveCountDown = false;
    elements.datePicker.removeAttribute('disabled');
  },
};

flatpickr(elements.datePicker, options);

function handleStartBtn() {
  timer.start();
  elements.startBtn.setAttribute('disabled', 'true');
  elements.datePicker.setAttribute('disabled', 'true');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function updateCountDown({ days, hours, minutes, seconds }) {
  elements.days.textContent = days;
  elements.hours.textContent = hours;
  elements.minutes.textContent = minutes;
  elements.seconds.textContent = seconds;
}
