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
    // 2. HERO CAROUSEL (Homepage)
    // ============================================
    const heroCarousel = document.getElementById('heroCarousel');
    if (heroCarousel) {
        // ... your hero carousel code ...
    }

    // ============================================
    // 3. QUICK ACCESS CAROUSEL (Homepage)
    // ============================================
    const quickWrapper = document.getElementById('quickCarouselWrapper');
    if (quickWrapper) {
        // ... your quick access carousel code ...
    }

    // ============================================
    // 4. FELLOWSHIP SECTION TABBED INTERFACE
    // ============================================
    const tabs = document.querySelectorAll('.fellowship-tab');
    const panels = document.querySelectorAll('.fellowship-panel');

    if (tabs.length && panels.length) {
        // ... your fellowship tab code ...
    }

    // ============================================
    // 5. ANIMATE STATS (About Page)
    // ============================================
    function animateStats() {
        const statNumbers = document.querySelectorAll('.stat-number');
        if (!statNumbers.length) return;

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
                    element.innerText = formatNumber(Math.floor(current), target);
                    requestAnimationFrame(updateCounter);
                } else {
                    element.innerText = formatNumber(target, target);
                }
            };
            updateCounter();
        };

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

    animateStats();

    // ============================================
    // 6. CARD ANIMATIONS (About Page)
    // ============================================
    function initCardAnimations() {
        const cards = document.querySelectorAll('.purpose-card');
        if (!cards.length) return;
        
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
        }, { threshold: 0.3 });
        
        cards.forEach(card => observer.observe(card));
    }

    initCardAnimations();

    // ============================================
    // 7. SERMONS PAGE FUNCTIONALITY
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
            
            audioSeries.forEach(series => {
                const seriesCategory = series.getAttribute('data-category');
                const seriesMedia = series.getAttribute('data-media');
                const mediaMatch = activeMedia === 'all' || seriesMedia === activeMedia;
                const categoryMatch = activeCategory === 'all' || seriesCategory === activeCategory;
                series.classList.toggle('hidden', !(mediaMatch && categoryMatch));
            });
            
            videoCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                const cardMedia = card.getAttribute('data-media');
                const mediaMatch = activeMedia === 'all' || cardMedia === activeMedia;
                const categoryMatch = activeCategory === 'all' || cardCategory === activeCategory;
                card.classList.toggle('hidden', !(mediaMatch && categoryMatch));
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
    }

    // Only initialize sermons page if on sermons page
    if (document.querySelector('.sermons-hero') || document.querySelector('.media-filters-section')) {
        initSermonsPage();
    }

    // ============================================
    // 8. EVENTS PAGE FUNCTIONALITY
    // ============================================



    // Event Data
    const eventsData = [
        { id: 1, title: "Wedding: Michael & Sarah", date: "2026-04-29", time: "10:00", endTime: "14:00", location: "Main Sanctuary", category: "Wedding", description: "Join us as Michael and Sarah exchange vows in holy matrimony.", image: "assets/images/wedding1.png" },
        { id: 2, title: "Healing & Miracle Service", date: "2026-04-20", time: "09:00", endTime: "12:00", location: "Main Sanctuary", category: "Special Service", description: "Special service focused on divine healing and miracles.", image: "assets/images/pastor.png" },
        { id: 3, title: "Women of Grace Conference", date: "2026-05-10", time: "10:00", endTime: "16:00", location: "Conference Hall", category: "Conference", description: "Empowering women through God's Word.", image: "assets/images/fellowship.png" },
        { id: 4, title: "Youth Fire Night", date: "2026-04-18", time: "17:00", endTime: "20:00", location: "Youth Chapel", category: "Youth", description: "Dynamic worship and powerful word for young people.", image: "assets/images/fellowship.png" }
    ];

    let currentEvent = null;
    let currentDate = new Date(2026, 3);

    // Add to Calendar function
    function addToGoogleCalendar(title, date, time, location, description) {
        const startDateTime = new Date(`${date}T${time}:00`);
        const endDateTime = new Date(startDateTime);
        endDateTime.setHours(endDateTime.getHours() + 2);
        
        const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${startDateTime.toISOString().replace(/-|:|\./g, '')}/${endDateTime.toISOString().replace(/-|:|\./g, '')}&details=${encodeURIComponent(description)}&location=${encodeURIComponent(location)}`;
        window.open(url, '_blank');
    }

    // ============================================
    // SHOW NO EVENT MODAL (CARD INSTEAD OF ALERT)
    // ============================================
    function showNoEventModal(date) {
        const modal = document.getElementById('eventDetailsModal');
        if (!modal) return;
        
        // Format the date nicely
        const formattedDate = new Date(date).toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
        
        // Update modal content for "no event"
        const modalImage = document.getElementById('modalEventImage');
        const modalCategory = document.getElementById('modalEventCategory');
        const modalTitle = document.getElementById('modalEventTitle');
        const modalDate = document.getElementById('modalEventDate');
        const modalTime = document.getElementById('modalEventTime');
        const modalLocation = document.getElementById('modalEventLocation');
        const modalDescription = document.getElementById('modalEventDescription');
        const addBtn = document.getElementById('modalAddToCalendar');
        const shareBtn = document.getElementById('modalShareEvent');
        
        if (modalImage) modalImage.src = 'assets/images/noevent.png';
        if (modalCategory) {
            modalCategory.textContent = 'No Event';
            modalCategory.style.background = '#f3f4f6';
            modalCategory.style.color = '#6b7280';
        }
        if (modalTitle) modalTitle.textContent = 'No Scheduled Events';
        if (modalDate) modalDate.textContent = formattedDate;
        if (modalTime) modalTime.textContent = '—';
        if (modalLocation) modalLocation.textContent = '—';
        if (modalDescription) modalDescription.textContent = 'There are no events scheduled for this date. Please check back later or browse other dates for upcoming programs and services.';
        
        // Hide add to calendar and share buttons for no-event
        if (addBtn) addBtn.style.display = 'none';
        if (shareBtn) shareBtn.style.display = 'none';
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Render Calendar
    // Render Calendar
    function renderCalendar() {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const monthYearElement = document.getElementById('currentMonthYear');
        if (monthYearElement) {
            monthYearElement.textContent = `${monthNames[month]} ${year}`;
        }
        
        const firstDay = new Date(year, month, 1);
        const startDayOfWeek = firstDay.getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        
        const calendarGrid = document.getElementById('calendarDaysGrid');
        if (!calendarGrid) return;
        calendarGrid.innerHTML = '';
        
        // Previous month days
        const prevMonthLastDay = new Date(year, month, 0).getDate();
        for (let i = startDayOfWeek - 1; i >= 0; i--) {
            const day = prevMonthLastDay - i;
            const dayDiv = document.createElement('div');
            dayDiv.className = 'calendar-day other-month';
            dayDiv.textContent = day;
            calendarGrid.appendChild(dayDiv);
        }
        
        // Current month days
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(year, month, day);
            
            // FIXED: Create date string without timezone issues
            const yearNum = date.getFullYear();
            const monthNum = String(date.getMonth() + 1).padStart(2, '0');
            const dayNum = String(date.getDate()).padStart(2, '0');
            const dateStr = `${yearNum}-${monthNum}-${dayNum}`;
            
            const hasEvent = eventsData.some(event => event.date === dateStr);
            const isToday = date.toDateString() === today.toDateString();
            
            const dayDiv = document.createElement('div');
            dayDiv.className = 'calendar-day';
            if (hasEvent) dayDiv.classList.add('has-event');
            if (isToday) dayDiv.classList.add('today');
            dayDiv.textContent = day;
            
            // FIXED: Use the correctly formatted date string
            dayDiv.addEventListener('click', (function(currentDate, currentDateStr) {
                return function() {
                    const eventsOnDate = eventsData.filter(event => event.date === currentDateStr);
                    if (eventsOnDate.length > 0) {
                        showEventModal(eventsOnDate[0]);
                    } else {
                        showNoEventModal(currentDate);
                    }
                };
            })(date, dateStr));
            
            calendarGrid.appendChild(dayDiv);
        }
        
        // Next month days
        const totalCells = 42;
        const remainingCells = totalCells - calendarGrid.children.length;
        for (let day = 1; day <= remainingCells; day++) {
            const dayDiv = document.createElement('div');
            dayDiv.className = 'calendar-day other-month';
            dayDiv.textContent = day;
            calendarGrid.appendChild(dayDiv);
        }
    }

    // Render Scrollable Events
// Render Scrollable Events (Sorted by nearest date first)
function renderScrollableEvents() {
    const wrapper = document.getElementById('scrollableEventsList');
    if (!wrapper) return;
    
    // Get today's date at midnight for accurate comparison
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Filter only future or today's events and sort by date (nearest first)
    const sortedEvents = eventsData
        .filter(event => {
            const eventDate = new Date(event.date);
            eventDate.setHours(0, 0, 0, 0);
            return eventDate >= today;
        })
        .sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return dateA - dateB; // Sort ascending (nearest first)
        });
    
    if (sortedEvents.length === 0) {
        wrapper.innerHTML = '<div class="no-events-message">No upcoming events at this time.</div>';
        return;
    }
    
    wrapper.innerHTML = sortedEvents.map(event => {
        const eventDate = new Date(event.date);
        const monthName = eventDate.toLocaleString('default', { month: 'short' }); // "Apr", "May", etc.
        const dayNum = eventDate.getDate();
        
        return `
            <div class="scrollable-event-card" data-event-id="${event.id}">
                <div class="event-card-image">
                    <img src="${event.image}" alt="${event.title}" onerror="this.src='assets/images/noevent.png'">
                    <div class="event-date-badge">
                        <div class="badge-month">${monthName}</div>
                        <div class="badge-day">${dayNum}</div>
                    </div>
                </div>
                <div class="event-card-content">
                    <h4>${event.title}</h4>
                    <div class="event-time">
                        <img src="assets/icons/clock.png" alt="Time">
                        <span>${event.time}</span>
                    </div>
                    <div class="event-location">
                        <img src="assets/icons/location.png" alt="Location">
                        <span>${event.location}</span>
                    </div>
                    <p class="event-description">${event.description.substring(0, 80)}${event.description.length > 80 ? '...' : ''}</p>
                    <a href="#" class="view-details" data-event-id="${event.id}">View Details →</a>
                </div>
            </div>
        `;
    }).join('');
    
    document.querySelectorAll('.scrollable-event-card').forEach(card => {
        card.addEventListener('click', (e) => {
            if (e.target.classList.contains('view-details')) return;
            const eventId = parseInt(card.getAttribute('data-event-id'));
            const event = eventsData.find(e => e.id === eventId);
            if (event) showEventModal(event);
        });
    });
    
    document.querySelectorAll('.view-details').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const eventId = parseInt(link.getAttribute('data-event-id'));
            const event = eventsData.find(e => e.id === eventId);
            if (event) showEventModal(event);
        });
    });
}
    // Show Event Modal
    function showEventModal(event) {
        currentEvent = event;
        const modal = document.getElementById('eventDetailsModal');
        if (!modal) return;
        
        const modalImage = document.getElementById('modalEventImage');
        const modalCategory = document.getElementById('modalEventCategory');
        const modalTitle = document.getElementById('modalEventTitle');
        const modalDate = document.getElementById('modalEventDate');
        const modalTime = document.getElementById('modalEventTime');
        const modalLocation = document.getElementById('modalEventLocation');
        const modalDescription = document.getElementById('modalEventDescription');
        const addBtn = document.getElementById('modalAddToCalendar');
        const shareBtn = document.getElementById('modalShareEvent');
        
        if (modalImage) modalImage.src = event.image;
        if (modalCategory) {
            modalCategory.textContent = event.category;
            modalCategory.style.background = '';
            modalCategory.style.color = '';
        }
        if (modalTitle) modalTitle.textContent = event.title;
        if (modalDate) modalDate.textContent = new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        if (modalTime) modalTime.textContent = event.time;
        if (modalLocation) modalLocation.textContent = event.location;
        if (modalDescription) modalDescription.textContent = event.description;
        
        // Show add to calendar buttons for real events
        if (addBtn) addBtn.style.display = 'flex';
        if (shareBtn) shareBtn.style.display = 'flex';
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        const modal = document.getElementById('eventDetailsModal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    // Announcements Carousel
    let currentSlide = 0;
    const slides = document.querySelectorAll('.announcement-slide');
    const prevBtn = document.querySelector('.prev-announcement');
    const nextBtn = document.querySelector('.next-announcement');
    const dotsContainer = document.querySelector('.carousel-dots-announcement');

    if (slides.length > 0 && dotsContainer) {
        function updateCarousel() {
            const wrapper = document.querySelector('.announcements-carousel-wrapper');
            if (wrapper) {
                wrapper.style.transform = `translateX(-${currentSlide * 100}%)`;
            }
            
            document.querySelectorAll('.carousel-dots-announcement .dot').forEach((dot, index) => {
                dot.classList.toggle('active', index === currentSlide);
            });
        }
        
        function createDots() {
            dotsContainer.innerHTML = '';
            slides.forEach((_, index) => {
                const dot = document.createElement('button');
                dot.classList.add('dot');
                if (index === 0) dot.classList.add('active');
                dot.addEventListener('click', () => {
                    currentSlide = index;
                    updateCarousel();
                });
                dotsContainer.appendChild(dot);
            });
        }
        
        if (prevBtn && nextBtn) {
            prevBtn.addEventListener('click', () => {
                currentSlide = (currentSlide - 1 + slides.length) % slides.length;
                updateCarousel();
            });
            
            nextBtn.addEventListener('click', () => {
                currentSlide = (currentSlide + 1) % slides.length;
                updateCarousel();
            });
        }
        
        createDots();
    }

    // Initialize Events Page
    if (document.getElementById('calendarDaysGrid')) {
        renderCalendar();
        renderScrollableEvents();
        
        // Calendar navigation
        const prevMonthBtn = document.querySelector('.prev-month-btn');
        const nextMonthBtn = document.querySelector('.next-month-btn');
        
        if (prevMonthBtn) {
            prevMonthBtn.addEventListener('click', () => {
                currentDate.setMonth(currentDate.getMonth() - 1);
                renderCalendar();
            });
        }
        
        if (nextMonthBtn) {
            nextMonthBtn.addEventListener('click', () => {
                currentDate.setMonth(currentDate.getMonth() + 1);
                renderCalendar();
            });
        }
        
        // Modal close
        const closeModalBtn = document.getElementById('closeModalBtn');
        const eventModal = document.getElementById('eventDetailsModal');
        
        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', closeModal);
        }
        
        if (eventModal) {
            eventModal.addEventListener('click', (e) => {
                if (e.target === eventModal) closeModal();
            });
        }
        
        // Add to calendar buttons
        const modalAddBtn = document.getElementById('modalAddToCalendar');
        if (modalAddBtn) {
            modalAddBtn.addEventListener('click', () => {
                if (currentEvent) addToGoogleCalendar(currentEvent.title, currentEvent.date, currentEvent.time, currentEvent.location, currentEvent.description);
            });
        }
        
        document.querySelectorAll('.add-to-calendar-announcement').forEach(btn => {
            btn.addEventListener('click', () => {
                const title = btn.getAttribute('data-title');
                const date = btn.getAttribute('data-date');
                const time = btn.getAttribute('data-time');
                const location = btn.getAttribute('data-location');
                addToGoogleCalendar(title, date, time, location, '');
            });
        });
        
document.querySelectorAll('.btn-add-recurring').forEach(btn => {
    btn.addEventListener('click', () => {
        const title = btn.getAttribute('data-title');
        const day = btn.getAttribute('data-day');
        const time = btn.getAttribute('data-time');
        
        // Create a date for the next occurrence of this day
        const today = new Date();
        const dayMap = { 
            Sunday: 0, Monday: 1, Tuesday: 2, 
            Wednesday: 3, Thursday: 4, Friday: 5, Saturday: 6 
        };
        
        const targetDay = dayMap[day];
        const currentDay = today.getDay();
        let daysUntil = targetDay - currentDay;
        
        // If today is past the target day, get next week's
        if (daysUntil < 0) daysUntil += 7;
        if (daysUntil === 0 && today.getHours() >= parseInt(time)) daysUntil = 7;
        
        const nextDate = new Date(today);
        nextDate.setDate(today.getDate() + daysUntil);
        
        // Parse time (format: "09:00" or "18:00")
        const [hours, minutes] = time.split(':');
        nextDate.setHours(parseInt(hours), parseInt(minutes), 0);
        
        // Set end time (1 hour later)
        const endDate = new Date(nextDate);
        endDate.setHours(endDate.getHours() + 1);
        
        // Format dates for Google Calendar
        const startFormat = nextDate.toISOString().replace(/-|:|\./g, '');
        const endFormat = endDate.toISOString().replace(/-|:|\./g, '');
        
        // Create recurring rule: weekly on this day
        const dayAbbr = day.substring(0, 2).toUpperCase();
        const recurringRule = `RRULE:FREQ=WEEKLY;BYDAY=${dayAbbr}`;
        
        // Google Calendar URL with recurring event
        const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${startFormat}/${endFormat}&recur=${encodeURIComponent(recurringRule)}`;
        
        window.open(url, '_blank');
    });
});
        
        // Scroll controls
        const scrollWrapper = document.querySelector('.scrollable-events-wrapper');
        const scrollLeft = document.querySelector('.scroll-left');
        const scrollRight = document.querySelector('.scroll-right');
        
        if (scrollLeft && scrollRight && scrollWrapper) {
            scrollLeft.addEventListener('click', () => {
                scrollWrapper.scrollBy({ left: -350, behavior: 'smooth' });
            });
            scrollRight.addEventListener('click', () => {
                scrollWrapper.scrollBy({ left: 350, behavior: 'smooth' });
            });
        }
    }


    // ============================================
