import { convertMs } from './utils/convertMs';
import { addLeadingZero } from './utils/addLeadingZero';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const datetime = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
const daysSpan = document.querySelector('span[data-days]');
const hoursSpan = document.querySelector('span[data-hours]');
const minutesSpan = document.querySelector('span[data-minutes]');
const secondsSpan = document.querySelector('span[data-seconds]');

startBtn.disabled = true;
let userSelectedDate;
let now;
let intervalId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0].getTime();
    now = Date.now();

    if (userSelectedDate < now) {
      iziToast.warning({
        title: 'Wrong date',
        message: 'Please choose a date in the future',
        position: 'topCenter',
      });
      startBtn.disabled = true;
    } else {
      startBtn.disabled = false;
    }
  },
};

const handleStartBtnClick = () => {
  startBtn.disabled = true;
  datetime.disabled = true;

  intervalId = setInterval(() => {
    now = Date.now();

    let timeDelta = userSelectedDate - now;

    if (timeDelta <= 0) {
      clearInterval(intervalId);
      datetime.disabled = false;

      daysSpan.textContent = '00';
      hoursSpan.textContent = '00';
      minutesSpan.textContent = '00';
      secondsSpan.textContent = '00';

      iziToast.info({
        title: 'Countdown finished!',
        message: 'You may enter new date and time',
        position: 'topCenter',
      });

      return;
    }

    const { days, hours, minutes, seconds } = convertMs(timeDelta);
    daysSpan.textContent = addLeadingZero(days);
    hoursSpan.textContent = addLeadingZero(hours);
    minutesSpan.textContent = addLeadingZero(minutes);
    secondsSpan.textContent = addLeadingZero(seconds);
  }, 1000);
};
startBtn.addEventListener('click', handleStartBtnClick);

flatpickr(datetime, options);
