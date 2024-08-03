const audio = document.getElementById('audio');
const trackTitle = document.getElementById('track-title');
const playButton = document.querySelector('.controls button:nth-child(2)');
const progress = document.getElementById('progress');

let isPlaying = false;
let currentTrack = 0;

const tracks = [
    { title: "teri dewani", src: "teri dewani.mp3" },
    { title: "ek pyar", src: "ek pyar.mp3" },
    { title: "arman de", src: "arman de.mp3" }
];

function loadTrack(index) {
    audio.src = tracks[index].src;
    trackTitle.textContent = tracks[index].title;
    audio.load();
    updateProgress();
}

function playPause() {
    if (isPlaying) {
        audio.pause();
        playButton.textContent = 'Play';
    } else {
        audio.play();
        playButton.textContent = 'Pause';
    }
    isPlaying = !isPlaying;
}

function prevTrack() {
    currentTrack = (currentTrack - 1 + tracks.length) % tracks.length;
    loadTrack(currentTrack);
    if (isPlaying) audio.play();
}

function nextTrack() {
    currentTrack = (currentTrack + 1) % tracks.length;
    loadTrack(currentTrack);
    if (isPlaying) audio.play();
}

function seekBackward() {
    audio.currentTime = Math.max(0, audio.currentTime - 10);
}

function seekForward() {
    audio.currentTime = Math.min(audio.duration, audio.currentTime + 10);
}

function seekTrack(value) {
    audio.currentTime = (audio.duration * value) / 100;
}

function updateProgress() {
    if (audio.currentTime && audio.duration) {
        progress.value = (audio.currentTime / audio.duration) * 100;
    }
}

audio.addEventListener('timeupdate', updateProgress);

audio.addEventListener('ended', nextTrack);

// Load the first track initially
loadTrack(currentTrack);
