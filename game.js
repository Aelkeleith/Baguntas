const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const particleSize = 20;
const particleTypes = ['👊', '🤚', '✌️'];

// Inisialisasi objek-objek
let particles = [];
for (let i = 0; i < 20; i++) {
  particles.push({
    x: Math.random() * (canvas.width - particleSize),
    y: Math.random() * (canvas.height - particleSize),
    type: particleTypes[Math.floor(Math.random() * particleTypes.length)]
  });
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
        particles[i].type = getWinnerType(particles[i].type, particles[j].type);
        particles.splice(j, 1);
        j--;
      }
    }
  }
}

// Fungsi untuk menentukan jenis objek yang menang
function getWinnerType(type1, type2) {
  // Kode logika untuk menentukan pemenang berdasarkan aturan yang Anda berikan
  // Misalnya, jika type1 adalah '👊' dan type2 adalah '✌️', maka type1 menang dan sebaliknya
  // Anda bisa mengatur logika seperti ini sesuai dengan aturan yang Anda tentukan
  // Sebagai contoh sederhana, saya akan mengatur pemenang secara acak di sini
  const randomWinner = Math.random() < 0.5 ? type1 : type2;
  return randomWinner;
}

// Fungsi utama permainan yang menggabungkan langkah-langkah permainan
function gameLoop() {
  checkCollisions();
  drawGame();
  requestAnimationFrame(gameLoop);
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
