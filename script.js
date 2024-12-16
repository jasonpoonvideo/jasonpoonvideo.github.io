// Initialize videos
document.addEventListener('DOMContentLoaded', function() {
    const videos = document.querySelectorAll('video');
    const playButtons = document.querySelectorAll('.play-button');
    
    videos.forEach((video, index) => {
        const playButton = playButtons[index];
        const videoCard = video.closest('.video-card');
        
        // Handle play button click
        if (playButton) {
            playButton.addEventListener('click', function() {
                if (video.paused) {
                    // Stop all other videos
                    videos.forEach(v => {
                        if (v !== video) {
                            v.pause();
                            v.closest('.video-card').querySelector('.play-button i').className = 'fas fa-play';
                        }
                    });
                    
                    // Play this video
                    video.play();
                    playButton.querySelector('i').className = 'fas fa-pause';
                } else {
                    video.pause();
                    playButton.querySelector('i').className = 'fas fa-play';
                }
            });
        }

        // Show controls on hover
        if (videoCard) {
            videoCard.addEventListener('mouseenter', function() {
                video.controls = true;
            });

            videoCard.addEventListener('mouseleave', function() {
                video.controls = false;
            });
        }

        // Reset play button when video ends
        video.addEventListener('ended', function() {
            if (playButton) {
                playButton.querySelector('i').className = 'fas fa-play';
            }
            video.currentTime = 0;
        });
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add scroll animation for elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections and cards
document.querySelectorAll('section, .video-card, .experience-card').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'all 0.6s ease-out';
    observer.observe(element);
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('#hero');
    const scrolled = window.pageYOffset;
    hero.style.backgroundPosition = `50% ${scrolled * 0.5}px`;
});

// Add hover effect to stats
const stats = document.querySelectorAll('.stat');
stats.forEach(stat => {
    stat.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });
    stat.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Video Lightbox
document.addEventListener('DOMContentLoaded', function() {
    const lightbox = document.querySelector('.video-lightbox');
    const lightboxContainer = document.querySelector('.video-lightbox-container');
    const closeButton = document.querySelector('.close-lightbox');
    const playButtons = document.querySelectorAll('.play-button');

    function openLightbox(videoId) {
        try {
            // Validate videoId
            if (!videoId) {
                throw new Error('Video ID is missing');
            }

            // Create YouTube iframe with proper formatting
            const iframe = document.createElement('iframe');
            iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;
            iframe.setAttribute('width', '100%');
            iframe.setAttribute('height', '100%');
            iframe.setAttribute('frameborder', '0');
            iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
            iframe.allowFullscreen = true;

            // Clear previous content and add new iframe
            lightboxContainer.innerHTML = '';
            lightboxContainer.appendChild(iframe);

            // Show lightbox with fade effect
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';

            // Add error handling for iframe load
            iframe.onerror = () => {
                throw new Error('Failed to load video');
            };
        } catch (error) {
            console.error('Error loading video:', error);
            alert('Sorry, there was an error loading the video. Please try again later.');
            closeLightbox();
        }
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        setTimeout(() => {
            lightboxContainer.innerHTML = '';
        }, 300);
        document.body.style.overflow = '';
    }

    // Add click handlers to play buttons
    playButtons.forEach(button => {
        button.addEventListener('click', () => {
            const videoId = button.dataset.videoId;
            openLightbox(videoId);
        });
    });

    // Close lightbox when clicking close button
    closeButton.addEventListener('click', closeLightbox);

    // Close lightbox when clicking outside video
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Close lightbox with escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
});
