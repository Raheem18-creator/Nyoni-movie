 // ===========================================
// NYONI-MOVIE PLAYER - JAVASCRIPT
// Modern, Feature-Rich Video Player
// Version 1.0
// ===========================================

// Player Configuration
const CONFIG = {
    defaultVolume: 80,
    autoPlayNext: true,
    loopPlaylist: false,
    defaultTab: 'movies',
    rewindTime: 10,
    forwardTime: 10,
    storageKey: 'nyoni-movie-player-settings'
};

// Global Variables
let currentVideoIndex = -1;
let playlist = [];
let movies = [];
let series = [];
let isPlaying = false;
let isMuted = false;
let isFullscreen = false;
let currentTab = CONFIG.defaultTab;
let playerSettings = {};
let searchTimeout = null;

// DOM Elements
const videoPlayer = document.getElementById('videoPlayer');
const playPauseBtn = document.getElementById('play-pause');
const playPauseIcon = playPauseBtn.querySelector('i');
const muteBtn = document.getElementById('mute');
const muteIcon = muteBtn.querySelector('i');
const volumeSlider = document.getElementById('volume');
const progressBar = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const rewindBtn = document.getElementById('rewind');
const forwardBtn = document.getElementById('forward');
const fullscreenBtn = document.getElementById('fullscreen');
const fullscreenIcon = fullscreenBtn.querySelector('i');
const speedSelect = document.getElementById('speed-select');
const currentTitle = document.getElementById('current-title');
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('i');
const helpModal = document.getElementById('help-modal');
const settingsModal = document.getElementById('settings-modal');
const clearPlaylistBtn = document.getElementById('clear-playlist');
const videoCountEl = document.getElementById('video-count');
const playlistCountEl = document.getElementById('playlist-count');

// Initialize the player
document.addEventListener('DOMContentLoaded', function() {
    console.log('Nyoni-Movie Player Initializing...');
    
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Initialize player
    initializePlayer();
    
    // Load data from API
    loadData();
    
    // Initialize event listeners
    initializeEventListeners();
    
    // Initialize UI
    initializeUI();
    
    // Load saved settings
    loadSettings();
    
    // Apply initial theme
    applyTheme();
    
    console.log('Nyoni-Movie Player Initialized Successfully!');
});

// Initialize player settings
function initializePlayer() {
    // Set initial volume
    videoPlayer.volume = CONFIG.defaultVolume / 100;
    volumeSlider.value = CONFIG.defaultVolume;
    
    // Set initial playback speed
    videoPlayer.playbackRate = 1.0;
    
    // Set initial title
    currentTitle.textContent = 'Welcome to Nyoni-Movie Player';
    
    // Update video count
    updateVideoCount();
}

// Load data from API
async function loadData() {
    try {
        console.log('Loading video data from API...');
        
        // Load movies
        const moviesResponse = await fetch('api/movies.json');
        if (!moviesResponse.ok) throw new Error('Failed to load movies');
        movies = await moviesResponse.json();
        console.log(`Loaded ${movies.length} movies`);
        
        // Load series
        const seriesResponse = await fetch('api/series.json');
        if (!seriesResponse.ok) throw new Error('Failed to load series');
        series = await seriesResponse.json();
        console.log(`Loaded ${series.length} series`);
        
        // Populate content lists
        populateMoviesList();
        populateSeriesList();
        
        // Update video count
        updateVideoCount();
        
        // Show success notification
        showNotification(`Loaded ${movies.length} movies and ${series.length} series`);
        
    } catch (error) {
        console.error('Error loading data:', error);
        
        // Show error notification
        showNotification('Failed to load video data. Using sample data.', 'error');
        
        // Use sample data if API fails
        loadSampleData();
    }
}

// Load sample data if API fails
function loadSampleData() {
    console.log('Loading sample data...');
    
    movies = [
        {
            id: 1,
            title: "The Adventure Begins",
            description: "An epic journey through unknown lands",
            duration: "1:45:30",
            thumbnail: "assets/thumbnails/sample1.jpg",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            year: 2023,
            genre: "Adventure",
            rating: 4.5
        },
        {
            id: 2,
            title: "Midnight in Paris",
            description: "A romantic story set in the city of lights",
            duration: "2:15:45",
            thumbnail: "assets/thumbnails/sample2.jpg",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
            year: 2022,
            genre: "Romance",
            rating: 4.2
        },
        {
            id: 3,
            title: "Space Odyssey",
            description: "Journey through the cosmos",
            duration: "1:30:20",
            thumbnail: "assets/thumbnails/sample3.jpg",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
            year: 2024,
            genre: "Sci-Fi",
            rating: 4.8
        },
        {
            id: 4,
            title: "Ocean Depths",
            description: "Explore the mysteries of the deep sea",
            duration: "1:55:10",
            thumbnail: "assets/thumbnails/sample4.jpg",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
            year: 2023,
            genre: "Documentary",
            rating: 4.3
        },
        {
            id: 5,
            title: "Mountain Climb",
            description: "Conquer the highest peaks",
            duration: "1:40:35",
            thumbnail: "assets/thumbnails/sample5.jpg",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
            year: 2022,
            genre: "Adventure",
            rating: 4.6
        }
    ];
    
    series = [
        {
            id: 101,
            title: "Mystery Valley - Season 1",
            description: "Unravel the secrets of the hidden valley",
            duration: "45:20",
            thumbnail: "assets/thumbnails/series1.jpg",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
            season: 1,
            episode: 1,
            episodes: 10
        },
        {
            id: 102,
            title: "Cyber City - Pilot",
            description: "Welcome to the future city",
            duration: "50:15",
            thumbnail: "assets/thumbnails/series2.jpg",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
            season: 1,
            episode: 1,
            episodes: 12
        },
        {
            id: 103,
            title: "Ancient Warriors",
            description: "Legends of forgotten heroes",
            duration: "48:30",
            thumbnail: "assets/thumbnails/series3.jpg",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
            season: 1,
            episode: 1,
            episodes: 8
        }
    ];
    
    // Populate content lists
    populateMoviesList();
    populateSeriesList();
    
    // Update video count
    updateVideoCount();
    
    console.log('Sample data loaded successfully');
}

