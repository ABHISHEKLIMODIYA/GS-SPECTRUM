document.addEventListener("DOMContentLoaded", function () {
    setupThemeToggle();
    startSlider();
    startCountdown("2025-03-10T18:00:00");
});

// EVENT SLIDER - FIXED
let currentIndex = 0;
let slides = [];

function startSlider() {
    slides = document.querySelectorAll(".slides img");
    
    if (slides.length === 0) return; // Prevents errors if no images are found
    
    slides[currentIndex].classList.add("active");
    
    setInterval(() => {
        nextSlide();
    }, 3000);
}

function nextSlide() {
    if (slides.length === 0) return; // Prevents errors if no images are found

    slides[currentIndex].classList.remove("active");
    currentIndex = (currentIndex + 1) % slides.length;
    slides[currentIndex].classList.add("active");
}

function prevSlide() {
    if (slides.length === 0) return;

    slides[currentIndex].classList.remove("active");
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    slides[currentIndex].classList.add("active");
}

// DARK MODE TOGGLE - FIXED
function setupThemeToggle() {
    const themeToggleBtn = document.getElementById("themeToggle");
    if (!themeToggleBtn) return; // Prevents errors if button not found

    themeToggleBtn.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");
        localStorage.setItem("theme", document.body.classList.contains("dark-mode") ? "dark" : "light");
    });

    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");
    }
}

// EVENT COUNTDOWN TIMER - FIXED
function startCountdown(eventDate) {
    let countDownDate = new Date(eventDate).getTime();
    
    setInterval(() => {
        let now = new Date().getTime();
        let distance = countDownDate - now;

        if (distance < 0) {
            document.getElementById("countdownTimer").innerHTML = "Event Started!";
            return;
        }

        let days = Math.floor(distance / (1000 * 60 * 60 * 24));
        let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("countdownTimer").innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }, 1000);
}
