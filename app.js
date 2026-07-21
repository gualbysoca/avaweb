document.addEventListener('DOMContentLoaded', () => {
    // i18n Logic
    const savedLang = localStorage.getItem('ava_lang') || 'es';
    let currentLang = savedLang;

    const setLanguage = (lang) => {
        if (!translations[lang]) return;
        currentLang = lang;
        localStorage.setItem('ava_lang', lang);

        document.documentElement.lang = lang;

        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang][key]) {
                // If it's a placeholder (for inputs), else text content
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    el.placeholder = translations[lang][key];
                } else {
                    el.textContent = translations[lang][key];
                }
            }
        });

        // Update active class on selectors
        document.querySelectorAll('.lang-btn').forEach(btn => {
            if (btn.dataset.lang === lang) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    };

    // Attach to language buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            setLanguage(btn.dataset.lang);
        });
    });

    // Initialize Language
    if (typeof translations !== 'undefined') {
        setLanguage(currentLang);
    }

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Navigation (Hamburger)
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (navLinks.classList.contains('active') && !navLinks.contains(e.target) && !hamburger.contains(e.target)) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    }

    // Reveal elements on scroll
    const revealElements = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const revealPoint = 150;

        revealElements.forEach((element) => {
            const revealTop = element.getBoundingClientRect().top;

            if (revealTop < windowHeight - revealPoint) {
                element.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    
    // Trigger once on load
    revealOnScroll();

    // Carousel Logic
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.dot');
    let currentSlideIndex = 0;
    let carouselInterval;

    const showSlide = (index) => {
        if (slides.length === 0) return;
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        slides[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlideIndex = index;
    };

    const nextSlide = () => {
        let nextIndex = (currentSlideIndex + 1) % slides.length;
        showSlide(nextIndex);
    };

    const startCarousel = () => {
        carouselInterval = setInterval(nextSlide, 5000); // Cambia cada 5 segundos
    };

    const resetCarousel = () => {
        clearInterval(carouselInterval);
        startCarousel();
    };

    // Attach click events to dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            resetCarousel();
        });
    });

    // Touch Swipe Logic for Carousel
    const carouselContainer = document.querySelector('.hero-carousel-container');
    if (carouselContainer) {
        let touchStartX = 0;
        let touchEndX = 0;

        carouselContainer.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        carouselContainer.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });

        const handleSwipe = () => {
            const swipeThreshold = 50;
            if (touchStartX - touchEndX > swipeThreshold) {
                // Swiped left, go to next
                nextSlide();
                resetCarousel();
            } else if (touchEndX - touchStartX > swipeThreshold) {
                // Swiped right, go to prev
                let prevIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
                showSlide(prevIndex);
                resetCarousel();
            }
        };
    }

    if (slides.length > 0) {
        startCarousel();
    }

    // Lightbox Logic for Camp Poster
    const campPoster = document.querySelector('.camp-poster');
    if (campPoster) {
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox-overlay';
        
        const lightboxImg = document.createElement('img');
        lightboxImg.className = 'lightbox-img';
        
        const closeBtn = document.createElement('div');
        closeBtn.className = 'lightbox-close';
        closeBtn.innerHTML = '&times;';

        lightbox.appendChild(lightboxImg);
        lightbox.appendChild(closeBtn);
        document.body.appendChild(lightbox);

        campPoster.style.cursor = 'pointer';

        campPoster.addEventListener('click', () => {
            lightboxImg.src = campPoster.src;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });

        const closeLightbox = () => {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        };

        lightbox.addEventListener('click', (e) => {
            if (e.target !== lightboxImg) {
                closeLightbox();
            }
        });
    }

    // Product Gallery Thumbnail Switcher (Supports multiple galleries)
    document.querySelectorAll('.product-gallery').forEach(gallery => {
        const mainImg = gallery.querySelector('.product-main-image img');
        const thumbBtns = gallery.querySelectorAll('.thumb-btn');
        if (mainImg && thumbBtns.length > 0) {
            thumbBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    thumbBtns.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    const newSrc = btn.getAttribute('data-img');
                    if (newSrc) {
                        mainImg.style.opacity = '0';
                        setTimeout(() => {
                            mainImg.src = newSrc;
                            mainImg.alt = btn.querySelector('span')?.textContent || mainImg.alt;
                            mainImg.style.opacity = '1';
                        }, 150);
                    }
                });
            });
        }
    });
});


