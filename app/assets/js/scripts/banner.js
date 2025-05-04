document.addEventListener('DOMContentLoaded', () => {
    console.log('Banner.js loaded, initializing banner carousel');
    
    // Banner carousel functionality 
    const slides = document.querySelectorAll('.landing-banner-slide');
    const indicators = document.querySelectorAll('.landing-banner-indicator');
    const prevBtn = document.querySelector('.landing-banner-nav-btn.prev');
    const nextBtn = document.querySelector('.landing-banner-nav-btn.next');
    
    console.log('Found elements:', {
        slides: slides.length,
        indicators: indicators.length,
        prevBtn: !!prevBtn,
        nextBtn: !!nextBtn
    });
    
    if (slides.length === 0) {
        console.warn('No slides found. Banner may not display correctly.');
        return;
    }
    
    let currentIndex = 0;
    let interval;

    // Function to show a specific slide
    function showSlide(index) {
        // Hide all slides and remove active class from indicators
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        indicators.forEach(indicator => {
            indicator.classList.remove('active');
        });

        // Show the selected slide and activate its indicator
        slides[index].classList.add('active');
        if (indicators[index]) {
            indicators[index].classList.add('active');
        }
        
        // Update current index
        currentIndex = index;
    }

    // Add click event to indicators
    indicators.forEach(indicator => {
        indicator.addEventListener('click', () => {
            const index = parseInt(indicator.getAttribute('data-index'));
            showSlide(index);
            resetInterval();
        });
    });

    // Add click event to prev button
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            showSlide(currentIndex);
            resetInterval();
        });
    }

    // Add click event to next button
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % slides.length;
            showSlide(currentIndex);
            resetInterval();
        });
    }

    // Auto-advance slides
    function startInterval() {
        interval = setInterval(() => {
            currentIndex = (currentIndex + 1) % slides.length;
            showSlide(currentIndex);
        }, 7000); // Change slide every 7 seconds
    }

    // Reset interval when user interacts with carousel
    function resetInterval() {
        clearInterval(interval);
        startInterval();
    }

    // Start the interval
    startInterval();
    
    // Force the first slide to be visible
    showSlide(0);
    
    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            showSlide(currentIndex);
            resetInterval();
        } else if (e.key === 'ArrowRight') {
            currentIndex = (currentIndex + 1) % slides.length;
            showSlide(currentIndex);
            resetInterval();
        }
    });
    
    // Make sure the banner container is visible
    const bannerContainer = document.querySelector('.landing-banner-container');
    if (bannerContainer) {
        bannerContainer.style.display = 'block';
        console.log('Banner container found and set to display:block');
    } else {
        console.warn('Banner container not found');
    }
}); 