class BlurryLoader {
    constructor() {
        this.loadText = document.querySelector('.loading-text');
        this.bg = document.querySelector('.bg');
        this.progressBar = document.querySelector('.progress-bar');
        this.progressContainer = document.querySelector('.progress-container');
        this.completeText = document.createElement('div');
        
        this.init();
    }

    init() {
        this.completeText.classList.add('complete');
        this.completeText.textContent = 'Loaded!';
        document.body.appendChild(this.completeText);
        
        this.preloadImage().then(() => {
            requestAnimationFrame((timestamp) => this.animate(timestamp));
        });
    }

    preloadImage() {
        return new Promise((resolve) => {
            const img = new Image();
            img.src = 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0';
            img.onload = resolve;
        });
    }

    animate(startTime) {
        const duration = 4000; // 4 seconds
        startTime = startTime || performance.now();
        const elapsed = performance.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = this.easeOutQuad(progress);

        const load = Math.floor(easedProgress * 100);
        
        this.updateDOM(load);
        
        if (progress < 1) {
            requestAnimationFrame(() => this.animate(startTime));
        } else {
            this.onComplete();
        }
    }

    updateDOM(load) {
        this.loadText.textContent = `${load}%`;
        this.loadText.style.opacity = this.scale(load, 0, 100, 1, 0);
        this.bg.style.filter = `blur(${this.scale(load, 0, 100, 30, 0)}px)`;
        this.progressBar.style.width = `${load}%`;
    }

    onComplete() {
        // Hide loading text and progress bar
        this.loadText.style.display = 'none';
        this.progressContainer.style.opacity = '0';

        // Show completion text
        this.completeText.style.opacity = '1';
        
        // Fade out completion text after 2 seconds
        setTimeout(() => {
            this.completeText.style.opacity = '0';
        }, 2000);
    }

    easeOutQuad(t) {
        return t * (2 - t);
    }

    scale(num, in_min, in_max, out_min, out_max) {
        return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
    }
}

// Initialize loader
new BlurryLoader();