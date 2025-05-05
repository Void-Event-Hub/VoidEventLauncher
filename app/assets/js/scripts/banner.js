document.addEventListener('DOMContentLoaded', () => {
    console.log('Banner.js loaded, initializing banner carousel')
    
    // Banner carousel functionality 
    const slides = document.querySelectorAll('.landing-banner-slide')
    const indicators = document.querySelectorAll('.landing-banner-indicator')
    const prevBtn = document.querySelector('.landing-banner-nav-btn.prev')
    const nextBtn = document.querySelector('.landing-banner-nav-btn.next')
    
    console.log('Found elements:', {
        slides: slides.length,
        indicators: indicators.length,
        prevBtn: !!prevBtn,
        nextBtn: !!nextBtn
    })
    
    if (slides.length === 0) {
        console.warn('No slides found. Banner may not display correctly.')
        return
    }
    
    let currentIndex = 0
    let interval
    let isTransitioning = false // Flag to prevent transition interruption
    
    // Function to disable navigation buttons during transitions
    function setNavButtonsState(disabled) {
        if (prevBtn) prevBtn.classList.toggle('disabled', disabled)
        if (nextBtn) nextBtn.classList.toggle('disabled', disabled)
        
        // Also disable indicators
        indicators.forEach(indicator => {
            if (disabled) {
                indicator.style.pointerEvents = 'none'
            } else {
                indicator.style.pointerEvents = ''
            }
        })
    }
    
    // Function to get target slide index for next/prev direction
    function getTargetIndex(direction) {
        const currentIndex = parseInt(document.querySelector('.landing-banner-slide.active').getAttribute('data-index'))
        return direction === 'next' 
            ? (currentIndex + 1) % slides.length 
            : (currentIndex - 1 + slides.length) % slides.length
    }
    
    // Function to prepare slides for transition
    function prepareSlides(targetIndex, direction) {
        // Remove all position classes
        slides.forEach(slide => {
            slide.classList.remove('active', 'next', 'prev')
        })
        
        const currentIndex = parseInt(slides[targetIndex].getAttribute('data-index'))
        
        // Get next and prev indexes
        const nextIndex = (currentIndex + 1) % slides.length
        const prevIndex = (currentIndex - 1 + slides.length) % slides.length
        
        // Set up initial positions
        slides[currentIndex].classList.add('active')
        slides[nextIndex].classList.add('next')
        slides[prevIndex].classList.add('prev')
        
        return currentIndex
    }

    // Function to show slides with direction-aware animation
    function showSlide(targetIndex, direction = 'next') {
        // Don't start a new transition if one is already in progress
        if (isTransitioning) {
            return
        }
        
        isTransitioning = true
        // Disable navigation buttons during transition
        setNavButtonsState(true)
        
        // Get the current active slide
        const currentSlide = document.querySelector('.landing-banner-slide.active')
        const currentIndex = parseInt(currentSlide.getAttribute('data-index'))
        
        // If the requested slide is the same as current, just bail out
        if (targetIndex === currentIndex) {
            isTransitioning = false
            setNavButtonsState(false)
            return
        }
        
        // First, reset all slides to base positions
        slides.forEach(slide => {
            slide.classList.remove('active', 'next', 'prev')
        })
        
        // Remove active class from all indicators
        indicators.forEach(indicator => {
            indicator.classList.remove('active')
        })
        
        if (direction === 'next') {
            // Position the target slide to the right
            currentSlide.classList.add('active')
            slides[targetIndex].classList.add('next')
            
            // Allow the DOM to register the position
            setTimeout(() => {
                // Move current slide to the left and new slide to center
                currentSlide.classList.remove('active')
                currentSlide.classList.add('prev')
                slides[targetIndex].classList.remove('next')
                slides[targetIndex].classList.add('active')
                
                // Update indicator
                if (indicators[targetIndex]) {
                    indicators[targetIndex].classList.add('active')
                }
                
                // End transition after animation completes
                setTimeout(() => {
                    isTransitioning = false
                    
                    // After transition completes, set up the next/prev slides properly
                    const newIndex = parseInt(document.querySelector('.landing-banner-slide.active').getAttribute('data-index'))
                    const nextIndex = (newIndex + 1) % slides.length
                    const prevIndex = (newIndex - 1 + slides.length) % slides.length
                    
                    // Clear any obsolete classes
                    slides.forEach((slide, i) => {
                        if (i !== newIndex && i !== nextIndex && i !== prevIndex) {
                            slide.classList.remove('active', 'next', 'prev')
                        }
                    })
                    
                    // Make sure next/prev slides are properly positioned
                    slides[nextIndex].classList.remove('active', 'prev')
                    slides[nextIndex].classList.add('next')
                    slides[prevIndex].classList.remove('active', 'next')
                    slides[prevIndex].classList.add('prev')
                    
                    // Re-enable navigation buttons after an extra 0.5 seconds
                    setTimeout(() => {
                        setNavButtonsState(false)
                    }, 300)
                }, 600) // Match this to your CSS transition duration
            }, 50)
        } 
        else {
            // Position the target slide to the left
            currentSlide.classList.add('active')
            slides[targetIndex].classList.add('prev')
            
            // Allow the DOM to register the position
            setTimeout(() => {
                // Move current slide to the right and new slide to center
                currentSlide.classList.remove('active')
                currentSlide.classList.add('next')
                slides[targetIndex].classList.remove('prev')
                slides[targetIndex].classList.add('active')
                
                // Update indicator
                if (indicators[targetIndex]) {
                    indicators[targetIndex].classList.add('active')
                }
                
                // End transition after animation completes
                setTimeout(() => {
                    isTransitioning = false
                    
                    // After transition completes, set up the next/prev slides properly
                    const newIndex = parseInt(document.querySelector('.landing-banner-slide.active').getAttribute('data-index'))
                    const nextIndex = (newIndex + 1) % slides.length
                    const prevIndex = (newIndex - 1 + slides.length) % slides.length
                    
                    // Clear any obsolete classes
                    slides.forEach((slide, i) => {
                        if (i !== newIndex && i !== nextIndex && i !== prevIndex) {
                            slide.classList.remove('active', 'next', 'prev')
                        }
                    })
                    
                    // Make sure next/prev slides are properly positioned
                    slides[nextIndex].classList.remove('active', 'prev')
                    slides[nextIndex].classList.add('next')
                    slides[prevIndex].classList.remove('active', 'next')
                    slides[prevIndex].classList.add('prev')
                    
                    // Re-enable navigation buttons after an extra 0.5 seconds
                    setTimeout(() => {
                        setNavButtonsState(false)
                    }, 300)
                }, 600) // Match this to your CSS transition duration
            }, 50)
        }
    }

    // Add click event to indicators
    indicators.forEach(indicator => {
        indicator.addEventListener('click', () => {
            const newIndex = parseInt(indicator.getAttribute('data-index'))
            const currentIndex = parseInt(document.querySelector('.landing-banner-slide.active').getAttribute('data-index'))
            // Determine direction based on index values
            const direction = newIndex > currentIndex ? 'next' : 'prev'
            showSlide(newIndex, direction)
            resetInterval()
        })
    })

    // Add click event to prev button
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            const newIndex = getTargetIndex('prev')
            showSlide(newIndex, 'prev')
            resetInterval()
        })
    }

    // Add click event to next button
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            const newIndex = getTargetIndex('next')
            showSlide(newIndex, 'next')
            resetInterval()
        })
    }

    // Auto-advance slides
    function startInterval() {
        interval = setInterval(() => {
            // Only auto-advance if not currently transitioning
            if (!isTransitioning) {
                const newIndex = getTargetIndex('next')
                showSlide(newIndex, 'next')
            }
        }, 7000) // Change slide every 7 seconds
    }

    // Reset interval when user interacts with carousel
    function resetInterval() {
        clearInterval(interval)
        startInterval()
    }
    
    // Initialize the slides - position first, next, and last slides correctly
    function initializeSlides() {
        slides.forEach((slide, i) => {
            slide.classList.remove('active', 'next', 'prev')
            
            if (i === 0) {
                slide.classList.add('active')
            } else if (i === 1) {
                // Position the second slide to the right
                slide.classList.add('next')
            } else if (i === slides.length - 1) {
                // Position the last slide to the left
                slide.classList.add('prev')
            }
        })
        
        // Set the first indicator as active
        if (indicators[0]) {
            indicators[0].classList.add('active')
        }
    }
    
    // Initialize slides on startup
    initializeSlides()
    
    // Start the interval after initialization
    startInterval()
    
    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            const newIndex = getTargetIndex('prev')
            showSlide(newIndex, 'prev')
            resetInterval()
        } else if (e.key === 'ArrowRight') {
            const newIndex = getTargetIndex('next')
            showSlide(newIndex, 'next')
            resetInterval()
        }
    })
    
    // Make sure the banner container is visible
    const bannerContainer = document.querySelector('.landing-banner-container')
    if (bannerContainer) {
        bannerContainer.style.display = 'block'
        console.log('Banner container found and set to display:block')
    } else {
        console.warn('Banner container not found')
    }
})