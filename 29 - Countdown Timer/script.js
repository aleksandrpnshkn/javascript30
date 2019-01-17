let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const btns = document.querySelectorAll('[data-time]');

function timer(seconds) {
  clearInterval(countdown);

  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimeLeft(seconds);
  displayEndTime(then);
  
  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    if (secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }
    displayTimeLeft(secondsLeft);
  }, 1000);
}

function displayTimeLeft(totalSecs) {
  const mins = Math.abs(Math.floor(totalSecs / 60));
  const secs = Math.abs(totalSecs % 60);
  const display = `${mins}:${secs < 10 ? '0' : '' }${secs}`;
  document.title = display;
  timerDisplay.textContent = display;
}

function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hour = end.getHours();
  const mins = end.getMinutes();
  endTime.textContent = `Be Back At ${hour}:${mins < 10 ? '0' : ''}${mins}`;
}

function startTimer() {
  const secs = parseInt(this.dataset.time);
  timer(secs);
}

btns.forEach(btn => btn.addEventListener('click', startTimer));
document.customForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const mins = this.minutes.value;
  timer(mins * 60);
  this.reset();
})