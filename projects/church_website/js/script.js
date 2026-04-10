// ============================================
// GRACE ABOUND MINISTRY - MAIN JAVASCRIPT
// ============================================

document.addEventListener('DOMContentLoaded', function() {

    // ============================================
    // 1. MOBILE HAMBURGER MENU
    // ============================================
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const navMenu = document.getElementById('navMenu');

    if (hamburgerBtn && navMenu) {
        function toggleMenu() {
            const isExpanded = hamburgerBtn.getAttribute('aria-expanded') === 'true';
            hamburgerBtn.setAttribute('aria-expanded', !isExpanded);
            navMenu.classList.toggle('active');
            
            if (!isExpanded) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        }

        hamburgerBtn.addEventListener('click', toggleMenu);

        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                hamburgerBtn.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            });
        });

        document.addEventListener('click', function(e) {
            if (navMenu.classList.contains('active') && 
                !navMenu.contains(e.target) && 
                !hamburgerBtn.contains(e.target)) {
                navMenu.classList.remove('active');
                hamburgerBtn.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        });

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburgerBtn.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
                hamburgerBtn.focus();
            }
        });
    }

    // ============================================
    // 2. HERO CAROUSEL
    // ============================================
    const heroCarousel = document.getElementById('heroCarousel');
    if (heroCarousel) {
        const slides = document.querySelectorAll('#heroCarousel .carousel-slide');
        const dots = document.querySelectorAll('#heroCarousel .dot');
        
        let currentSlide = 0;
        const totalSlides = slides.length;
        let autoPlayInterval;
        const autoPlayDelay = 5000;

        function showSlide(index) {
            slides.forEach(function(slide) {
                slide.classList.remove('active');
            });
            dots.forEach(function(dot) {
                dot.classList.remove('active');
            });
            
            if (index < 0) {
                currentSlide = totalSlides - 1;
            } else if (index >= totalSlides) {
                currentSlide = 0;
            } else {
                currentSlide = index;
            }
            
            slides[currentSlide].classList.add('active');
            if (dots[currentSlide]) {
                dots[currentSlide].classList.add('active');
            }
            resetAutoPlay();
        }

        function nextSlide() {
            showSlide(currentSlide + 1);
        }

        function startAutoPlay() {
            if (autoPlayInterval) clearInterval(autoPlayInterval);
            autoPlayInterval = setInterval(nextSlide, autoPlayDelay);
        }

        function resetAutoPlay() {
            if (autoPlayInterval) {
                clearInterval(autoPlayInterval);
                startAutoPlay();
            }
        }

        function stopAutoPlay() {
            if (autoPlayInterval) {
                clearInterval(autoPlayInterval);
                autoPlayInterval = null;
            }
        }

        dots.forEach(function(dot, index) {
            dot.addEventListener('click', function() {
                showSlide(index);
                stopAutoPlay();
                setTimeout(startAutoPlay, 10000);
            });
        });

        const carouselContainer = document.querySelector('.hero-carousel');
        if (carouselContainer) {
            carouselContainer.addEventListener('mouseenter', stopAutoPlay);
            carouselContainer.addEventListener('mouseleave', startAutoPlay);
        }

        let touchStartX = 0;
        let touchEndX = 0;
        
        if (carouselContainer) {
            carouselContainer.addEventListener('touchstart', function(e) {
                touchStartX = e.changedTouches[0].screenX;
            });
            
            carouselContainer.addEventListener('touchend', function(e) {
                touchEndX = e.changedTouches[0].screenX;
                var diff = touchEndX - touchStartX;
                if (Math.abs(diff) > 50) {
                    if (diff > 0) {
                        showSlide(currentSlide - 1);
                    } else {
                        nextSlide();
                    }
                    stopAutoPlay();
                    setTimeout(startAutoPlay, 10000);
                }
            });
        }

        showSlide(0);
        startAutoPlay();
    }

    // ============================================
    // 3. QUICK ACCESS CAROUSEL
    // ============================================
    const quickWrapper = document.getElementById('quickCarouselWrapper');
    if (quickWrapper) {
        const quickSlides = document.querySelectorAll('.quick-carousel-slide');
        const quickPrev = document.querySelector('.quick-prev');
        const quickNext = document.querySelector('.quick-next');
        const quickDotsContainer = document.querySelector('.quick-dots');
        
        let quickCurrentIndex = 0;
        let slidesToShow = getSlidesToShow();
        const totalQuickSlides = quickSlides.length;
        let autoQuickInterval;
        
        function getSlidesToShow() {
            if (window.innerWidth < 768) return 1;
            if (window.innerWidth < 1024) return 2;
            return 3;
        }
        
        if (quickDotsContainer) {
            quickDotsContainer.innerHTML = '';
            var numberOfDots = Math.ceil(totalQuickSlides / slidesToShow);
            for (var i = 0; i < numberOfDots; i++) {
                var dot = document.createElement('button');
                dot.classList.add('dot');
                if (i === 0) dot.classList.add('active');
                dot.setAttribute('data-index', i);
                dot.addEventListener('click', (function(idx) {
                    return function() { goToQuickSlide(idx); };
                })(i));
                quickDotsContainer.appendChild(dot);
            }
        }
        
        function updateQuickCarousel() {
            var slideWidth = quickSlides[0] ? quickSlides[0].offsetWidth : 0;
            var gap = 24;
            var scrollAmount = quickCurrentIndex * (slideWidth + gap);
            quickWrapper.scrollTo({ left: scrollAmount, behavior: 'smooth' });
            
            var dots = document.querySelectorAll('.quick-dots .dot');
            var activeDotIndex = Math.floor(quickCurrentIndex / slidesToShow);
            dots.forEach(function(dot, idx) {
                dot.classList.toggle('active', idx === activeDotIndex);
            });
        }
        
        function nextQuickSlide() {
            var maxIndex = Math.ceil(totalQuickSlides / slidesToShow) - 1;
            if (quickCurrentIndex < maxIndex) {
                quickCurrentIndex++;
                updateQuickCarousel();
                resetQuickAutoPlay();
            }
        }
        
        function prevQuickSlide() {
            if (quickCurrentIndex > 0) {
                quickCurrentIndex--;
                updateQuickCarousel();
                resetQuickAutoPlay();
            }
        }
        
        function goToQuickSlide(index) {
            quickCurrentIndex = index;
            updateQuickCarousel();
            resetQuickAutoPlay();
        }
        
        function startQuickAutoPlay() {
            if (autoQuickInterval) clearInterval(autoQuickInterval);
            autoQuickInterval = setInterval(function() {
                var maxIndex = Math.ceil(totalQuickSlides / slidesToShow) - 1;
                if (quickCurrentIndex >= maxIndex) {
                    quickCurrentIndex = 0;
                } else {
                    quickCurrentIndex++;
                }
                updateQuickCarousel();
            }, 5000);
        }
        
        function stopQuickAutoPlay() {
            if (autoQuickInterval) {
                clearInterval(autoQuickInterval);
                autoQuickInterval = null;
            }
        }
        
        function resetQuickAutoPlay() {
            if (autoQuickInterval) {
                stopQuickAutoPlay();
                startQuickAutoPlay();
            }
        }
        
        if (quickNext) {
            quickNext.addEventListener('click', function() {
                nextQuickSlide();
                stopQuickAutoPlay();
                setTimeout(startQuickAutoPlay, 10000);
            });
        }
        
        if (quickPrev) {
            quickPrev.addEventListener('click', function() {
                prevQuickSlide();
                stopQuickAutoPlay();
                setTimeout(startQuickAutoPlay, 10000);
            });
        }
        
        var resizeTimeout;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(function() {
                slidesToShow = getSlidesToShow();
                quickCurrentIndex = 0;
                updateQuickCarousel();
            }, 250);
        });
        
        startQuickAutoPlay();
    }