// TESTIMONIES PAGE FUNCTIONALITY
// ============================================

if (document.querySelector('.testimonies-hero')) {
    
    // Testimonies Data
    const testimoniesData = [
        { id: 1, title: "13 Years Immigration Challenge Settled in 3 Days", category: "deliverance", content: "In 2017, the Immigration service arrested me. For 8 years, my immigration case was stagnant. When I reconnected back to church, I attended the Winners Satellite Fellowship. In November 2020, within three days, I received a call that changed my life. They had granted our residence permit for both of us. Praise God!", author: "Sandra", date: "April 2026", categoryColor: "#8b5cf6" },
        { id: 2, title: "Doors of Favour via Kingdom Advancement", category: "financial", content: "After 13 months of suspension without income, God opened doors! He gave me another job that is better than the one I lost with international access for my family. The two sources of income are more than what I was earning before.", author: "Oladeji Olanrewaju", date: "March 2026", categoryColor: "#10b981" },
        { id: 3, title: "Healing via the Mystery of Communion", category: "healing", content: "I had been unable to sleep for two nights due to stomach pain. Instead of taking medicine, I took communion and rubbed anointing oil on my stomach. The next day the pain ceased till date. I give God all the glory!", author: "Mercy Percy", date: "February 2026", categoryColor: "#b91c1c" },
        { id: 4, title: "University Admission Miraculously Granted", category: "family", content: "God made a way for my son to study Dentistry at Cardiff University and my daughter at Grammar school. I return all the glory to Him!", author: "Tinuke Joshua", date: "January 2026", categoryColor: "#f59e0b" }
    ];
    
    let currentTestimonies = [...testimoniesData];
    let visibleCount = 6;
    
    // Video Testimonies Data
    const videoTestimonies = [
        { id: 1, title: "Healed from Cancer", description: "Sister Jane shares her healing testimony", thumbnail: "assets/images/testify1.jpg", videoId: "VIDEO_ID_1" },
        { id: 2, title: "Financial Breakthrough", description: "Brother Peter's testimony of provision", thumbnail: "assets/images/testify2.jpg", videoId: "VIDEO_ID_2" },
        { id: 3, title: "Restored Marriage", description: "How God saved our family", thumbnail: "assets/images/testify3.jpg", videoId: "VIDEO_ID_3" }
    ];
    
    // Render Video Testimonies
    function renderVideoTestimonies() {
        const grid = document.getElementById('videoTestimoniesGrid');
        if (!grid) return;
        
        grid.innerHTML = videoTestimonies.map(video => `
            <div class="video-testimony-card" data-video-id="${video.videoId}" data-title="${video.title}" data-description="${video.description}">
                <div class="video-thumbnail">
                    <img src="${video.thumbnail}" alt="${video.title}">
                    <div class="play-icon"></div>
                </div>
                <div class="video-info">
                    <h4>${video.title}</h4>
                    <p>${video.description}</p>
                </div>
            </div>
        `).join('');
        
        // Add click handlers for video cards
        document.querySelectorAll('.video-testimony-card').forEach(card => {
            card.addEventListener('click', () => {
                const videoId = card.getAttribute('data-video-id');
                const title = card.getAttribute('data-title');
                const description = card.getAttribute('data-description');
                openVideoModal(videoId, title, description);
            });
        });
    }
    
    // Render Written Testimonies
    function renderWrittenTestimonies() {
        const grid = document.getElementById('testimoniesGrid');
        if (!grid) return;
        
        const displayTestimonies = currentTestimonies.slice(0, visibleCount);
        
        grid.innerHTML = displayTestimonies.map(testimony => `
            <div class="testimony-card" data-category="${testimony.category}" style="animation-delay: ${Math.random() * 0.3}s">
                <span class="testimony-category ${testimony.category}">${testimony.category}</span>
                <h3 class="testimony-title">${testimony.title}</h3>
                <p class="testimony-content">${testimony.content}</p>
                <div class="testimony-author">
                    <span class="author-name">— ${testimony.author}</span>
                    <span class="testimony-date">${testimony.date}</span>
                </div>
            </div>
        `).join('');
        
        // Show/hide load more button
        const loadMoreContainer = document.getElementById('loadMoreContainer');
        if (loadMoreContainer) {
            loadMoreContainer.style.display = visibleCount >= currentTestimonies.length ? 'none' : 'block';
        }
    }
    
    // Filter Testimonies
    function filterTestimonies(category) {
        if (category === 'all') {
            currentTestimonies = [...testimoniesData];
        } else {
            currentTestimonies = testimoniesData.filter(t => t.category === category);
        }
        visibleCount = 6;
        renderWrittenTestimonies();
    }
    
    // Load More Testimonies
    function loadMoreTestimonies() {
        visibleCount += 3;
        renderWrittenTestimonies();
    }
    
    // Video Modal
    function openVideoModal(videoId, title, description) {
        const modal = document.getElementById('videoModal');
        const modalVideo = document.getElementById('modalVideo');
        const modalTitle = document.getElementById('modalTitle');
        const modalDescription = document.getElementById('modalDescription');
        
        modalVideo.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
        modalTitle.textContent = title;
        modalDescription.textContent = description;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeVideoModal() {
        const modal = document.getElementById('videoModal');
        const modalVideo = document.getElementById('modalVideo');
        modalVideo.src = '';
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Form Submission
    const testimonyForm = document.getElementById('testimonyForm');
    if (testimonyForm) {
        testimonyForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for sharing your testimony! It has been submitted for review.');
            testimonyForm.reset();
        });
    }
    
    // Initialize
    renderVideoTestimonies();
    renderWrittenTestimonies();
    
    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const category = btn.getAttribute('data-filter');
            filterTestimonies(category);
        });
    });
    
    // Load more button
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', loadMoreTestimonies);
    }
    
    // Video modal close
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    const videoModal = document.getElementById('videoModal');
    
    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', closeVideoModal);
    }
    
    if (videoModal) {
        videoModal.addEventListener('click', (e) => {
            if (e.target === videoModal) closeVideoModal();
        });
    }
}


