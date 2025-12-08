 /**
 * Nyoni Movie Pro - Main JavaScript
 * @author Raheem
 * @version 1.0.0
 */

// App Configuration
const AppConfig = {
    API_BASE_URL: 'https://api.nyonimovie.com',
    DEFAULT_VIDEO_URL: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    MOVIES_PER_PAGE: 20,
    AUTO_PLAY_DELAY: 3000,
    THEME_STORAGE_KEY: 'nyoni-theme',
    WATCHLIST_STORAGE_KEY: 'nyoni-watchlist',
    SEARCH_HISTORY_KEY: 'nyoni-search-history'
};

// Movie Data (Sample - In production, fetch from API)
const MovieData = {
    featured: [
        {
            id: 1,
            title: "Spider-Man: Across the Spider-Verse",
            year: 2023,
            genre: "Animation, Action, Adventure",
            rating: 8.7,
            duration: "2h 20m",
            quality: "4K",
            description: "Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence.",
            poster: "https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg",
            backdrop: "https://image.tmdb.org/t/p/original/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            director: "Joaquim Dos Santos",
            stars: ["Shameik Moore", "Hailee Steinfeld", "Brian Tyree Henry"],
            tags: ["new", "trending", "hd"]
        },
        {
            id: 2,
            title: "John Wick: Chapter 4",
            year: 2023,
            genre: "Action, Thriller",
            rating: 8.3,
            duration: "2h 49m",
            quality: "4K",
            description: "John Wick uncovers a path to defeating The High Table. But before he can earn his freedom, Wick must face off against a new enemy.",
            poster: "https://image.tmdb.org/t/p/w500/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg",
            backdrop: "https://image.tmdb.org/t/p/original/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
            director: "Chad Stahelski",
            stars: ["Keanu Reeves", "Donnie Yen", "Bill Skarsgård"],
            tags: ["action", "hd"]
        }
    ],
    
    movies: [
        {
            id: 101,
            title: "The Batman",
            year: 2022,
            genre: "Action, Crime, Drama",
            rating: 7.8,
            duration: "2h 56m",
            quality: "HD",
            description: "When a sadistic serial killer begins murdering key political figures in Gotham, Batman is forced to investigate the city's hidden corruption.",
            poster: "https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4"
        },
        {
            id: 102,
            title: "Avatar: The Way of Water",
            year: 2022,
            genre: "Action, Adventure, Fantasy",
            rating: 7.6,
            duration: "3h 12m",
            quality: "4K",
            description: "Jake Sully lives with his newfound family formed on the extrasolar moon Pandora. Once a familiar threat returns to finish what was previously started.",
            poster: "https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4"
        },
        {
            id: 103,
            title: "Top Gun: Maverick",
            year: 2022,
            genre: "Action, Drama",
            rating: 8.2,
            duration: "2h 10m",
            quality: "HD",
            description: "After thirty years, Maverick is still pushing the envelope as a top naval aviator, but must confront ghosts of his past.",
            poster: "https://image.tmdb.org/t/p/w500/62HCnUTziyWcpDaBO2i1DX17ljH.jpg",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"
        },
        {
            id: 104,
            title: "Black Panther: Wakanda Forever",
            year: 2022,
            genre: "Action, Adventure, Drama",
            rating: 7.2,
            duration: "2h 41m",
            quality: "4K",
            description: "The nation of Wakanda is pitted against intervening world powers as they mourn the loss of their king T'Challa.",
            poster: "https://image.tmdb.org/t/p/w500/sv1xJUazXeYqALzczSZ3O6nkH75.jpg",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
        },
        {
            id: 105,
            title: "Everything Everywhere All at Once",
            year: 2022,
            genre: "Action, Adventure, Comedy",
            rating: 7.8,
            duration: "2h 19m",
            quality: "HD",
            description: "An aging Chinese immigrant is swept up in an insane adventure, where she alone can save the world.",
            poster: "https://image.tmdb.org/t/p/w500/w3LxiVYdWWRvEVdn5RYq6jIqkb1.jpg",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4"
        }
    ],
    
    series: [
        {
            id: 201,
            title: "Stranger Things",
            year: 2016,
            genre: "Drama, Fantasy, Horror",
            rating: 8.7,
            seasons: 4,
            episodes: 34,
            description: "When a young boy vanishes, a small town uncovers a mystery involving secret experiments.",
            poster: "https://image.tmdb.org/t/p/w500/49WJfeN0moxb9IPfGn8AIqMGskD.jpg",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4"
        },
        {
            id: 202,
            title: "The Last of Us",
            year: 2023,
            genre: "Action, Adventure, Drama",
            rating: 8.8,
            seasons: 1,
            episodes: 9,
            description: "After a global pandemic destroys civilization, a hardened survivor takes charge of a 14-year-old girl.",
            poster: "https://image.tmdb.org/t/p/w500/uKvVjHNqB5VmOrdxqAt2F7J78ED.jpg",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4"
        }
    ]
};