// ============================================
// FELLOWSHIP SECTION - TABBED INTERFACE
// ============================================
const tabs = document.querySelectorAll('.fellowship-tab');
const panels = document.querySelectorAll('.fellowship-panel');

if (tabs.length && panels.length) {
    function switchTab(targetId) {
        // Deactivate all tabs and hide all panels
        tabs.forEach(tab => {
            tab.classList.remove('active');
            tab.setAttribute('aria-selected', 'false');
        });
        
        panels.forEach(panel => {
            panel.classList.remove('active');
            panel.setAttribute('hidden', 'true');
        });
        
        // Activate the selected tab and show its panel
        const activeTab = document.querySelector(`.fellowship-tab[data-tab="${targetId}"]`);
        const activePanel = document.getElementById(targetId);
        
        if (activeTab && activePanel) {
            activeTab.classList.add('active');
            activeTab.setAttribute('aria-selected', 'true');
            activePanel.classList.add('active');
            activePanel.removeAttribute('hidden');
        }
    }
    
    // Add click event to each tab
    tabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            const targetId = tab.getAttribute('data-tab');
            switchTab(targetId);
        });
    });
    
    // Handle form submissions within panels
    const fellowshipForms = document.querySelectorAll('.fellowship-form');
    fellowshipForms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you! We will get back to you shortly.');
            form.reset();
        });
    });
}