// Populate movies list
function populateMoviesList() {
    const moviesList = document.getElementById('movies-list');
    moviesList.innerHTML = '';
    
    if (movies.length === 0) {
        moviesList.innerHTML = `
            <div class="empty-playlist" style="grid-column: 1 / -1">
                <i class="fas fa-video-slash"></i>
                <p>No movies available</p>
                <p>Add movies to the api/movies.json file</p>
            </div>
        `;
        return;
    }
    
    movies.forEach((movie, index) => {
        const movieElement = createContentElement(movie, 'movie', index);
        moviesList.appendChild(movieElement);
    });
    
    // Add search functionality
    const movieSearch = document.getElementById('movie-search');
    movieSearch.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase().trim();
        
        // Clear previous timeout
        if (searchTimeout) clearTimeout(searchTimeout);
        
        // Set new timeout for debouncing
        searchTimeout = setTimeout(() => {
            const filteredMovies = movies.filter(movie => 
                movie.title.toLowerCase().includes(searchTerm) ||
                (movie.description && movie.description.toLowerCase().includes(searchTerm)) ||
                (movie.genre && movie.genre.toLowerCase().includes(searchTerm)) ||
                (movie.year && movie.year.toString().includes(searchTerm))
            );
            
            moviesList.innerHTML = '';
            
            if (filteredMovies.length === 0) {
                moviesList.innerHTML = `
                    <div class="empty-playlist" style="grid-column: 1 / -1">
                        <i class="fas fa-search"></i>
                        <p>No movies found for "${searchTerm}"</p>
                        <p>Try a different search term</p>
                    </div>
                `;
                return;
            }
            
            filteredMovies.forEach((movie, index) => {
                const movieElement = createContentElement(movie, 'movie', index);
                moviesList.appendChild(movieElement);
            });
        }, 300); // 300ms debounce delay
    });
}

// Populate series list
function populateSeriesList() {
    const seriesList = document.getElementById('series-list');
    seriesList.innerHTML = '';
    
    if (series.length === 0) {
        seriesList.innerHTML = `
            <div class="empty-playlist" style="grid-column: 1 / -1">
                <i class="fas fa-tv-slash"></i>
                <p>No series available</p>
                <p>Add series to the api/series.json file</p>
            </div>
        `;
        return;
    }
    
    series.forEach((serie, index) => {
        const seriesElement = createContentElement(serie, 'series', index);
        seriesList.appendChild(seriesElement);
    });
    
    // Add search functionality
    const seriesSearch = document.getElementById('series-search');
    seriesSearch.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase().trim();
        
        // Clear previous timeout
        if (searchTimeout) clearTimeout(searchTimeout);
        
        // Set new timeout for debouncing
        searchTimeout = setTimeout(() => {
            const filteredSeries = series.filter(serie => 
                serie.title.toLowerCase().includes(searchTerm) ||
                (serie.description && serie.description.toLowerCase().includes(searchTerm)) ||
                (serie.season && `season ${serie.season}`.includes(searchTerm)) ||
                (serie.episode && `episode ${serie.episode}`.includes(searchTerm))
            );
            
            seriesList.innerHTML = '';
            
            if (filteredSeries.length === 0) {
                seriesList.innerHTML = `
                    <div class="empty-playlist" style="grid-column: 1 / -1">
                        <i class="fas fa-search"></i>
                        <p>No series found for "${searchTerm}"</p>
                        <p>Try a different search term</p>
                    </div>
                `;
                return;
            }
            
            filteredSeries.forEach((serie, index) => {
                const seriesElement = createContentElement(serie, 'series', index);
                seriesList.appendChild(seriesElement);
            });
        }, 300); // 300ms debounce delay
    });
}

