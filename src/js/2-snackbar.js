import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

const handleSubmit = evt => {
  evt.preventDefault();
  const delay = Number(evt.currentTarget.elements.delay.value);
  const state = evt.currentTarget.state.value;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(`✅ Fulfilled promise in ${delay}ms`);
      }

      if (state === 'rejected') {
        reject(`❌ Rejected promise in ${delay}ms`);
      }
    }, delay);
  });

  promise
    .then(message =>
      iziToast.show({
        message: message,
        position: 'topRight',
        color: 'green',
        close: false,
      })
    )
    .catch(err =>
      iziToast.show({
        message: err,
        position: 'topRight',
        color: 'red',
        close: false,
      })
    );

  form.reset();
};

form.addEventListener('submit', handleSubmit);