// Animated Counter for Statistics Section with custom formatting
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    if (!statNumbers.length) return;

    // Function to format number based on its value
    function formatNumber(num, originalTarget) {
        if (originalTarget >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M+';
        } else if (originalTarget >= 1000) {
            return Math.floor(num / 1000) + 'K+';
        }
        return num;
    }

    const animateNumber = (element) => {
        const target = parseInt(element.getAttribute('data-count'));
        let current = 0;
        const increment = target / 80;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                // Show formatted number during animation
                element.innerText = formatNumber(Math.floor(current), target);
                requestAnimationFrame(updateCounter);
            } else {
                // Show final formatted number
                element.innerText = formatNumber(target, target);
            }
        };
        updateCounter();
    };

    // Use Intersection Observer to start animation when stats are in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNumber(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => observer.observe(stat));
}

window.addEventListener('load', animateStats);


// ============================================
// SCROLL-TRIGGERED CARD ANIMATIONS
// ============================================
function initCardAnimations() {
    const cards = document.querySelectorAll('.purpose-card');
    
    if (!cards.length) return;
    
    // Add animation classes based on data attribute
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const card = entry.target;
                const animation = card.getAttribute('data-animation');
                
                if (animation === 'left') {
                    card.classList.add('animate-left');
                } else if (animation === 'right') {
                    card.classList.add('animate-right');
                } else if (animation === 'center') {
                    card.classList.add('animate-center');
                }
                
                observer.unobserve(card);
            }
        });
    }, { threshold: 0.3, rootMargin: '0px 0px -50px 0px' });
    
    cards.forEach(card => observer.observe(card));
}

// Initialize on page load
window.addEventListener('load', initCardAnimations);



// ============================================
// SERMONS PAGE FUNCTIONALITY
// ============================================

function initSermonsPage() {
    // Audio Accordion
    const seriesHeaders = document.querySelectorAll('.series-header');
    if (seriesHeaders.length) {
        seriesHeaders.forEach(header => {
            header.addEventListener('click', () => {
                const parentSeries = header.closest('.audio-series');
                const content = parentSeries.querySelector('.series-content');
                const isOpen = content.classList.contains('open');
                
                document.querySelectorAll('.series-content').forEach(item => {
                    if (item !== content) {
                        item.classList.remove('open');
                        item.closest('.audio-series')?.querySelector('.series-header')?.classList.remove('active');
                    }
                });
                
                content.classList.toggle('open');
                header.classList.toggle('active');
            });
        });
    }
    
    // Media & Category Filters
    const mediaFilterBtns = document.querySelectorAll('.media-filter-btn');
    const categoryFilterBtns = document.querySelectorAll('.category-filter-btn');
    const audioSeries = document.querySelectorAll('.audio-series');
    const videoCards = document.querySelectorAll('.video-card');
    
    function filterContent() {
        const activeMedia = document.querySelector('.media-filter-btn.active')?.getAttribute('data-media') || 'all';
        const activeCategory = document.querySelector('.category-filter-btn.active')?.getAttribute('data-category') || 'all';
        
        // Filter Audio
        audioSeries.forEach(series => {
            const seriesCategory = series.getAttribute('data-category');
            const seriesMedia = series.getAttribute('data-media');
            
            const mediaMatch = activeMedia === 'all' || seriesMedia === activeMedia;
            const categoryMatch = activeCategory === 'all' || seriesCategory === activeCategory;
            
            if (mediaMatch && categoryMatch) {
                series.classList.remove('hidden');
            } else {
                series.classList.add('hidden');
            }
        });
        
        // Filter Video
        videoCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            const cardMedia = card.getAttribute('data-media');
            
            const mediaMatch = activeMedia === 'all' || cardMedia === activeMedia;
            const categoryMatch = activeCategory === 'all' || cardCategory === activeCategory;
            
            if (mediaMatch && categoryMatch) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });
    }
    
    mediaFilterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            mediaFilterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filterContent();
        });
    });
    
    categoryFilterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            categoryFilterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filterContent();
        });
    });
    
    // Video Modal
    const videoModal = document.getElementById('videoModal');
    const playButtons = document.querySelectorAll('.play-video-btn');
    const modalVideo = document.getElementById('modalVideo');
    const modalClose = document.querySelector('.modal-close');
    
    if (playButtons.length && videoModal) {
        playButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const videoId = btn.getAttribute('data-video-id');
                const parentCard = btn.closest('.video-card');
                const title = parentCard?.querySelector('h3')?.innerText || '';
                const preacher = parentCard?.querySelector('.video-preacher')?.innerText || '';
                
                modalVideo.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
                document.getElementById('modalTitle').innerText = title;
                document.getElementById('modalPreacher').innerText = preacher;
                videoModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });
        
        modalClose?.addEventListener('click', () => {
            modalVideo.src = '';
            videoModal.classList.remove('active');
            document.body.style.overflow = '';
        });
        
        videoModal.addEventListener('click', (e) => {
            if (e.target === videoModal) {
                modalVideo.src = '';
                videoModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
}

// Call this inside DOMContentLoaded
 initSermonsPage();

})