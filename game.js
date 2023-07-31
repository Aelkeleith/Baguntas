const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const particleSize = 20;
const particleTypes = ['👊', '🤚', '✌️'];
const maxParticlesPerType = 15;

// Inisialisasi objek-objek
let particles = [];
for (let i = 0; i < particleTypes.length; i++) {
  for (let j = 0; j < maxParticlesPerType; j++) {
    particles.push({
      x: Math.random() * (canvas.width - particleSize),
      y: Math.random() * (canvas.height - particleSize),
      type: particleTypes[i],
      speedX: Math.random() * 2 - 1, // Kecepatan horizontal acak
      speedY: Math.random() * 2 - 1, // Kecepatan vertikal acak
    });
  }
}

// Fungsi untuk mengecek dan menggabungkan objek yang bertabrakan
function checkCollisions() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      if (particles[i].x < particles[j].x + particleSize &&
          particles[i].x + particleSize > particles[j].x &&
          particles[i].y < particles[j].y + particleSize &&
          particles[i].y + particleSize > particles[j].y &&
          particles[i].type !== particles[j].type) {
        particles[j].type = getWinnerType(particles[i].type, particles[j].type);
      }
    }
  }
}

// Fungsi untuk menentukan jenis objek yang menang
function getWinnerType(type1, type2) {
  const typesOrder = ['👊', '🤚', '✌️'];
  const index1 = typesOrder.indexOf(type1);
  const index2 = typesOrder.indexOf(type2);

  if ((index1 + 1) % 3 === index2) {
    return type1; // Type1 (👊) menang
  } else if ((index2 + 1) % 3 === index1) {
    return type2; // Type2 (🤚) menang
  } else {
    return type1; // Kembalikan type1 jika hasil imbang
  }
}

// Fungsi utama permainan yang menggabungkan langkah-langkah permainan
function gameLoop() {
  checkCollisions();
  updatePositions();
  drawGame();
  requestAnimationFrame(gameLoop);
}

// Fungsi untuk mengupdate posisi objek
function updatePositions() {
  particles.forEach(particle => {
    particle.x += particle.speedX;
    particle.y += particle.speedY;

    // Batasi pergerakan objek agar tetap berada dalam area canvas
    if (particle.x < 0 || particle.x > canvas.width - particleSize) {
      particle.speedX *= -1;
    }
    if (particle.y < 0 || particle.y > canvas.height - particleSize) {
      particle.speedY *= -1;
    }
  });
}

// Fungsi untuk menggambar elemen permainan
function drawGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Gambar setiap objek
  particles.forEach(particle => {
    ctx.fillText(particle.type, particle.x, particle.y + particleSize);
  });
}

// Jalankan permainan
gameLoop();
