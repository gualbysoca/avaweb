document.addEventListener('DOMContentLoaded', () => {
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

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

    if (slides.length > 0) {
        startCarousel();
    }
});
