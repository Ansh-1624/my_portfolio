const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

let particles = [];
const particleCount = 70;
const connectDistance = 130;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function createParticles() {
  particles = [];
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
    });
  }
}

function updateParticles() {
  for (const p of particles) {
    p.x += p.vx;
    p.y += p.vy;

    if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
  }
}

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = 'rgba(215, 226, 234, 0.6)';
  for (const p of particles) {
    ctx.beginPath();
    ctx.arc(p.x, p.y, 1.8, 0, Math.PI * 2);
    ctx.fill();
  }

  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < connectDistance) {
        const opacity = 1 - dist / connectDistance;
        ctx.strokeStyle = `rgba(215, 226, 234, ${opacity * 0.3})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }
}

function animate() {
  updateParticles();
  drawParticles();
  requestAnimationFrame(animate);
}

resizeCanvas();
createParticles();
animate();

window.addEventListener('resize', () => {
  resizeCanvas();
  createParticles();
});
const avatar = document.getElementById('heroAvatar');
const padding = 100;
const strength = 4;

window.addEventListener('mousemove', (e) => {
  const rect = avatar.getBoundingClientRect();

  const distanceLeft = e.clientX - (rect.left - padding);
  const distanceRight = (rect.right + padding) - e.clientX;
  const distanceTop = e.clientY - (rect.top - padding);
  const distanceBottom = (rect.bottom + padding) - e.clientY;

  const isNear = distanceLeft >= 0 && distanceRight >= 0 && distanceTop >= 0 && distanceBottom >= 0;

  if (!isNear) {
    avatar.style.transition = 'transform 0.6s ease-in-out';
    avatar.style.transform = 'translate(0, 0)';
    return;
  }

  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  const offsetX = (e.clientX - centerX) / strength;
  const offsetY = (e.clientY - centerY) / strength;

  avatar.style.transition = 'transform 0.3s ease-out';
  avatar.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
});