// Create content element for grid
function createContentElement(item, type, index) {
    const div = document.createElement('div');
    div.className = 'content-item';
    div.dataset.id = item.id;
    div.dataset.type = type;
    div.style.setProperty('--item-index', index % 10); // For staggered animation
    
    // Use default thumbnail if not provided
    const thumbnail = item.thumbnail || `assets/thumbnails/default-${type}.jpg`;
    
    // Create metadata string
    let meta = '';
    if (type === 'movie') {
        meta = `${item.year || 'N/A'} • ${item.genre || 'Unknown'} • ${item.rating || 'N/A'}/5`;
    } else {
        meta = `S${item.season || 1}E${item.episode || 1} • ${item.duration || 'N/A'}`;
    }
    
    div.innerHTML = `
        <img src="${thumbnail}" alt="${item.title}" class="content-thumbnail" 
             onerror="this.src='assets/thumbnails/default.jpg'">
        <div class="content-info">
            <div class="content-title" title="${item.title}">${item.title}</div>
            <div class="content-meta">${meta}</div>
            <div class="content-actions">
                <button class="action-btn play-btn" data-action="play" title="Play ${item.title}">
                    <i class="fas fa-play"></i> Play
                </button>
                <button class="action-btn" data-action="add-to-playlist" title="Add to playlist">
                    <i class="fas fa-plus"></i> Add
                </button>
            </div>
        </div>
    `;
    
    // Add event listeners to buttons
    const playBtn = div.querySelector('[data-action="play"]');
    const addBtn = div.querySelector('[data-action="add-to-playlist"]');
    
    playBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        playContent(item, type);
    });
    
    addBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        addToPlaylist(item, type);
    });
    
    // Make entire card clickable
    div.addEventListener('click', () => {
        playContent(item, type);
    });
    
    return div;
}

// Play content
function playContent(item, type) {
    console.log(`Playing ${type}: ${item.title}`);
    
    // Update video source
    videoPlayer.src = item.videoUrl;
    
    // Update UI
    currentTitle.textContent = item.title;
    currentVideoIndex = -1; // Not in playlist
    
    // Play the video
    videoPlayer.play()
        .then(() => {
            isPlaying = true;
            updatePlayPauseButton();
            showNotification(`Now playing: ${item.title}`);
        })
        .catch(error => {
            console.error('Error playing video:', error);
            showNotification('Error playing video. Please check the URL.', 'error');
        });
    
    // Update playlist active item
    updatePlaylistActiveItem();
}

// Add to playlist
function addToPlaylist(item, type) {
    // Check if already in playlist
    const exists = playlist.some(p => p.id === item.id && p.type === type);
    
    if (exists) {
        showNotification(`${item.title} is already in the playlist`, 'info');
        return;
    }
    
    // Add to playlist
    const playlistItem = {
        ...item,
        playlistId: Date.now(), // Unique ID for playlist item
        type: type,
        addedAt: new Date().toISOString()
    };
    
    playlist.push(playlistItem);
    
    // Update playlist UI
    updatePlaylistUI();
    
    // Show notification
    showNotification(`Added "${item.title}" to playlist`);
    
    // Update playlist count
    updatePlaylistCount();
}

// Remove from playlist
function removeFromPlaylist(playlistId) {
    const index = playlist.findIndex(item => item.playlistId === playlistId);
    
    if (index !== -1) {
        const removedItem = playlist[index];
        playlist.splice(index, 1);
        
        // Update UI
        updatePlaylistUI();
        
        // Update current video index if needed
        if (currentVideoIndex === index) {
            currentVideoIndex = -1;
        } else if (currentVideoIndex > index) {
            currentVideoIndex--;
        }
        
        // Show notification
        showNotification(`Removed "${removedItem.title}" from playlist`);
        
        // Update playlist count
        updatePlaylistCount();
    }
}

// Clear playlist
function clearPlaylist() {
    if (playlist.length === 0) {
        showNotification('Playlist is already empty', 'info');
        return;
    }
    
    if (confirm('Are you sure you want to clear the entire playlist?')) {
        playlist = [];
        currentVideoIndex = -1;
        
        // Update UI
        updatePlaylistUI();
        updatePlaylistActiveItem();
        
        // Show notification
        showNotification('Playlist cleared');
        
        // Update playlist count
        updatePlaylistCount();
    }
}

