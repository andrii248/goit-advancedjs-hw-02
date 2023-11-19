const elements = {
  body: document.querySelector('body'),
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
};
let intervalId = null;

elements.startBtn.addEventListener('click', handleStartBtn);
elements.stopBtn.addEventListener('click', handleStopBtn);
elements.stopBtn.setAttribute('disabled', 'true');

function handleStartBtn() {
  intervalId = setInterval(() => {
    elements.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  elements.startBtn.disabled = true;
  elements.stopBtn.disabled = false;
}

function handleStopBtn() {
  clearInterval(intervalId);
  elements.startBtn.disabled = false;
  elements.stopBtn.disabled = true;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
