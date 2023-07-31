const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const particleSize = 20;
const particleTypes = ['👊', '🤚', '✌️'];

// Inisialisasi objek-objek
let particles = [];
for (let i = 0; i < 60; i++) {
  particles.push({
    x: Math.random() * (canvas.width - particleSize),
    y: Math.random() * (canvas.height - particleSize),
    type: particleTypes[Math.floor(Math.random() * particleTypes.length)],
    speedX: Math.random() * 2 - 1, // Kecepatan horizontal acak
    speedY: Math.random() * 2 - 1, // Kecepatan vertikal acak
  });
}

// Fungsi untuk mengecek dan menggabungkan objek yang bertabrakan
function checkCollisions() {
  // ...
  // Kode untuk mengecek dan menggabungkan objek-objek yang sama seperti sebelumnya
  // ...
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