// Update playlist UI
function updatePlaylistUI() {
    const playlistItems = document.getElementById('playlist-items');
    
    if (playlist.length === 0) {
        playlistItems.innerHTML = `
            <div class="empty-playlist">
                <i class="fas fa-list"></i>
                <p>Your playlist is empty</p>
                <p>Add videos from Movies or Series tabs</p>
            </div>
        `;
        return;
    }
    
    playlistItems.innerHTML = '';
    
    playlist.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.className = 'playlist-item';
        itemElement.dataset.playlistId = item.playlistId;
        
        if (index === currentVideoIndex) {
            itemElement.classList.add('active');
        }
        
        const duration = item.duration || 'N/A';
        
        itemElement.innerHTML = `
            <div class="playlist-number">${index + 1}</div>
            <div class="playlist-info">
                <div class="playlist-title" title="${item.title}">${item.title}</div>
                <div class="playlist-duration">${duration} • ${item.type}</div>
            </div>
            <button class="playlist-remove" title="Remove from playlist">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        // Add event listeners
        itemElement.addEventListener('click', (e) => {
            if (!e.target.closest('.playlist-remove')) {
                playFromPlaylist(index);
            }
        });
        
        const removeBtn = itemElement.querySelector('.playlist-remove');
        removeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            removeFromPlaylist(item.playlistId);
        });
        
        playlistItems.appendChild(itemElement);
    });
}

// Play from playlist
function playFromPlaylist(index) {
    if (index < 0 || index >= playlist.length) return;
    
    const item = playlist[index];
    currentVideoIndex = index;
    
    // Update video source
    videoPlayer.src = item.videoUrl;
    
    // Update UI
    currentTitle.textContent = item.title;
    
    // Play the video
    videoPlayer.play()
        .then(() => {
            isPlaying = true;
            updatePlayPauseButton();
            showNotification(`Now playing: ${item.title} (${index + 1}/${playlist.length})`);
        })
        .catch(error => {
            console.error('Error playing video:', error);
            showNotification('Error playing video. Please check the URL.', 'error');
        });
    
    // Update playlist active item
    updatePlaylistActiveItem();
}

// Update playlist active item
function updatePlaylistActiveItem() {
    const playlistItems = document.querySelectorAll('.playlist-item');
    
    playlistItems.forEach((item, index) => {
        if (index === currentVideoIndex) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

// Play next video in playlist
function playNextVideo() {
    if (playlist.length === 0) {
        showNotification('Playlist is empty', 'info');
        return;
    }
    
    let nextIndex = currentVideoIndex + 1;
    
    // Handle looping
    if (nextIndex >= playlist.length) {
        if (CONFIG.loopPlaylist) {
            nextIndex = 0;
            showNotification('Looping playlist...', 'info');
        } else {
            showNotification('End of playlist reached', 'info');
            return;
        }
    }
    
    playFromPlaylist(nextIndex);
}

// Play previous video in playlist
function playPreviousVideo() {
    if (playlist.length === 0) {
        showNotification('Playlist is empty', 'info');
        return;
    }
    
    let prevIndex = currentVideoIndex - 1;
    
    // Handle looping from start
    if (prevIndex < 0) {
        if (CONFIG.loopPlaylist) {
            prevIndex = playlist.length - 1;
            showNotification('Looping playlist...', 'info');
        } else {
            showNotification('Beginning of playlist reached', 'info');
            return;
        }
    }
    
    playFromPlaylist(prevIndex);
}

// Initialize event listeners
function initializeEventListeners() {
    console.log('Initializing event listeners...');
    
    // Video player events
    videoPlayer.addEventListener('play', () => {
        isPlaying = true;
        updatePlayPauseButton();
    });
    
    videoPlayer.addEventListener('pause', () => {
        isPlaying = false;
        updatePlayPauseButton();
    });
    
    videoPlayer.addEventListener('timeupdate', updateProgress);
    videoPlayer.addEventListener('loadedmetadata', updateDuration);
    videoPlayer.addEventListener('ended', handleVideoEnd);
    videoPlayer.addEventListener('volumechange', updateVolumeUI);
    videoPlayer.addEventListener('error', handleVideoError);
    
    // Control buttons
    playPauseBtn.addEventListener('click', togglePlayPause);
    muteBtn.addEventListener('click', toggleMute);
    prevBtn.addEventListener('click', playPreviousVideo);
    nextBtn.addEventListener('click', playNextVideo);
    rewindBtn.addEventListener('click', rewindVideo);
    forwardBtn.addEventListener('click', forwardVideo);
    fullscreenBtn.addEventListener('click', toggleFullscreen);
    
    // Sliders and selects
    progressBar.addEventListener('input', seekVideo);
    volumeSlider.addEventListener('input', changeVolume);
    speedSelect.addEventListener('change', changePlaybackSpeed);
    
    // Theme toggle
    themeToggle.addEventListener('click', toggleTheme);
    
    // Tab switching
    document.querySelectorAll('.tab-btn').forEach(tab => {
        tab.addEventListener('click', switchTab);
    });
    
    // Clear playlist button
    clearPlaylistBtn.addEventListener('click', clearPlaylist);
    
    // Modal controls
    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', closeModal);
    });
    
    // Settings
    document.getElementById('auto-play').addEventListener('change', saveSettings);
    document.getElementById('loop-playlist').addEventListener('change', saveSettings);
    document.getElementById('default-tab').addEventListener('change', saveSettings);
    
    // Keyboard shortcuts
    document.addEventListener('keydown', handleKeyboardShortcuts);
    
    // Help modal trigger
    document.addEventListener('keydown', (e) => {
        if (e.key === '?' || e.key === '/') {
            e.preventDefault();
            toggleModal('help-modal');
        }
    });
    
    // Settings modal trigger
    document.getElementById('settings').addEventListener('click', () => {
        toggleModal('settings-modal');
    });
    
    // Close modals when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            closeModal();
        }
    });
    
    // Fullscreen change event
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);
    
    console.log('Event listeners initialized');
}

// Initialize UI
function initializeUI() {
    // Set active tab
    switchTab({ target: document.querySelector(`[data-tab="${currentTab}"]`) });
    
    // Update buttons
    updatePlayPauseButton();
    updateMuteButton();
    updateFullscreenButton();
    
    // Update counts
    updateVideoCount();
    updatePlaylistCount();
}

// Toggle play/pause
function togglePlayPause() {
    if (videoPlayer.paused) {
        videoPlayer.play()
            .then(() => {
                isPlaying = true;
                updatePlayPauseButton();
            })
            .catch(error => {
                console.error('Error playing video:', error);
                showNotification('Error playing video', 'error');
            });
    } else {
        videoPlayer.pause();
        isPlaying = false;
        updatePlayPauseButton();
    }
}

// Update play/pause button
function updatePlayPauseButton() {
    if (isPlaying) {
        playPauseIcon.className = 'fas fa-pause';
        playPauseBtn.title = 'Pause (Space/K)';
    } else {
        playPauseIcon.className = 'fas fa-play';
        playPauseBtn.title = 'Play (Space/K)';
    }
}

// Toggle mute
function toggleMute() {
    isMuted = !isMuted;
    videoPlayer.muted = isMuted;
    updateMuteButton();
}

// Update mute button
function updateMuteButton() {
    if (isMuted || videoPlayer.volume === 0) {
        muteIcon.className = 'fas fa-volume-mute';
        muteBtn.title = 'Unmute (M)';
        volumeSlider.value = 0;
    } else {
        if (videoPlayer.volume >= 0.5) {
            muteIcon.className = 'fas fa-volume-up';
        } else if (videoPlayer.volume > 0) {
            muteIcon.className = 'fas fa-volume-down';
        } else {
            muteIcon.className = 'fas fa-volume-off';
        }
        muteBtn.title = 'Mute (M)';
        volumeSlider.value = videoPlayer.volume * 100;
    }
}

// Change volume
function changeVolume() {
    const volume = parseInt(volumeSlider.value) / 100;
    videoPlayer.volume = volume;
    videoPlayer.muted = volume === 0;
    isMuted = volume === 0;
    updateMuteButton();
}

// Update volume UI
function updateVolumeUI() {
    isMuted = videoPlayer.muted;
    updateMuteButton();
}

// Rewind video
function rewindVideo() {
    videoPlayer.currentTime = Math.max(0, videoPlayer.currentTime - CONFIG.rewindTime);
    showNotification(`Rewinded ${CONFIG.rewindTime} seconds`);
}

// Forward video
function forwardVideo() {
    videoPlayer.currentTime = Math.min(videoPlayer.duration, videoPlayer.currentTime + CONFIG.forwardTime);
    showNotification(`Forwarded ${CONFIG.forwardTime} seconds`);
}

// Seek video
function seekVideo() {
    const time = (progressBar.value / 100) * videoPlayer.duration;
    videoPlayer.currentTime = time;
}

// Update progress bar
function updateProgress() {
    if (!isNaN(videoPlayer.duration)) {
        const progress = (videoPlayer.currentTime / videoPlayer.duration) * 100;
        progressBar.value = progress;
        
        // Update time display
        currentTimeEl.textContent = formatTime(videoPlayer.currentTime);
    }
}

// Update duration
function updateDuration() {
    if (!isNaN(videoPlayer.duration)) {
        durationEl.textContent = formatTime(videoPlayer.duration);
        progressBar.max = 100;
    }
}

// Format time (seconds to MM:SS or HH:MM:SS)
function formatTime(seconds) {
    if (isNaN(seconds)) return '00:00';
    
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    
    if (hours > 0) {
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    } else {
        return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
}

// Change playback speed
function changePlaybackSpeed() {
    const speed = parseFloat(speedSelect.value);
    videoPlayer.playbackRate = speed;
    showNotification(`Playback speed: ${speed}x`);
}

// Toggle fullscreen
function toggleFullscreen() {
    if (!isFullscreen) {
        enterFullscreen();
    } else {
        exitFullscreen();
    }
}

// Enter fullscreen
function enterFullscreen() {
    const container = document.querySelector('.video-container');
    
    if (container.requestFullscreen) {
        container.requestFullscreen();
    } else if (container.webkitRequestFullscreen) {
        container.webkitRequestFullscreen();
    } else if (container.mozRequestFullScreen) {
        container.mozRequestFullScreen();
    } else if (container.msRequestFullscreen) {
        container.msRequestFullscreen();
    }
}

// Exit fullscreen
function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
}

// Handle fullscreen change
function handleFullscreenChange() {
    isFullscreen = !!(document.fullscreenElement || 
                      document.webkitFullscreenElement || 
                      document.mozFullScreenElement || 
                      document.msFullscreenElement);
    updateFullscreenButton();
}

// Update fullscreen button
function updateFullscreenButton() {
    if (isFullscreen) {
        fullscreenIcon.className = 'fas fa-compress';
        fullscreenBtn.title = 'Exit fullscreen (F/Esc)';
    } else {
        fullscreenIcon.className = 'fas fa-expand';
        fullscreenBtn.title = 'Enter fullscreen (F)';
    }
}

// Toggle theme
function toggleTheme() {
    const isLightMode = document.body.classList.toggle('light-mode');
    
    // Update icon
    themeIcon.className = isLightMode ? 'fas fa-sun' : 'fas fa-moon';
    themeToggle.title = isLightMode ? 'Switch to dark mode' : 'Switch to light mode';
    
    // Save theme preference
    playerSettings.theme = isLightMode ? 'light' : 'dark';
    saveSettings();
    
    showNotification(`${isLightMode ? 'Light' : 'Dark'} mode activated`);
}

// Apply theme from settings
function applyTheme() {
    const savedTheme = playerSettings.theme || 'dark';
    const isLightMode = savedTheme === 'light';
    
    if (isLightMode) {
        document.body.classList.add('light-mode');
        themeIcon.className = 'fas fa-sun';
        themeToggle.title = 'Switch to dark mode';
    } else {
        document.body.classList.remove('light-mode');
        themeIcon.className = 'fas fa-moon';
        themeToggle.title = 'Switch to light mode';
    }
}

// Switch tab
function switchTab(e) {
    const tabName = e.target.dataset.tab;
    
    // Update tab buttons
    document.querySelectorAll('.tab-btn').forEach(tab => {
        tab.classList.remove('active');
    });
    e.target.classList.add('active');
    
    // Update content tabs
    document.querySelectorAll('.content-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.getElementById(`${tabName}-tab`).classList.add('active');
    
    // Save current tab
    currentTab = tabName;
    playerSettings.currentTab = tabName;
    saveSettings();
}

// Toggle modal
function toggleModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.toggle('active');
    
    // Pause video when modal is open (optional)
    if (modal.classList.contains('active') && isPlaying) {
        videoPlayer.pause();
    }
}

// Close modal
function closeModal() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.classList.remove('active');
    });
}

// Handle video end
function handleVideoEnd() {
    isPlaying = false;
    updatePlayPauseButton();
    
    // Auto-play next video if enabled
    if (CONFIG.autoPlayNext && playlist.length > 0 && currentVideoIndex !== -1) {
        setTimeout(() => {
            playNextVideo();
        }, 1000); // 1 second delay
    }
}

// Handle video error
function handleVideoError() {
    console.error('Video error:', videoPlayer.error);
    
    let errorMessage = 'Error loading video. ';
    
    switch(videoPlayer.error.code) {
        case MediaError.MEDIA_ERR_ABORTED:
            errorMessage += 'Playback was aborted.';
            break;
        case MediaError.MEDIA_ERR_NETWORK:
            errorMessage += 'A network error occurred.';
            break;
        case MediaError.MEDIA_ERR_DECODE:
            errorMessage += 'Error decoding the video.';
            break;
        case MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED:
            errorMessage += 'Video format not supported.';
            break;
        default:
            errorMessage += 'Unknown error.';
    }
    
    showNotification(errorMessage, 'error');
}

// Handle keyboard shortcuts
function handleKeyboardShortcuts(e) {
    // Don't trigger shortcuts when user is typing in inputs
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.isContentEditable) {
        return;
    }
    
    switch(e.key.toLowerCase()) {
        case ' ':
        case 'k':
            e.preventDefault();
            togglePlayPause();
            break;
            
        case 'm':
            e.preventDefault();
            toggleMute();
            break;
            
        case 'arrowleft':
            e.preventDefault();
            rewindVideo();
            break;
            
        case 'arrowright':
            e.preventDefault();
            forwardVideo();
            break;
            
        case 'f':
            e.preventDefault();
            toggleFullscreen();
            break;
            
        case 'escape':
            if (isFullscreen) {
                e.preventDefault();
                exitFullscreen();
            }
            break;
            
        case 'p':
            e.preventDefault();
            playPreviousVideo();
            break;
            
        case 'n':
            e.preventDefault();
            playNextVideo();
            break;
            
        case '?':
        case '/':
            e.preventDefault();
            toggleModal('help-modal');
            break;
            
        case 's':
            if (e.ctrlKey || e.metaKey) {
                // Allow browser save
                return;
            }
            e.preventDefault();
            toggleModal('settings-modal');
            break;
            
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
            if (!e.ctrlKey && !e.metaKey && !e.altKey) {
                e.preventDefault();
                const num = parseInt(e.key);
                if (num >= 1 && num <= playlist.length) {
                    playFromPlaylist(num - 1);
                } else if (num === 0) {
                    // Restart current video
                    videoPlayer.currentTime = 0;
                    showNotification('Video restarted');
                }
            }
            break;
            
        case 'l':
            e.preventDefault();
            CONFIG.loopPlaylist = !CONFIG.loopPlaylist;
            showNotification(`Playlist looping ${CONFIG.loopPlaylist ? 'enabled' : 'disabled'}`);
            break;
    }
}

// Show notification
function showNotification(message, type = 'success') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => {
        notification.remove();
    });
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    // Set icon based on type
    let icon = 'fas fa-check-circle';
    if (type === 'error') icon = 'fas fa-exclamation-circle';
    if (type === 'info') icon = 'fas fa-info-circle';
    
    notification.innerHTML = `
        <i class="${icon}"></i>
        <span>${message}</span>
    `;
    
    // Add to document
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 3000);
}

// Update video count
function updateVideoCount() {
    const totalVideos = movies.length + series.length;
    videoCountEl.textContent = `${totalVideos} videos available`;
}

// Update playlist count
function updatePlaylistCount() {
    playlistCountEl.textContent = `Playlist: ${playlist.length} items`;
}

// Load settings from localStorage
function loadSettings() {
    try {
        const savedSettings = localStorage.getItem(CONFIG.storageKey);
        if (savedSettings) {
            playerSettings = JSON.parse(savedSettings);
            
            // Apply settings
            if (playerSettings.volume !== undefined) {
                videoPlayer.volume = playerSettings.volume / 100;
                volumeSlider.value = playerSettings.volume;
            }
            
            if (playerSettings.playbackSpeed !== undefined) {
                videoPlayer.playbackRate = playerSettings.playbackSpeed;
                speedSelect.value = playerSettings.playbackSpeed;
            }
            
            if (playerSettings.autoPlayNext !== undefined) {
                CONFIG.autoPlayNext = playerSettings.autoPlayNext;
                document.getElementById('auto-play').checked = playerSettings.autoPlayNext;
            }
            
            if (playerSettings.loopPlaylist !== undefined) {
                CONFIG.loopPlaylist = playerSettings.loopPlaylist;
                document.getElementById('loop-playlist').checked = playerSettings.loopPlaylist;
            }
            
            if (playerSettings.currentTab) {
                currentTab = playerSettings.currentTab;
                document.getElementById('default-tab').value = playerSettings.currentTab;
            }
            
            if (playerSettings.playlist) {
                playlist = playerSettings.playlist;
                updatePlaylistUI();
                updatePlaylistCount();
            }
            
            console.log('Settings loaded successfully');
        }
    } catch (error) {
        console.error('Error loading settings:', error);
        // Use default settings
        playerSettings = {};
    }
}

// Save settings to localStorage
function saveSettings() {
    try {
        // Update settings object
        playerSettings.volume = videoPlayer.volume * 100;
        playerSettings.playbackSpeed = videoPlayer.playbackRate;
        playerSettings.autoPlayNext = document.getElementById('auto-play').checked;
        playerSettings.loopPlaylist = document.getElementById('loop-playlist').checked;
        playerSettings.currentTab = document.getElementById('default-tab').value;
        playerSettings.playlist = playlist;
        
        // Save to localStorage
        localStorage.setItem(CONFIG.storageKey, JSON.stringify(playerSettings));
        
        // Update config
        CONFIG.autoPlayNext = playerSettings.autoPlayNext;
        CONFIG.loopPlaylist = playerSettings.loopPlaylist;
        
        console.log('Settings saved successfully');
    } catch (error) {
        console.error('Error saving settings:', error);
    }
}

// Export playlist
function exportPlaylist() {
    if (playlist.length === 0) {
        showNotification('Playlist is empty', 'info');
        return;
    }
    
    const playlistData = {
        name: 'Nyoni-Movie Player Playlist',
        exportedAt: new Date().toISOString(),
        items: playlist.map(item => ({
            title: item.title,
            videoUrl: item.videoUrl,
            type: item.type,
            duration: item.duration
        }))
    };
    
    const dataStr = JSON.stringify(playlistData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `nyoni-playlist-${new Date().toISOString().slice(0,10)}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    showNotification('Playlist exported successfully');
}

