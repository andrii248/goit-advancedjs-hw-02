import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', onSubmitClick);

function onSubmitClick(evt) {
  evt.preventDefault();

  const delayStep = Number(evt.currentTarget.step.value);
  const amount = Number(evt.currentTarget.amount.value);
  let delay = Number(evt.currentTarget.delay.value);

  for (let i = 1; i <= amount; i += 1) {
    createPromise(delay)
      .then(({ delay }) => {
        iziToast.show({
          message: `✅ Fulfilled promise ${i} in ${delay}ms`,
          color: 'green', // blue, red, green, yellow
        });
      })
      .catch(({ position, delay }) => {
        iziToast.show({
          message: `❌ Rejected promise ${i} in ${delay}ms`,
          color: 'green', // blue, red, green, yellow
        });
      });

    delay += delayStep;
  }

  evt.currentTarget.reset();
}

function createPromise(delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ delay });
      } else {
        reject({ delay });
      }
    }, delay);
  });
}