// Main App Class
class NyoniMovie {
    constructor() {
        this.currentPage = 1;
        this.currentMovie = null;
        this.watchlist = this.getWatchlist();
        this.searchHistory = this.getSearchHistory();
        this.isLoggedIn = false;
        this.currentSlide = 0;
        this.slideInterval = null;
        
        this.init();
    }
    
    // Initialize the app
    init() {
        this.setupEventListeners();
        this.setupTheme();
        this.setupLoadingScreen();
        this.renderFeaturedMovies();
        this.renderMovies();
        this.renderSeries();
        this.setupSlideshow();
        this.setupBackToTop();
    }
    
    // Setup all event listeners
    setupEventListeners() {
        // Navigation
        document.getElementById('mobileToggle')?.addEventListener('click', () => this.toggleMobileMenu());
        document.getElementById('closeMobile')?.addEventListener('click', () => this.toggleMobileMenu());
        document.getElementById('themeToggle')?.addEventListener('click', () => this.toggleTheme());
        document.getElementById('userMenuBtn')?.addEventListener('click', () => this.showLoginModal());
        document.getElementById('closeAuth')?.addEventListener('click', () => this.hideLoginModal());
        
        // Search
        document.getElementById('searchBtn')?.addEventListener('click', () => this.handleSearch());
        document.getElementById('searchInput')?.addEventListener('input', (e) => this.handleSearchInput(e));
        document.getElementById('searchInput')?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleSearch();
        });
        
        // Video Player
        document.getElementById('playFeatured')?.addEventListener('click', () => this.playMovie(MovieData.featured[0]));
        document.getElementById('closeModal')?.addEventListener('click', () => this.closeVideoModal());
        document.getElementById('downloadVideoBtn')?.addEventListener('click', () => this.downloadCurrentVideo());
        document.getElementById('shareVideoBtn')?.addEventListener('click', () => this.shareCurrentVideo());
        document.getElementById('addToWatchlistBtn')?.addEventListener('click', () => this.toggleWatchlist());
        document.getElementById('likeVideoBtn')?.addEventListener('click', () => this.likeVideo());
        
        // Slideshow
        document.getElementById('prevSlide')?.addEventListener('click', () => this.prevSlide());
        document.getElementById('nextSlide')?.addEventListener('click', () => this.nextSlide());
        document.getElementById('prevSeries')?.addEventListener('click', () => this.scrollSeries('left'));
        document.getElementById('nextSeries')?.addEventListener('click', () => this.scrollSeries('right'));
        
        // Filters
        document.getElementById('genreFilter')?.addEventListener('change', () => this.filterMovies());
        document.getElementById('yearFilter')?.addEventListener('change', () => this.filterMovies());
        document.getElementById('sortFilter')?.addEventListener('change', () => this.filterMovies());
        
        // Load More
        document.getElementById('loadMoreMovies')?.addEventListener('click', () => this.loadMoreMovies());
        
        // Tabs
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleTabClick(e));
        });
        
        // Time Filter
        document.querySelectorAll('.time-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleTimeFilter(e));
        });
        
        // Auth Form
        document.getElementById('loginForm')?.addEventListener('submit', (e) => this.handleLogin(e));
        document.getElementById('showPassword')?.addEventListener('click', () => this.togglePasswordVisibility());
        
        // Close modal when clicking outside
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('video-modal')) {
                this.closeVideoModal();
            }
            if (e.target.classList.contains('auth-modal')) {
                this.hideLoginModal();
            }
        });
        
        // Escape key to close modals
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeVideoModal();
                this.hideLoginModal();
            }
        });
    }
    
    // Setup theme from localStorage
    setupTheme() {
        const savedTheme = localStorage.getItem(AppConfig.THEME_STORAGE_KEY) || 'dark';
        document.documentElement.setAttribute('data-theme', savedTheme);
        this.updateThemeIcon(savedTheme);
    }
    
    // Toggle between dark/light theme
    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem(AppConfig.THEME_STORAGE_KEY, newTheme);
        this.updateThemeIcon(newTheme);
        
        this.showToast(`Switched to ${newTheme} theme`, 'success');
    }
    
    // Update theme toggle icon
    updateThemeIcon(theme) {
        const icon = document.querySelector('#themeToggle i');
        if (icon) {
            icon.className = theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
        }
    }
    
    // Setup loading screen
    setupLoadingScreen() {
        const loadingScreen = document.getElementById('loadingScreen');
        
        // Simulate loading time
        setTimeout(() => {
            loadingScreen.classList.add('fade-out');
            
            setTimeout(() => {
                loadingScreen.style.display = 'none';
                this.showToast('Welcome to Nyoni Movie Pro!', 'success');
            }, 500);
        }, 2000);
    }
    
    // Render featured movies in hero slider
    renderFeaturedMovies() {
        const slideIndicators = document.getElementById('slideIndicators');
        
        MovieData.featured.forEach((movie, index) => {
            // Create slide indicator
            const indicator = document.createElement('div');
            indicator.className = `slide-indicator ${index === 0 ? 'active' : ''}`;
            indicator.dataset.index = index;
            indicator.addEventListener('click', () => this.goToSlide(index));
            slideIndicators.appendChild(indicator);
        });
    }
    
    // Setup automatic slideshow
    setupSlideshow() {
        this.slideInterval = setInterval(() => {
            this.nextSlide();
        }, AppConfig.AUTO_PLAY_DELAY);
    }
    
    // Go to specific slide
    goToSlide(index) {
        const slides = document.querySelectorAll('.slide');
        const indicators = document.querySelectorAll('.slide-indicator');
        
        // Update current slide
        this.currentSlide = index;
        
        // Update slides
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
        
        // Update indicators
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === index);
        });
        
        // Reset interval
        clearInterval(this.slideInterval);
        this.slideInterval = setInterval(() => {
            this.nextSlide();
        }, AppConfig.AUTO_PLAY_DELAY);
    }
    
    // Go to next slide
    nextSlide() {
        const totalSlides = MovieData.featured.length;
        const nextSlide = (this.currentSlide + 1) % totalSlides;
        this.goToSlide(nextSlide);
    }
    
    // Go to previous slide
    prevSlide() {
        const totalSlides = MovieData.featured.length;
        const prevSlide = (this.currentSlide - 1 + totalSlides) % totalSlides;
        this.goToSlide(prevSlide);
    }
    
    // Render movies grid
    renderMovies(filteredMovies = null) {
        const moviesGrid = document.getElementById('moviesGrid');
        if (!moviesGrid) return;
        
        moviesGrid.innerHTML = '';
        
        const moviesToRender = filteredMovies || MovieData.movies;
        
        moviesToRender.forEach(movie => {
            const movieCard = this.createMovieCard(movie);
            moviesGrid.appendChild(movieCard);
        });
    }
    
    // Create movie card element
    createMovieCard(movie) {
        const card = document.createElement('div');
        card.className = 'movie-card';
        card.dataset.id = movie.id;
        
        // Generate star rating HTML
        const stars = this.generateStarRating(movie.rating);
        
        card.innerHTML = `
            <div class="movie-poster">
                <img src="${movie.poster}" alt="${movie.title}" loading="lazy">
                <div class="movie-overlay">
                    <button class="play-btn" data-id="${movie.id}">
                        <i class="fas fa-play"></i>
                    </button>
                </div>
            </div>
            <div class="movie-info">
                <div class="movie-title">
                    <h3>${movie.title}</h3>
                    <span class="movie-year">${movie.year}</span>
                </div>
                <p class="movie-genre">
                    <i class="fas fa-tag"></i> ${movie.genre}
                </p>
                <div class="movie-rating">
                    <div class="rating-stars">
                        ${stars}
                        <span class="rating-value">${movie.rating}/10</span>
                    </div>
                    <button class="watch-now-btn" data-id="${movie.id}">
                        Watch Now
                    </button>
                </div>
            </div>
        `;
        
        // Add event listeners
        const playBtn = card.querySelector('.play-btn');
        const watchBtn = card.querySelector('.watch-now-btn');
        
        playBtn.addEventListener('click', () => this.playMovie(movie));
        watchBtn.addEventListener('click', () => this.playMovie(movie));
        
        return card;
    }
    
    // Render series slider
    renderSeries() {
        const seriesSlider = document.getElementById('seriesSlider');
        if (!seriesSlider) return;
        
        seriesSlider.innerHTML = '';
        
        MovieData.series.forEach(series => {
            const seriesCard = this.createSeriesCard(series);
            seriesSlider.appendChild(seriesCard);
        });
    }
    
    // Create series card element
    createSeriesCard(series) {
        const card = document.createElement('div');
        card.className = 'series-card';
        
        card.innerHTML = `
            <div class="series-poster">
                <img src="${series.poster}" alt="${series.title}">
                <span class="season-badge">${series.seasons} Season${series.seasons > 1 ? 's' : ''}</span>
            </div>
            <div class="series-info">
                <h3 class="series-title">${series.title}</h3>
                <div class="series-meta">
                    <span><i class="fas fa-calendar"></i> ${series.year}</span>
                    <span><i class="fas fa-star"></i> ${series.rating}/10</span>
                    <span><i class="fas fa-list-ol"></i> ${series.episodes} Episodes</span>
                </div>
                <p class="series-description">${series.description}</p>
                <button class="watch-series-btn" data-id="${series.id}">
                    <i class="fas fa-play"></i> Watch Series
                </button>
            </div>
        `;
        
        const watchBtn = card.querySelector('.watch-series-btn');
        watchBtn.addEventListener('click', () => this.playMovie(series));
        
        return card;
    }
    
    // Scroll series slider
    scrollSeries(direction) {
        const slider = document.getElementById('seriesSlider');
        if (!slider) return;
        
        const scrollAmount = 320; // Width of card + gap
        const currentScroll = slider.scrollLeft;
        
        if (direction === 'left') {
            slider.scrollLeft = currentScroll - scrollAmount;
        } else {
            slider.scrollLeft = currentScroll + scrollAmount;
        }
    }
    
    // Filter movies based on selections
    filterMovies() {
        const genre = document.getElementById('genreFilter').value;
        const year = document.getElementById('yearFilter').value;
        const sort = document.getElementById('sortFilter').value;
        
        let filteredMovies = [...MovieData.movies];
        
        // Filter by genre
        if (genre !== 'all') {
            filteredMovies = filteredMovies.filter(movie => 
                movie.genre.toLowerCase().includes(genre.toLowerCase())
            );
        }
        
        // Filter by year
        if (year !== 'all') {
            filteredMovies = filteredMovies.filter(movie => 
                movie.year.toString() === year
            );
        }
        
        // Sort movies
        switch(sort) {
            case 'latest':
                filteredMovies.sort((a, b) => b.year - a.year);
                break;
            case 'popular':
                filteredMovies.sort((a, b) => b.rating - a.rating);
                break;
            case 'rating':
                filteredMovies.sort((a, b) => b.rating - a.rating);
                break;
        }
        
        this.renderMovies(filteredMovies);
    }
    
    // Load more movies
    loadMoreMovies() {
        // In a real app, this would fetch from API
        this.showToast('Loading more movies...', 'info');
        
        // Simulate API delay
        setTimeout(() => {
            // Add more sample movies
            const newMovies = [
                {
                    id: 106,
                    title: "Dune: Part Two",
                    year: 2024,
                    genre: "Action, Adventure, Drama",
                    rating: 8.5,
                    duration: "2h 46m",
                    quality: "4K",
                    description: "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.",
                    poster: "https://image.tmdb.org/t/p/w500/8b8R8l88Qje9dn9OE8PY05Nx1S8.jpg",
                    videoUrl: AppConfig.DEFAULT_VIDEO_URL
                },
                {
                    id: 107,
                    title: "Oppenheimer",
                    year: 2023,
                    genre: "Biography, Drama, History",
                    rating: 8.3,
                    duration: "3h",
                    quality: "4K",
                    description: "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.",
                    poster: "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n8ua.jpg",
                    videoUrl: AppConfig.DEFAULT_VIDEO_URL
                }
            ];
            
            MovieData.movies.push(...newMovies);
            this.renderMovies();
            this.showToast('More movies loaded successfully!', 'success');
        }, 1000);
    }
    
    // Handle tab click
    handleTabClick(event) {
        const tabBtns = document.querySelectorAll('.tab-btn');
        const clickedBtn = event.currentTarget;
        const category = clickedBtn.dataset.category;
        
        // Update active tab
        tabBtns.forEach(btn => btn.classList.remove('active'));
        clickedBtn.classList.add('active');
        
        // In a real app, this would filter series by category
        this.showToast(`Showing ${category} series`, 'info');
    }
    
    // Handle time filter
    handleTimeFilter(event) {
        const timeBtns = document.querySelectorAll('.time-btn');
        const clickedBtn = event.currentTarget;
        
        // Update active button
        timeBtns.forEach(btn => btn.classList.remove('active'));
        clickedBtn.classList.add('active');
        
        // In a real app, this would filter trending content
        this.showToast(`Updated trending filter`, 'info');
    }
    
    // Play movie/show
    playMovie(content) {
        this.currentMovie = content;
        
        // Update modal content
        document.getElementById('modalTitle').textContent = content.title;
        document.getElementById('videoRating').textContent = `${content.rating}/10`;
        document.getElementById('videoDuration').textContent = content.duration;
        document.getElementById('videoYear').textContent = content.year;
        document.getElementById('videoQuality').textContent = content.quality || 'HD';
        document.getElementById('videoDescription').textContent = content.description;
        
        // Update video player
        const videoPlayer = document.getElementById('mainVideoPlayer');
        videoPlayer.src = content.videoUrl;
        videoPlayer.poster = content.poster;
        
        // Update watchlist button
        this.updateWatchlistButton();
        
        // Show modal
        document.getElementById('videoModal').classList.add('active');
        
        // Play video
        setTimeout(() => {
            videoPlayer.play().catch(e => {
                console.log('Autoplay prevented:', e);
                this.showToast('Click play button to start video', 'info');
            });
        }, 500);
        
        // Add to watch history
        this.addToWatchHistory(content);
    }
    
    // Close video modal
    closeVideoModal() {
        const modal = document.getElementById('videoModal');
        const videoPlayer = document.getElementById('mainVideoPlayer');
        
        // Pause video
        videoPlayer.pause();
        videoPlayer.currentTime = 0;
        
        // Hide modal
        modal.classList.remove('active');
        
        this.showToast('Video player closed', 'info');
    }
    
    // Download current video
    downloadCurrentVideo() {
        if (!this.currentMovie) return;
        
        this.showToast('Preparing download...', 'info');
        
        // Simulate download
        setTimeout(() => {
            const link = document.createElement('a');
            link.href = this.currentMovie.videoUrl;
            link.download = `${this.currentMovie.title.replace(/\s+/g, '_')}.mp4`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            this.showToast(`${this.currentMovie.title} download started!`, 'success');
        }, 1000);
    }
    
    // Share current video
    shareCurrentVideo() {
        if (!this.currentMovie) return;
        
        const shareData = {
            title: this.currentMovie.title,
            text: `Watch "${this.currentMovie.title}" on Nyoni Movie Pro`,
            url: window.location.href
        };
        
        if (navigator.share) {
            navigator.share(shareData)
                .then(() => this.showToast('Shared successfully!', 'success'))
                .catch(err => {
                    console.log('Share cancelled:', err);
                    this.copyToClipboard(window.location.href);
                });
        } else {
            this.copyToClipboard(window.location.href);
        }
    }
    
    // Copy text to clipboard
    copyToClipboard(text) {
        navigator.clipboard.writeText(text)
            .then(() => this.showToast('Link copied to clipboard!', 'success'))
            .catch(err => {
                console.error('Copy failed:', err);
                this.showToast('Failed to copy link', 'error');
            });
    }
    
    // Get watchlist from localStorage
    getWatchlist() {
        const watchlist = localStorage.getItem(AppConfig.WATCHLIST_STORAGE_KEY);
        return watchlist ? JSON.parse(watchlist) : [];
    }
    
    // Save watchlist to localStorage
    saveWatchlist() {
        localStorage.setItem(AppConfig.WATCHLIST_STORAGE_KEY, JSON.stringify(this.watchlist));
    }
    
    // Toggle item in watchlist
    toggleWatchlist() {
        if (!this.currentMovie) return;
        
        const index = this.watchlist.findIndex(item => item.id === this.currentMovie.id);
        
        if (index === -1) {
            // Add to watchlist
            this.watchlist.push({
                id: this.currentMovie.id,
                title: this.currentMovie.title,
                poster: this.currentMovie.poster,
                addedAt: new Date().toISOString()
            });
            this.showToast('Added to watchlist', 'success');
        } else {
            // Remove from watchlist
            this.watchlist.splice(index, 1);
            this.showToast('Removed from watchlist', 'info');
        }
        
        this.saveWatchlist();
        this.updateWatchlistButton();
    }
    
    // Update watchlist button state
    updateWatchlistButton() {
        if (!this.currentMovie) return;
        
        const button = document.getElementById('addToWatchlistBtn');
        const icon = button.querySelector('i');
        const isInWatchlist = this.watchlist.some(item => item.id === this.currentMovie.id);
        
        if (isInWatchlist) {
            icon.className = 'fas fa-check';
            button.innerHTML = '<i class="fas fa-check"></i> In Watchlist';
        } else {
            icon.className = 'fas fa-bookmark';
            button.innerHTML = '<i class="fas fa-bookmark"></i> Watchlist';
        }
    }
    
    // Like video
    likeVideo() {
        if (!this.currentMovie) return;
        
        const button = document.getElementById('likeVideoBtn');
        const icon = button.querySelector('i');
        
        // Toggle like state
        if (icon.classList.contains('fas')) {
            icon.className = 'far fa-thumbs-up';
            this.showToast('Removed like', 'info');
        } else {
            icon.className = 'fas fa-thumbs-up';
            this.showToast('Liked!', 'success');
        }
    }
    
    // Add to watch history
    addToWatchHistory(content) {
        // In a real app, this would save to localStorage or backend
        console.log('Added to watch history:', content.title);
    }
    
    // Get search history from localStorage
    getSearchHistory() {
        const history = localStorage.getItem(AppConfig.SEARCH_HISTORY_KEY);
        return history ? JSON.parse(history) : [];
    }
    
    // Save search history
    saveSearchHistory() {
        localStorage.setItem(AppConfig.SEARCH_HISTORY_KEY, JSON.stringify(this.searchHistory));
    }
    
    // Handle search input
    handleSearchInput(event) {
        const query = event.target.value.trim();
        const resultsContainer = document.getElementById('searchResults');
        
        if (!query) {
            resultsContainer.classList.remove('active');
            return;
        }
        
        // Filter movies based on query
        const results = [...MovieData.movies, ...MovieData.series].filter(item =>
            item.title.toLowerCase().includes(query.toLowerCase()) ||
            item.genre.toLowerCase().includes(query.toLowerCase())
        ).slice(0, 5);
        
        if (results.length > 0) {
            this.renderSearchResults(results);
            resultsContainer.classList.add('active');
        } else {
            resultsContainer.classList.remove('active');
        }
    }
    
    // Render search results
    renderSearchResults(results) {
        const container = document.getElementById('searchResults');
        container.innerHTML = '';
        
        results.forEach(item => {
            const resultItem = document.createElement('div');
            resultItem.className = 'search-result-item';
            resultItem.innerHTML = `
                <img src="${item.poster}" alt="${item.title}">
                <div class="search-result-info">
                    <h4>${item.title}</h4>
                    <p>${item.year} • ${item.genre}</p>
                    <div class="rating">
                        <i class="fas fa-star"></i>
                        <span>${item.rating}/10</span>
                    </div>
                </div>
            `;
            
            resultItem.addEventListener('click', () => {
                this.playMovie(item);
                container.classList.remove('active');
                document.getElementById('searchInput').value = '';
            });
            
            container.appendChild(resultItem);
        });
    }
    
    // Handle search
    handleSearch() {
        const query = document.getElementById('searchInput').value.trim();
        
        if (!query) {
            this.showToast('Please enter search query', 'warning');
            return;
        }
        
        // Add to search history
        if (!this.searchHistory.includes(query)) {
            this.searchHistory.unshift(query);
            this.searchHistory = this.searchHistory.slice(0, 10); // Keep last 10
            this.saveSearchHistory();
        }
        
        // Show loading
        this.showToast(`Searching for "${query}"...`, 'info');
        
        // In a real app, this would call search API
        setTimeout(() => {
            const results = [...MovieData.movies, ...MovieData.series].filter(item =>
                item.title.toLowerCase().includes(query.toLowerCase()) ||
                item.genre.toLowerCase().includes(query.toLowerCase())
            );
            
            if (results.length > 0) {
                this.renderMovies(results);
                this.showToast(`Found ${results.length} results`, 'success');
            } else {
                this.showToast('No results found', 'warning');
            }
            
            // Hide search results dropdown
            document.getElementById('searchResults').classList.remove('active');
        }, 500);
    }
    
    // Toggle mobile menu
    toggleMobileMenu() {
        const mobileMenu = document.getElementById('mobileMenu');
        mobileMenu.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    }
    
    // Show login modal
    showLoginModal() {
        document.getElementById('loginModal').classList.add('active');
    }
    
    // Hide login modal
    hideLoginModal() {
        document.getElementById('loginModal').classList.remove('active');
    }
    
    // Handle login form submission
    handleLogin(event) {
        event.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        // Simple validation
        if (!email || !password) {
            this.showToast('Please fill all fields', 'error');
            return;
        }
        
        // Simulate API call
        this.showToast('Logging in...', 'info');
        
        setTimeout(() => {
            this.isLoggedIn = true;
            this.hideLoginModal();
            this.showToast('Login successful!', 'success');
            
            // Update user button
            const userBtn = document.getElementById('userMenuBtn');
            userBtn.innerHTML = '<i class="fas fa-user"></i> Account';
        }, 1500);
    }
    
    // Toggle password visibility
    togglePasswordVisibility() {
        const passwordInput = document.getElementById('password');
        const showBtn = document.getElementById('showPassword');
        const icon = showBtn.querySelector('i');
        
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            icon.className = 'fas fa-eye-slash';
        } else {
            passwordInput.type = 'password';
            icon.className = 'fas fa-eye';
        }
    }
    
    // Setup back to top button
    setupBackToTop() {
        const backToTopBtn = document.getElementById('backToTop');
        
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });
        
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Generate star rating HTML
    generateStarRating(rating) {
        const fullStars = Math.floor(rating / 2);
        const hasHalfStar = (rating / 2) % 1 >= 0.5;
        
        let starsHtml = '';
        
        // Full stars
        for (let i = 0; i < fullStars; i++) {
            starsHtml += '<i class="fas fa-star"></i>';
        }
        
        // Half star
        if (hasHalfStar) {
            starsHtml += '<i class="fas fa-star-half-alt"></i>';
        }
        
        // Empty stars
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
        for (let i = 0; i < emptyStars; i++) {
            starsHtml += '<i class="far fa-star"></i>';
        }
        
        return starsHtml;
    }
    
    // Show toast notification
    showToast(message, type = 'info') {
        const container = document.getElementById('toastContainer');
        
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        // Set icon based on type
        let icon = 'fas fa-info-circle';
        switch(type) {
            case 'success': icon = 'fas fa-check-circle'; break;
            case 'error': icon = 'fas fa-exclamation-circle'; break;
            case 'warning': icon = 'fas fa-exclamation-triangle'; break;
        }
        
        toast.innerHTML = `
            <i class="${icon}"></i>
            <span>${message}</span>
        `;
        
        container.appendChild(toast);
        
        // Remove toast after 5 seconds
        setTimeout(() => {
            toast.classList.add('fade-out');
            setTimeout(() => {
                container.removeChild(toast);
            }, 300);
        }, 5000);
    }
    
    // Utility: Format duration
    formatDuration(minutes) {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours}h ${mins}m`;
    }
    
    // Utility: Format number with commas
    formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Create global app instance
    window.nyoniMovie = new NyoniMovie();
    
    // Add some sample interactions
    console.log('Nyoni Movie Pro initialized!');
    
    // Auto-hide mobile menu on link click
    document.querySelectorAll('.mobile-links a').forEach(link => {
        link.addEventListener('click', () => {
            document.getElementById('mobileMenu').classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Initialize tab functionality
    document.querySelectorAll('.video-tabs .tab').forEach(tab => {
        tab.addEventListener('click', (e) => {
            const clickedTab = e.currentTarget;
            const tabName = clickedTab.dataset.tab;
            
            // Update active tab
            document.querySelectorAll('.video-tabs .tab').forEach(t => {
                t.classList.remove('active');
            });
            clickedTab.classList.add('active');
            
            // Update tab content
            const tabContent = document.getElementById('tabContent');
            switch(tabName) {
                case 'info':
                    tabContent.innerHTML = `
                        <h4>Movie Information</h4>
                        <p>Detailed information about the movie will appear here.</p>
                        <ul>
                            <li><strong>Director:</strong> Information not available</li>
                            <li><strong>Writers:</strong> Information not available</li>
                            <li><strong>Stars:</strong> Information not available</li>
                            <li><strong>Release Date:</strong> Information not available</li>
                        </ul>
                    `;
                    break;
                case 'episodes':
                    tabContent.innerHTML = `
                        <h4>Episodes</h4>
                        <p>Episode list will appear here for TV series.</p>
                        <div class="episodes-list">
                            <div class="episode">Episode 1: Pilot</div>
                            <div class="episode">Episode 2: Chapter Two</div>
                            <div class="episode">Episode 3: Chapter Three</div>
                        </div>
                    `;
                    break;
                case 'recommended':
                    tabContent.innerHTML = `
                        <h4>Recommended Movies</h4>
                        <p>Similar movies you might like.</p>
                        <div class="recommended-grid">
                            <div class="recommended-item">Movie 1</div>
                            <div class="recommended-item">Movie 2</div>
                            <div class="recommended-item">Movie 3</div>
                        </div>
                    `;
                    break;
                case 'comments':
                    tabContent.innerHTML = `
                        <h4>Comments</h4>
                        <div class="comment-form">
                            <textarea placeholder="Add your comment..."></textarea>
                            <button>Post Comment</button>
                        </div>
                        <div class="comments-list">
                            <p>No comments yet. Be the first to comment!</p>
                        </div>
                    `;
                    break;
            }
        });
    });
    
    // Initialize quick access items
    document.querySelectorAll('.access-item').forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all
            document.querySelectorAll('.access-item').forEach(i => {
                i.classList.remove('active');
            });
            
            // Add active class to clicked
            this.classList.add('active');
            
            const action = this.querySelector('span').textContent;
            nyoniMovie.showToast(`${action} section clicked`, 'info');
        });
    });
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Space to play/pause video
        if (e.code === 'Space' && document.querySelector('.video-modal.active')) {
            e.preventDefault();
            const video = document.getElementById('mainVideoPlayer');
            if (video.paused) {
                video.play();
            } else {
                video.pause();
            }
        }
        
        // Left/Right arrow for video seek
        if ((e.code === 'ArrowLeft' || e.code === 'ArrowRight') && 
            document.querySelector('.video-modal.active')) {
            e.preventDefault();
            const video = document.getElementById('mainVideoPlayer');
            const seekAmount = e.code === 'ArrowLeft' ? -10 : 10;
            video.currentTime = Math.max(0, video.currentTime + seekAmount);
        }
        
        // F for fullscreen
        if (e.code === 'KeyF' && document.querySelector('.video-modal.active')) {
            e.preventDefault();
            const video = document.getElementById('mainVideoPlayer');
            if (video.requestFullscreen) {
                video.requestFullscreen();
            }
        }
        
        // M for mute
        if (e.code === 'KeyM' && document.querySelector('.video-modal.active')) {
            e.preventDefault();
            const video = document.getElementById('mainVideoPlayer');
            video.muted = !video.muted;
            nyoniMovie.showToast(video.muted ? 'Muted' : 'Unmuted', 'info');
        }
    });
    
    // Add video player event listeners
    const videoPlayer = document.getElementById('mainVideoPlayer');
    if (videoPlayer) {
        videoPlayer.addEventListener('play', () => {
            console.log('Video started playing');
        });
        
        videoPlayer.addEventListener('pause', () => {
            console.log('Video paused');
        });
        
        videoPlayer.addEventListener('ended', () => {
            nyoniMovie.showToast('Video ended', 'info');
        });
        
        videoPlayer.addEventListener('error', (e) => {
            console.error('Video error:', e);
            nyoniMovie.showToast('Video playback error', 'error');
        });
    }
    
    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            // Handle responsive adjustments
            console.log('Window resized');
        }, 250);
    });
    
    // Service Worker Registration (for PWA)
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('ServiceWorker registered:', registration);
                })
                .catch(error => {
                    console.log('ServiceWorker registration failed:', error);
                });
        });
    }
    
    // Add manifest for PWA
    if ('manifest' in document) {
        const link = document.createElement('link');
        link.rel = 'manifest';
        link.href = '/manifest.json';
        document.head.appendChild(link);
    }
    
    // Add meta tags for mobile app
    const metaThemeColor = document.createElement('meta');
    metaThemeColor.name = 'theme-color';
    metaThemeColor.content = '#0f0f1a';
    document.head.appendChild(metaThemeColor);
    
    // Log app info
    console.log(`
    ╔══════════════════════════════════════╗
    ║     NYONI MOVIE PRO v1.0.0          ║
    ║     © 2024 Nyoni Movie              ║
    ║     All systems operational          ║
    ╚══════════════════════════════════════╝
    `);
});

// Export for module usage (if using modules)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { NyoniMovie, AppConfig, MovieData };
          }
