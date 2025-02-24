document.addEventListener("DOMContentLoaded", function () {
    let slideIndex = 0;
    let notifIndex = 0;

    const slides = document.querySelector(".slides");
    const notifications = document.querySelector(".notifications");
    const eventBoxes = document.querySelectorAll(".event-box");
    const notifItems = document.querySelectorAll(".notification");

    const eventWidth = eventBoxes[0].offsetWidth + 20; // Box width + margin
    const notifWidth = notifItems[0].offsetWidth + 20; // Box width + margin

    function slideEvents() {
        slideIndex++;
        if (slideIndex >= eventBoxes.length) {
            slideIndex = 0;
            slides.style.transition = "none"; // Remove transition for instant reset
            slides.style.transform = "translateX(0)";
            setTimeout(() => {
                slides.style.transition = "transform 0.5s ease-in-out";
            }, 50);
        } else {
            slides.style.transform = `translateX(-${slideIndex * eventWidth}px)`;
        }
    }

    function slideNotifications() {
        notifIndex++;
        if (notifIndex >= notifItems.length) {
            notifIndex = 0;
            notifications.style.transition = "none"; // Remove transition for instant reset
            notifications.style.transform = "translateX(0)";
            setTimeout(() => {
                notifications.style.transition = "transform 0.5s ease-in-out";
            }, 50);
        } else {
            notifications.style.transform = `translateX(-${notifIndex * notifWidth}px)`;
        }
    }

    setInterval(slideEvents, 3000);
    setInterval(slideNotifications, 5000);
});
