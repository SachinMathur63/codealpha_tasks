document.addEventListener('DOMContentLoaded', () => {

    // --- Navigation Menu (Hamburger) ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('nav-active');
        hamburger.classList.toggle('toggle');
    });

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-links li a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('nav-active')) {
                navLinks.classList.remove('nav-active');
                hamburger.classList.remove('toggle');
            }
        });
    });

    // --- Header Background on Scroll ---
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- Active Link Highlighting on Scroll ---
    const sections = document.querySelectorAll('section');
    const navLi = document.querySelectorAll('nav .nav-links li a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });

        navLi.forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href') === `#${current}`) {
                a.classList.add('active');
            }
        });
    });

    // --- Scroll-triggered Animations ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.content-section').forEach(section => {
        observer.observe(section);
    });
    
    // --- Typing Effect in Hero Section ---
    const typingText = document.querySelector('.typing-effect');
    const words = ["Web Developer", "UI/UX Designer", "Creative Thinker"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentWord = words[wordIndex];
        const currentChar = isDeleting ?
            currentWord.substring(0, charIndex - 1) :
            currentWord.substring(0, charIndex + 1);

        typingText.textContent = currentChar;

        if (!isDeleting && charIndex < currentWord.length) {
            charIndex++;
            setTimeout(type, 150);
        } else if (isDeleting && charIndex > 0) {
            charIndex--;
            setTimeout(type, 100);
        } else {
            isDeleting = !isDeleting;
            if (!isDeleting) {
                wordIndex = (wordIndex + 1) % words.length;
            }
            setTimeout(type, 1200);
        }
    }

    type();
});