// ============================================
// FELLOWSHIP SECTION - TABBED INTERFACE
// ============================================

const fellowshipSection = document.querySelector('.fellowship-section');

if (fellowshipSection) {
    
    // Get all tab buttons and panels
    const fellowshipTabs = document.querySelectorAll('.fellowship-tab');
    const fellowshipPanels = document.querySelectorAll('.fellowship-panel');
    
    // Function to switch tabs
    function switchFellowshipTab(targetId) {
        // Remove active class from all tabs and hide all panels
        fellowshipTabs.forEach(tab => {
            tab.classList.remove('active');
            tab.setAttribute('aria-selected', 'false');
        });
        
        fellowshipPanels.forEach(panel => {
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
    
    // Add click event listeners to each tab
    if (fellowshipTabs.length) {
        fellowshipTabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                const targetId = tab.getAttribute('data-tab');
                switchFellowshipTab(targetId);
            });
        });
    }
    
    // Handle fellowship form submissions
    const fellowshipForms = document.querySelectorAll('.fellowship-form');
    if (fellowshipForms.length) {
        fellowshipForms.forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                alert('Thank you! We will get back to you shortly.');
                form.reset();
            });
        });
    }
    
    // Handle "Get Directions" links
    const directionLinks = document.querySelectorAll('.panel-link');
    if (directionLinks.length) {
        directionLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const locationItem = link.closest('.location-item');
                const locationName = locationItem?.querySelector('.location-name')?.textContent || 'Church Location';
                alert(`Opening directions for ${locationName} in Google Maps.`);
                // In production: window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(locationName)}`, '_blank');
            });
        });
    }
    
    // Handle platform cards (YouTube, Facebook, Church App)
    const platformCards = document.querySelectorAll('.platform-card');
    if (platformCards.length) {
        platformCards.forEach(card => {
            card.addEventListener('click', (e) => {
                e.preventDefault();
                const platform = card.querySelector('span')?.textContent || 'Platform';
                alert(`Opening ${platform} page.`);
                // In production, this would open actual URLs
            });
        });
    }
}

