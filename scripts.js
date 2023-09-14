const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fullScreen = player.querySelector('.fullscreen');

let isDragging = false;

function togglePlay() {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }       
}

function updateToggleButton() {
    const icon = this.paused ? '►' : '❚❚';
    toggle.textContent = icon;
}

function skip() {
    video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate(e) {
    if (e.type === 'change' || isDragging) {
        let property = this.name;
        video[property] = this.value;
    }
}

function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateToggleButton);
video.addEventListener('pause', updateToggleButton);
video.addEventListener('timeupdate', handleProgress);

let scrubDrag = false;

progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => scrubDrag && scrub(e));
progress.addEventListener('mousedown', () => scrubDrag = true);
progress.addEventListener('mouseup', () => scrubDrag = false);
progress.addEventListener('mouseout', () => scrubDrag = false);


toggle.addEventListener('click', togglePlay);

skipButtons.forEach(button => button.addEventListener('click', skip));

ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousedown', () => { isDragging = true;}));
ranges.forEach(range => range.addEventListener('mouseup', () => { isDragging = false;}));
ranges.forEach(range => range.addEventListener('mouseout', () => { isDragging = false;}));

fullScreen.addEventListener('click', () => video.requestFullscreen());