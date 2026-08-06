document.addEventListener("DOMContentLoaded", function() {

    // --- Contact Form Submission ---
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const btnText = document.getElementById('btnText');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent the default page reload

            // Change button text to show it's working
            const originalText = btnText.innerText;
            btnText.innerText = "Sending...";
            submitBtn.style.opacity = "0.7";
            submitBtn.disabled = true;

            // Gather all the form data
            const formData = new FormData(contactForm);

            // Send data to Web3Forms
            fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            })
            .then(async (response) => {
                let json = await response.json();
                if (response.status == 200) {
                    // Success!
                    btnText.innerText = "Message Sent!";
                    submitBtn.style.backgroundColor = "#27c93f"; // Turn button green
                    contactForm.reset(); // Clear the form

                    // Reset button after 3 seconds
                    setTimeout(() => {
                        btnText.innerText = originalText;
                        submitBtn.style.backgroundColor = "";
                        submitBtn.style.opacity = "1";
                        submitBtn.disabled = false;
                    }, 3000);
                } else {
                    // Error from API
                    console.log(response);
                    btnText.innerText = "Error sending";
                    submitBtn.style.backgroundColor = "#ff5f56"; // Turn button red
                }
            })
            .catch(error => {
                console.log(error);
                btnText.innerText = "Something went wrong";
            });
        });
    }

    // --- Scroll Progress Bar Logic ---
    const progressBar = document.getElementById('progressBar');

    window.addEventListener('scroll', function() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight;
        const winHeight = window.innerHeight;
        const scrollPercent = (scrollTop / (docHeight - winHeight)) * 100;

        // Ensure width stays accurate
        if (progressBar) {
            progressBar.style.width = scrollPercent + '%';
        }
    });

    // --- Intersection Observer for Rise Up Animations ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Triggers when 15% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add the visible class to trigger the CSS transition
                entry.target.classList.add('visible');
                // Stop observing once animated so it doesn't repeat backwards
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Grab all elements with the scroll-anim class and observe them
    const animElements = document.querySelectorAll('.scroll-anim');
    animElements.forEach(el => observer.observe(el));
});



// --- Scroll to Top Button Logic ---
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');

    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

// --- Typewriter Effect ---
    const typewriterElement = document.getElementById('typewriter');
    const cursorElement = document.querySelector('.cursor');

    // The words you want to loop through
    const words = ["Full Stack Developer", "Backend Developer"];

    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    // Timing controls (in milliseconds)
    const typingSpeed = 100;
    const deletingSpeed = 50;
    const delayBetweenWords = 2000; // How long to pause when a word is fully typed

    function typeEffect() {
        const currentWord = words[wordIndex];

        if (isDeleting) {
            // Remove a character
            typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            // Add a character
            typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        // Add class to stop cursor blinking while moving
        cursorElement.classList.add('typing');

        // Determine the next typing speed
        let timer = isDeleting ? deletingSpeed : typingSpeed;

        // If word is completely typed out
        if (!isDeleting && charIndex === currentWord.length) {
            timer = delayBetweenWords; // Pause at the end
            isDeleting = true;
            cursorElement.classList.remove('typing'); // Let cursor blink while paused
        }
        // If word is completely deleted
        else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length; // Move to the next word
            timer = 500; // Short pause before starting new word
            cursorElement.classList.remove('typing');
        }

        setTimeout(typeEffect, timer);
    }

    // Start the typewriter effect after the "rise up" animation finishes
    if (typewriterElement) {
        setTimeout(typeEffect, 1200);
    }
