const yesButton = document.getElementById("yesButton");
const noButton = document.getElementById("noButton");
const welcomeMessage = document.getElementById("welcomeMessage");
const container = document.querySelector(".container");
const fireworksDiv = document.getElementById("fireworks");

// Display welcome message and hide after 3 seconds
document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        welcomeMessage.classList.add("hidden");
        container.classList.remove("hidden");
    }, 3000);
});

// Handle fireworks display when "Yes" is clicked
function showFireworks() {
    container.classList.add("hidden");
    fireworksDiv.classList.remove("hidden");

    const canvas = document.getElementById("fireworksCanvas");
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];

    function createParticle(x, y) {
        const particleCount = 100;
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: x,
                y: y,
                radius: Math.random() * 4,
                color: `hsl(${Math.random() * 360}, 100%, 50%)`,
                speedX: (Math.random() - 0.5) * 10,
                speedY: (Math.random() - 0.5) * 10,
                alpha: 1,
            });
        }
    }

    function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach((particle, index) => {
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            particle.alpha -= 0.02;

            if (particle.alpha <= 0) {
                particles.splice(index, 1);
            } else {
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2, false);
                ctx.fillStyle = `rgba(${particle.color}, ${particle.alpha})`;
                ctx.fill();
            }
        });

        if (particles.length > 0) {
            requestAnimationFrame(drawParticles);
        }
    }

    createParticle(canvas.width / 2, canvas.height / 2);
    drawParticles();
}

// Move the "No" button when hovered
function moveNoButton() {
    const randomX = Math.random() * (window.innerWidth - noButton.offsetWidth);
    const randomY = Math.random() * (window.innerHeight - noButton.offsetHeight);

    noButton.style.left = `${randomX}px`;
    noButton.style.top = `${randomY}px`;
}