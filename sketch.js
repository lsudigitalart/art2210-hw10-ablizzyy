let particles = []; // Array to store all the particles

function setup() {
  createCanvas(800, 600);

  // Generate 100 particles
  for (let i = 0; i < 100; i++) {
    particles.push(new Particle(random(width), random(height)));
  }
}

function draw() {
  background(30); // Dark background for better visibility

  // Update and display each particle
  for (let particle of particles) {
    particle.update();
    particle.display();
  }
}

class Particle {
  constructor(x, y) {
    this.x = x; // Initial x position
    this.y = y; // Initial y position
    this.size = random(5, 15); // Random size for the particle
    this.color = color(random(100, 255), random(100, 255), random(100, 255)); // Random color
    this.vx = random(-2, 2); // Random x velocity
    this.vy = random(-2, 2); // Random y velocity
  }

  update() {
    // Move the particle
    this.x += this.vx;
    this.y += this.vy;

    // Bounce off the edges
    if (this.x <= 0 || this.x >= width) {
      this.vx *= -1;
    }
    if (this.y <= 0 || this.y >= height) {
      this.vy *= -1;
    }

    // Mouse interaction: particles move toward the mouse
    if (mouseIsPressed) {
      let dx = mouseX - this.x;
      let dy = mouseY - this.y;
      let distance = sqrt(dx * dx + dy * dy);
      if (distance > 5) {
        this.vx += dx * 0.02;
        this.vy += dy * 0.02;
      }
    }

    // Keyboard interaction: add velocity based on arrow keys
    if (keyIsDown(LEFT_ARROW)) {
      this.vx -= 0.1;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      this.vx += 0.1;
    }
    if (keyIsDown(UP_ARROW)) {
      this.vy -= 0.1;
    }
    if (keyIsDown(DOWN_ARROW)) {
      this.vy += 0.1;
    }
  }

  display() {
    // Draw the particle
    noStroke();
    fill(this.color);
    ellipse(this.x, this.y, this.size, this.size);
  }
}

