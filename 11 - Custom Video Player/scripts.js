const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('.player__button[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

function togglePlay() {
  (video.paused) ? video.play() : video.pause(); 
}

function updateButton() {
  toggle.textContent = (video.paused) ? '▶️' : '▌▌' ;
}

function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
  video[this.name] = this.value;
}

function handleRangeMove() {
  this.addEventListener('mousemove', handleRangeUpdate);
  this.addEventListener('mouseup', () => {
    this.removeEventListener('mousemove', handleRangeUpdate);
  })
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

const scrub = (function() {
  let delay = false;
  
  return function(e) {
    if (delay) return;
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
    delay = true;
    setTimeout(() => delay = false, 100);
  }
})();

function handleScrub(e) {
  scrub(e);

  this.addEventListener('mousemove', scrub);
  this.addEventListener('mouseup', () => { 
    this.removeEventListener('mousemove', scrub);
  });
}

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);
skipButtons.forEach(btn => btn.addEventListener('click', skip));
ranges.forEach(rng => rng.addEventListener('change', handleRangeUpdate));
ranges.forEach(rng => rng.addEventListener('mousedown', handleRangeMove));

progress.addEventListener('mousedown', handleScrub);

//---fullscreen---

const fullscreen = player.querySelector('.player__fullscreen');

let fullScreenEnabled = !!(document.fullscreenEnabled 
  || document.mozFullScreenEnabled 
  || document.msFullscreenEnabled 
  || document.webkitSupportsFullscreen 
  || document.webkitFullscreenEnabled 
  || document.createElement('video').webkitRequestFullScreen);

function isFullScreen() {
  return !!(document.fullScreen 
    || document.webkitIsFullScreen 
    || document.mozFullScreen 
    || document.msFullscreenElement 
    || document.fullscreenElement);
}

if (!fullScreenEnabled) {
  fullscreen.style.display = 'none';
}

function handleFullscreen() {
  if (isFullScreen()) {
    if (document.exitFullscreen) document.exitFullscreen();
    else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
    else if (document.webkitCancelFullScreen) document.webkitCancelFullScreen();
    else if (document.msExitFullscreen) document.msExitFullscreen();
  } else {
    if (player.requestFullscreen) player.requestFullscreen();
    else if (videoContainer.mozRequestFullScreen) videoContainer.mozRequestFullScreen();
    else if (videoContainer.webkitRequestFullScreen) videoContainer.webkitRequestFullScreen();
    else if (videoContainer.msRequestFullscreen) videoContainer.msRequestFullscreen();
 }
}

fullscreen.addEventListener('click', handleFullscreen);