// Import playlist
function importPlaylist(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    
    reader.onload = function(e) {
        try {
            const importedData = JSON.parse(e.target.result);
            
            if (!importedData.items || !Array.isArray(importedData.items)) {
                throw new Error('Invalid playlist file format');
            }
            
            // Clear current playlist
            playlist = [];
            
            // Add imported items
            importedData.items.forEach((item, index) => {
                const playlistItem = {
                    ...item,
                    playlistId: Date.now() + index,
                    addedAt: new Date().toISOString()
                };
                playlist.push(playlistItem);
            });
            
            // Update UI
            updatePlaylistUI();
            updatePlaylistCount();
            
            showNotification(`Imported ${playlist.length} items from playlist`);
            
            // Save settings
            saveSettings();
            
        } catch (error) {
            console.error('Error importing playlist:', error);
            showNotification('Error importing playlist. Invalid file format.', 'error');
        }
    };
    
    reader.readAsText(file);
    
    // Reset file input
    event.target.value = '';
}

// Initialize export/import functionality
function initializeExportImport() {
    // Create hidden file input for import
    const importInput = document.createElement('input');
    importInput.type = 'file';
    importInput.accept = '.json';
    importInput.style.display = 'none';
    importInput.addEventListener('change', importPlaylist);
    document.body.appendChild(importInput);
    
    // Add export/import buttons to playlist header
    const playlistHeader = document.querySelector('#playlist-tab .content-header');
    
    const exportBtn = document.createElement('button');
    exportBtn.className = 'secondary-btn';
    exportBtn.innerHTML = '<i class="fas fa-download"></i> Export';
    exportBtn.addEventListener('click', exportPlaylist);
    
    const importBtn = document.createElement('button');
    importBtn.className = 'secondary-btn';
    importBtn.innerHTML = '<i class="fas fa-upload"></i> Import';
    importBtn.addEventListener('click', () => importInput.click());
    
    playlistHeader.appendChild(exportBtn);
    playlistHeader.appendChild(importBtn);
}

