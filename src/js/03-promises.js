import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', onSubmitClick);

function onSubmitClick(evt) {
  evt.preventDefault();

  const delayStep = Number(evt.currentTarget.step.value);
  const amount = Number(evt.currentTarget.amount.value);
  let delay = Number(evt.currentTarget.delay.value);
  let position = 1;

  for (let i = 1; i <= amount; i += 1) {
    createPromise(position, delay)
      .then(({ position, delay }) => {
        iziToast.show({
          // title: '',
          message: '✅ Fulfilled promise ${position} in ${delay}ms',
          color: 'green', // blue, red, green, yellow
        });
        // Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        iziToast.show({
          // title: '',
          message: '❌ Rejected promise ${position} in ${delay}ms',
          color: 'green', // blue, red, green, yellow
        });
        // Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });

    position += 1;
    delay += delayStep;
  }

  evt.currentTarget.reset();
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