// ============================================
// NEWS PAGE FUNCTIONALITY - CLEAN VERSION
// ============================================

if (document.querySelector('.news-hero')) {
    
    // News Data
    const newsData = [
        { 
            id: 1, 
            title: "Annual Church Conference 2026 Announced", 
            category: "Announcement", 
            date: "April 15, 2026", 
            author: "Pastor John Mensah", 
            excerpt: "Join us for our annual church conference themed 'The Year of Supernatural Breakthrough' from June 10-14, 2026. Guest speakers from across the nation will minister.", 
            content: "Full conference details: The annual church conference will feature powerful worship sessions, teaching workshops, and evening revival services. Registration is now open online.", 
            image: "assets/images/pastor.png", 
            featured: true 
        },
        { 
            id: 2, 
            title: "Food Bank Outreach Feeds 500 Families", 
            category: "Outreach", 
            date: "April 10, 2026", 
            author: "Outreach Team", 
            excerpt: "Our monthly food bank distribution served over 500 families in the local community last Saturday.", 
            content: "Full outreach story: In partnership with local grocery stores, we distributed over 3,000 meals to families in need.", 
            image: "assets/images/resources.png", 
            featured: true 
        },
        { 
            id: 3, 
            title: "New Youth Wing Inauguration This Sunday", 
            category: "Church News", 
            date: "April 5, 2026", 
            author: "Youth Pastor David", 
            excerpt: "We are excited to announce the opening of our new youth wing, dedicated to empowering the next generation.", 
            content: "Full youth wing details: The new 5,000 sq ft youth facility includes a media center, game room, and prayer chapel.", 
            image: "assets/images/fellowship.png", 
            featured: true 
        },
        { 
            id: 4, 
            title: "Miracle Healing Service Testimonies", 
            category: "Testimonies", 
            date: "March 28, 2026", 
            author: "Prayer Team", 
            excerpt: "Over 50 people testified of divine healing during our monthly healing service.", 
            content: "Full testimony details: Remarkable testimonies of healing from cancer, restored mobility, and more.", 
            image: "assets/images/new.png", 
            featured: false 
        },
        { 
            id: 5, 
            title: "Partnership with Local Schools", 
            category: "Outreach", 
            date: "March 20, 2026", 
            author: "Pastor Michael", 
            excerpt: "Grace Abound Ministry partners with 10 local schools to provide educational support.", 
            content: "Full partnership details: The new program will place volunteers in local elementary schools.", 
            image: "assets/images/fellowshiping.png", 
            featured: false 
        },
        { 
            id: 6, 
            title: "Easter Convention Highlights", 
            category: "Events", 
            date: "March 15, 2026", 
            author: "Media Team", 
            excerpt: "Watch highlights from our powerful Easter convention that saw thousands in attendance.", 
            content: "Full convention highlights: Over 200 people gave their lives to Christ during the 3-day event.", 
            image: "assets/images/leadership.png", 
            featured: false 
        }
    ];
    
    let currentNews = [...newsData];
    let currentCategory = 'all';
    let currentSearch = '';
    let visibleCount = 3;
    
    // ========== RENDER HERO SECTION (with 3 side cards) ==========
    function renderHero() {
        const heroMain = document.getElementById('heroMain');
        const heroSide = document.getElementById('heroSide');
        
        if (!heroMain || !heroSide) {
            console.log('Hero elements not found');
            return;
        }
        
        // Get featured news
        const featuredNews = newsData.filter(n => n.featured === true);
        const mainFeatured = featuredNews[0];
        const sideFeatured = featuredNews.slice(1, 4);  // Get 3 side cards
        
        // Populate Main Hero (Left Column)
        if (mainFeatured) {
            heroMain.innerHTML = `
                <div class="hero-main-card" data-id="${mainFeatured.id}">
                    <img src="${mainFeatured.image}" alt="${mainFeatured.title}" onerror="this.src='assets/images/placeholder.jpg'">
                    <div class="hero-overlay">
                        <span class="hero-category">${mainFeatured.category}</span>
                        <h2>${mainFeatured.title}</h2>
                        <div class="hero-meta">
                            <span>${mainFeatured.date}</span>
                            <span>${mainFeatured.author}</span>
                        </div>
                        <p class="hero-excerpt">${mainFeatured.excerpt}</p>
                    </div>
                </div>
            `;
        }
        
        // Populate Side Hero (Right Column - 3 cards)
        if (sideFeatured.length > 0) {
            heroSide.innerHTML = sideFeatured.map(news => `
                <div class="hero-side-card" data-id="${news.id}">
                    <div class="side-image">
                        <img src="${news.image}" alt="${news.title}" onerror="this.src='assets/images/placeholder.jpg'">
                    </div>
                    <div class="side-content">
                        <span class="side-category">${news.category}</span>
                        <h3>${news.title}</h3>
                        <div class="side-date">
                            <img src="assets/icons/calendar.png" alt="Date" class="icon-calendar" onerror="this.style.display='none'">
                            <span>${news.date}</span>
                        </div>
                    </div>
                </div>
            `).join('');
        }
        
        // Add click handlers for hero cards
        document.querySelectorAll('.hero-main-card, .hero-side-card').forEach(card => {
            card.addEventListener('click', function(e) {
                const id = parseInt(this.getAttribute('data-id'));
                const news = newsData.find(n => n.id === id);
                if (news) openNewsModal(news);
            });
        });
        
        console.log('Hero rendered successfully with 3 side cards');
    }
    
    // ========== RENDER NEWS GRID ==========
    function renderNewsGrid() {
        const grid = document.getElementById('newsGrid');
        if (!grid) return;
        
        let filteredNews = [...newsData];
        
        if (currentCategory !== 'all') {
            filteredNews = filteredNews.filter(n => n.category.toLowerCase() === currentCategory);
        }
        
        if (currentSearch) {
            filteredNews = filteredNews.filter(n => 
                n.title.toLowerCase().includes(currentSearch.toLowerCase()) ||
                n.excerpt.toLowerCase().includes(currentSearch.toLowerCase())
            );
        }
        
        const displayNews = filteredNews.slice(0, visibleCount);
        
        if (displayNews.length === 0) {
            grid.innerHTML = '<div class="no-results" style="grid-column:1/-1; text-align:center; padding:40px;">No news articles found.</div>';
            const loadMoreContainer = document.getElementById('loadMoreContainer');
            if (loadMoreContainer) loadMoreContainer.style.display = 'none';
            return;
        }
        
        grid.innerHTML = displayNews.map(news => `
            <div class="news-card" data-id="${news.id}">
                <div class="news-image">
                    <img src="${news.image}" alt="${news.title}" onerror="this.src='assets/images/placeholder.jpg'">
                </div>
                <div class="news-content">
                    <span class="news-category">${news.category}</span>
                    <h3>${news.title}</h3>
                    <div class="news-meta">
                        <span>${news.date}</span>
                        <span>${news.author}</span>
                    </div>
                    <p class="news-excerpt">${news.excerpt}</p>
                </div>
            </div>
        `).join('');
        
        // Add click handlers for news cards
        document.querySelectorAll('.news-card').forEach(card => {
            card.addEventListener('click', () => {
                const id = parseInt(card.getAttribute('data-id'));
                const news = newsData.find(n => n.id === id);
                if (news) openNewsModal(news);
            });
        });
        
        // Show/hide load more button
        const loadMoreContainer = document.getElementById('loadMoreContainer');
        if (loadMoreContainer) {
            loadMoreContainer.style.display = visibleCount >= filteredNews.length ? 'none' : 'block';
        }
        
        console.log('Showing', displayNews.length, 'of', filteredNews.length, 'articles');
    }
    
    // ========== RENDER RECENT POSTS ==========
    function renderRecentPosts() {
        const container = document.getElementById('recentPostsList');
        if (!container) return;
        
        const recentPosts = [...newsData].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 4);
        
        container.innerHTML = recentPosts.map(post => `
            <div class="recent-post-item" data-id="${post.id}">
                <div class="recent-image">
                    <img src="${post.image}" alt="${post.title}" onerror="this.src='assets/images/placeholder.jpg'">
                </div>
                <div class="recent-content">
                    <h4>${post.title}</h4>
                    <div class="recent-date">${post.date}</div>
                </div>
            </div>
        `).join('');
        
        document.querySelectorAll('.recent-post-item').forEach(item => {
            item.addEventListener('click', () => {
                const id = parseInt(item.getAttribute('data-id'));
                const news = newsData.find(n => n.id === id);
                if (news) openNewsModal(news);
            });
        });
    }
    
    // ========== FILTER BY CATEGORY ==========
    function filterByCategory(category) {
        currentCategory = category;
        visibleCount = 3;
        renderNewsGrid();
    }
    
    // ========== SEARCH FUNCTION ==========
    function searchNews() {
        const searchInput = document.getElementById('searchInput');
        currentSearch = searchInput.value.trim();
        visibleCount = 3;
        renderNewsGrid();
    }
    
    // ========== LOAD MORE ==========
    function loadMoreNews() {
        visibleCount += 3;
        renderNewsGrid();
        console.log('Load more clicked. Now showing:', visibleCount, 'articles');
    }
    
    // ========== NEWS MODAL ==========
    function openNewsModal(news) {
        const modal = document.getElementById('newsModal');
        if (!modal) return;
        
        const modalImage = document.getElementById('modalImage');
        const modalCategory = document.getElementById('modalCategory');
        const modalTitle = document.getElementById('modalTitle');
        const modalDate = document.getElementById('modalDate');
        const modalAuthor = document.getElementById('modalAuthor');
        const modalContent = document.getElementById('modalContent');
        
        if (modalImage) modalImage.src = news.image;
        if (modalCategory) modalCategory.textContent = news.category;
        if (modalTitle) modalTitle.textContent = news.title;
        if (modalDate) modalDate.textContent = news.date;
        if (modalAuthor) modalAuthor.textContent = news.author;
        if (modalContent) modalContent.textContent = news.content;
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeNewsModal() {
        const modal = document.getElementById('newsModal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
    
    // ========== INITIALIZE ALL ==========
    function initNewsPage() {
        renderHero();
        renderNewsGrid();
        renderRecentPosts();
        
        // Category tabs
        document.querySelectorAll('.category-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                document.querySelectorAll('.category-tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                const category = tab.getAttribute('data-category');
                filterByCategory(category);
            });
        });
        
        // Search
        const searchBtn = document.getElementById('searchBtn');
        const searchInput = document.getElementById('searchInput');
        if (searchBtn) searchBtn.addEventListener('click', searchNews);
        if (searchInput) searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') searchNews();
        });
        
        // Load more
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', loadMoreNews);
            console.log('Load More button initialized');
        }
        
        // Modal close
        const modalCloseBtn = document.getElementById('modalCloseBtn');
        const newsModal = document.getElementById('newsModal');
        if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeNewsModal);
        if (newsModal) newsModal.addEventListener('click', (e) => {
            if (e.target === newsModal) closeNewsModal();
        });
        
        // Newsletter form
        const sidebarForm = document.getElementById('sidebarNewsletterForm');
        if (sidebarForm) {
            sidebarForm.addEventListener('submit', (e) => {
                e.preventDefault();
                alert('Thank you for subscribing to our newsletter!');
                sidebarForm.reset();
            });
        }
        
        console.log('News page initialized. Showing first', visibleCount, 'articles');
    }
    
    // Run initialization
    initNewsPage();
}