// Initialize drag and drop for playlist
function initializeDragAndDrop() {
    const playlistItems = document.getElementById('playlist-items');
    
    let draggedItem = null;
    
    playlistItems.addEventListener('dragstart', (e) => {
        if (e.target.classList.contains('playlist-item')) {
            draggedItem = e.target;
            e.target.style.opacity = '0.5';
        }
    });
    
    playlistItems.addEventListener('dragend', (e) => {
        if (draggedItem) {
            draggedItem.style.opacity = '1';
            draggedItem = null;
        }
    });
    
    playlistItems.addEventListener('dragover', (e) => {
        e.preventDefault();
    });
    
    playlistItems.addEventListener('drop', (e) => {
        e.preventDefault();
        
        if (draggedItem && e.target.classList.contains('playlist-item')) {
            const draggedId = parseInt(draggedItem.dataset.playlistId);
            const targetId = parseInt(e.target.dataset.playlistId);
            
            if (draggedId !== targetId) {
                // Reorder playlist array
                const draggedIndex = playlist.findIndex(item => item.playlistId === draggedId);
                const targetIndex = playlist.findIndex(item => item.playlistId === targetId);
                
                const [draggedItemData] = playlist.splice(draggedIndex, 1);
                playlist.splice(targetIndex, 0, draggedItemData);
                
                // Update UI
                updatePlaylistUI();
                
                // Update current video index if needed
                if (currentVideoIndex === draggedIndex) {
                    currentVideoIndex = targetIndex;
                } else if (currentVideoIndex === targetIndex) {
                    currentVideoIndex = draggedIndex;
                }
                
                // Save settings
                saveSettings();
                
                showNotification('Playlist reordered');
            }
        }
    });
}

