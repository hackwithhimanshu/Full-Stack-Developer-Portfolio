const scrollIndicator = document.querySelector(".scroll-indicator");

window.addEventListener("scroll", () => {
    if (window.scrollY > 200) {
        scrollIndicator.classList.add("hide");
    } else {
        scrollIndicator.classList.remove("hide");
    }
});


const textElement = document.getElementById("typing-text");

const words = [
    "Full Stack Web Developer",
    "Python Backend Developer"
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {

    const currentWord = words[wordIndex];

    if (!deleting) {
        textElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;

        if (charIndex === currentWord.length) {
            deleting = true;
            setTimeout(typeEffect, 1500); // Pause after typing
            return;
        }

    } else {
        textElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;

        if (charIndex === 0) {
            deleting = false;
            wordIndex = (wordIndex + 1) % words.length;
        }
    }

    setTimeout(typeEffect, deleting ? 50 : 100);
}

typeEffect();


// ------------------------NEW------------------------------

