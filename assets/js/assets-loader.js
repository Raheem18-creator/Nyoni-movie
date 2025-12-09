// Assets Loader Utility
const AssetsLoader = {
    // Default thumbnail URLs
    defaultThumbnails: {
        movie: 'assets/thumbnails/default-movie.jpg',
        series: 'assets/thumbnails/default-series.jpg',
        default: 'assets/thumbnails/default.jpg'
    },
    
    // Background images
    backgrounds: {
        poster: 'assets/backgrounds/default-poster.jpg',
        dark: 'assets/backgrounds/bg-dark.jpg',
        light: 'assets/backgrounds/bg-light.jpg'
    },
    
    // Icon paths
    icons: {
        play: 'assets/icons/play.png',
        pause: 'assets/icons/pause.png',
        volume: 'assets/icons/volume.png',
        fullscreen: 'assets/icons/fullscreen.png',
        favicon: 'assets/icons/favicon.ico'
    },
    
    // Load thumbnail with fallback
    loadThumbnail: function(url, type = 'default') {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(url);
            img.onerror = () => {
                console.warn(`Failed to load thumbnail: ${url}, using default`);
                resolve(this.defaultThumbnails[type] || this.defaultThumbnails.default);
            };
            img.src = url;
        });
    },
    
    // Preload all thumbnails
    preloadThumbnails: function(items) {
        const promises = items.map(item => 
            this.loadThumbnail(item.thumbnail, item.type)
        );
        return Promise.all(promises);
    },
    
    // Set favicon
    setFavicon: function() {
        const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
        link.type = 'image/x-icon';
        link.rel = 'shortcut icon';
        link.href = this.icons.favicon;
        document.head.appendChild(link);
    },
    
    // Set background
    setBackground: function(type = 'poster') {
        const background = this.backgrounds[type];
        if (background) {
            document.body.style.backgroundImage = `url('${background}')`;
            document.body.style.backgroundSize = 'cover';
            document.body.style.backgroundPosition = 'center';
            document.body.style.backgroundAttachment = 'fixed';
        }
    },
    
    // Create placeholder thumbnail
    createPlaceholder: function(text, width = 400, height = 225, bgColor = '#16213e', textColor = '#ffffff') {
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        
        // Draw background
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, width, height);
        
        // Draw text
        ctx.fillStyle = textColor;
        ctx.font = 'bold 20px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(text, width / 2, height / 2);
        
        return canvas.toDataURL('image/jpeg');
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AssetsLoader;
} else {
    window.AssetsLoader = AssetsLoader;
}
