 // Elements
const video = document.getElementById('movie');
const playBtn = document.getElementById('playBtn');
const pauseBtn = document.getElementById('pauseBtn');
const muteBtn = document.getElementById('muteBtn');
const volumeSlider = document.getElementById('volumeSlider');
const timeDisplay = document.getElementById('timeDisplay');
const videoList = document.getElementById('videoList');

// Video library (badilisha URLs hizi kuwa video zako halisi)
const videos = [
    { title: "Sample Video 1", src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" },
    { title: "Sample Video 2", src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" },
    { title: "Sample Video 3", src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" },
    { title: "Sample Video 4", src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4" },
];

// Initialize video list
function initVideoList() {
    videoList.innerHTML = '';
    videos.forEach((videoItem, index) => {
        const li = document.createElement('li');
        li.innerHTML = `🎥 ${videoItem.title}`;
        li.addEventListener('click', () => loadVideo(index));
        videoList.appendChild(li);
    });
}

// Load a video
function loadVideo(index) {
    const videoItem = videos[index];
    video.src = videoItem.src;
    video.load();
    
    // Update active video in list
    document.querySelectorAll('#videoList li').forEach(li => li.classList.remove('playing'));
    videoList.children[index].classList.add('playing');
    
    // Auto play (optional)
    video.play().catch(e => console.log("Auto-play blocked:", e));
}

// Format time (seconds to MM:SS)
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// Update time display
function updateTimeDisplay() {
    timeDisplay.textContent = `${formatTime(video.currentTime)} / ${formatTime(video.duration)}`;
}

// Event Listeners
playBtn.addEventListener('click', () => video.play());
pauseBtn.addEventListener('click', () => video.pause());

muteBtn.addEventListener('click', () => {
    video.muted = !video.muted;
    muteBtn.textContent = video.muted ? "🔊 Unmute" : "🔇 Mute";
});

volumeSlider.addEventListener('input', () => {
    video.volume = volumeSlider.value;
});

video.addEventListener('timeupdate', updateTimeDisplay);
video.addEventListener('loadedmetadata', () => {
    updateTimeDisplay();
    console.log(`Video loaded: ${formatTime(video.duration)}`);
});

// Initialize
initVideoList();
loadVideo(0); // Load first video by default

// Optional: Keyboard controls
document.addEventListener('keydown', (e) => {
    switch(e.key) {
        case ' ':
        case 'k':
            video.paused ? video.play() : video.pause();
            break;
        case 'm':
            video.muted = !video.muted;
            muteBtn.textContent = video.muted ? "🔊 Unmute" : "🔇 Mute";
            break;
        case 'ArrowLeft':
            video.currentTime -= 10;
            break;
        case 'ArrowRight':
            video.currentTime += 10;
            break;
    }
});