// ============================================
// DONATIONS PAGE - INTERACTIVITY
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const amountBtns = document.querySelectorAll('.amount-btn[data-amount]');
    const customAmountInput = document.getElementById('customAmount');
    const freqBtns = document.querySelectorAll('.freq-btn');
    const paymentBtns = document.querySelectorAll('.payment-btn');
    const cardDetails = document.getElementById('cardDetails');
    const bankDetails = document.getElementById('bankDetails');
    const donateBtn = document.getElementById('donateBtn');
    const summaryAmount = document.getElementById('summaryAmount');
    const summaryTotal = document.getElementById('summaryTotal');
    const summaryFrequency = document.getElementById('summaryFrequency');

    let selectedAmount = 50;
    let selectedFreq = 'one-time';

    // Update summary display
    function updateSummary() {
        summaryAmount.innerText = `£${selectedAmount}`;
        summaryTotal.innerText = `£${selectedAmount}`;
        const freqText = selectedFreq === 'one-time' ? 'One Time' : selectedFreq === 'monthly' ? 'Monthly' : 'Yearly';
        summaryFrequency.innerText = freqText;
    }

    // Amount button clicks
    amountBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            amountBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            selectedAmount = parseInt(btn.dataset.amount);
            if (customAmountInput) customAmountInput.value = '';
            updateSummary();
        });
    });

    // Custom amount input
    if (customAmountInput) {
        customAmountInput.addEventListener('input', (e) => {
            const val = parseInt(e.target.value);
            if (!isNaN(val) && val > 0) {
                selectedAmount = val;
                amountBtns.forEach(b => b.classList.remove('active'));
                updateSummary();
            }
        });
    }

    // Frequency buttons
    freqBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            freqBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            selectedFreq = btn.dataset.freq;
            updateSummary();
        });
    });

    // Payment method toggle
    paymentBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            paymentBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const method = btn.dataset.method;
            if (method === 'bank') {
                cardDetails.style.display = 'none';
                bankDetails.style.display = 'block';
            } else {
                cardDetails.style.display = 'block';
                bankDetails.style.display = 'none';
            }
        });
    });

    // Donation button click
    if (donateBtn) {
        donateBtn.addEventListener('click', (e) => {
            e.preventDefault();
            alert(`Thank you for your ${selectedFreq} donation of £${selectedAmount}! God bless you.`);
        });
    }

    // Mobile menu toggle
    const hamburger = document.getElementById('hamburgerBtn');
    const navMenu = document.getElementById('navMenu');
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => navMenu.classList.toggle('active'));
    }
});

}); // END OF DOMContentLoaded