// Add keyboard shortcuts help
function showKeyboardShortcuts() {
    const shortcuts = [
        { key: 'Space / K', desc: 'Play/Pause' },
        { key: 'M', desc: 'Mute/Unmute' },
        { key: '←', desc: 'Rewind 10s' },
        { key: '→', desc: 'Forward 10s' },
        { key: 'F', desc: 'Toggle Fullscreen' },
        { key: 'Esc', desc: 'Exit Fullscreen' },
        { key: 'P', desc: 'Previous Video' },
        { key: 'N', desc: 'Next Video' },
        { key: '1-9', desc: 'Jump to playlist item' },
        { key: '0', desc: 'Restart current video' },
        { key: 'L', desc: 'Toggle playlist loop' },
        { key: '?', desc: 'Show this help' },
        { key: 'S', desc: 'Open settings' }
    ];
    
    let helpText = 'Keyboard Shortcuts:\n\n';
    shortcuts.forEach(shortcut => {
        helpText += `${shortcut.key.padEnd(15)} ${shortcut.desc}\n`;
    });
    
    alert(helpText);
}

// Initialize advanced features
function initializeAdvancedFeatures() {
    // Initialize export/import
    initializeExportImport();
    
    // Initialize drag and drop
    initializeDragAndDrop();
    
    // Add keyboard shortcuts to help modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'h' && (e.ctrlKey || e.metaKey)) {
            e.preventDefault();
            showKeyboardShortcuts();
        }
    });
}

// Initialize everything when DOM is loaded
window.addEventListener('load', () => {
    // Initialize advanced features
    initializeAdvancedFeatures();
    
    // Show welcome message
    setTimeout(() => {
        showNotification('Welcome to Nyoni-Movie Player! Press ? for keyboard shortcuts.');
    }, 1000);
});

// Make functions available globally for debugging
window.player = {
    playContent,
    addToPlaylist,
    removeFromPlaylist,
    clearPlaylist,
    togglePlayPause,
    toggleMute,
    toggleFullscreen,
    toggleTheme,
    showNotification,
    exportPlaylist,
    showKeyboardShortcuts,
    getPlaylist: () => playlist,
    getCurrentVideo: () => currentVideoIndex >= 0 ? playlist[currentVideoIndex] : null,
    getStats: () => ({
        movies: movies.length,
        series: series.length,
        playlist: playlist.length,
        currentTime: videoPlayer.currentTime,
        duration: videoPlayer.duration,
        volume: videoPlayer.volume * 100,
        playbackSpeed: videoPlayer.playbackRate
    })
};

console.log('Nyoni-Movie Player Script Loaded');
