const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');

// Make the canvas fit the entire screen
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Create particle template
class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height - canvas.height; // Start above/on screen
        this.size = Math.random() * 3 + 1; // Random size (1px to 4px)
        this.speedY = Math.random() * 1.5 + 0.5; // Downward speed
        this.speedX = Math.random() * 0.5 - 0.25; // Gentle side-to-side drift
        this.opacity = Math.random() * 0.5 + 0.3; // Slight transparency
    }

    update() {
        this.y += this.speedY;
        this.x += this.speedX;

        // Reset particle to the top if it falls off screen
        if (this.y > canvas.height) {
            this.y = 0;
            this.x = Math.random() * canvas.width;
        }
    }

    draw() {
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`; // White particles
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Generate an array of 80 particles
const particlesArray = [];
for (let i = 0; i < 80; i++) {
    particlesArray.push(new Particle());
}

// Animation loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particlesArray.forEach(particle => {
        particle.update();
        particle.draw();
    });

    requestAnimationFrame(animate);
}

animate();
