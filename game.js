var particles = [];
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

function createParticle() {
  var particle = {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    type: Math.random() * 3,
  };
  particles.push(particle);
}

function collide(particle1, particle2) {
  if (particle1.type == particle2.type) {
    return null;
  } else {
    return particle1.type;
  }
}

function update() {
  var newParticles = [];
  for (var i = 0; i < particles.length; i++) {
    var particle = particles[i];
    var x = particle.x;
    var y = particle.y;
    var type = particle.type;

    particle.x += Math.random() * 0.1;
    particle.y += Math.random() * 0.1;

    if (particle.x < 0 || particle.x > canvas.width) {
      particle.x = 0;
    }
    if (particle.y < 0 || particle.y > canvas.height) {
      particle.y = 0;
    }

    var collision = collide(particles[i], particles[(i + 1) % particles.length]);
    if (collision !== null) {
      particle.type = collision;
    }

    newParticles.push(particle);
  }
  particles = newParticles;
}

window.addEventListener("keydown", function(event) {
  if (event.keyCode == 32) {
    createParticle();
  }
});

setInterval(update, 100);

for (var i = 0; i < 15; i++) {
  createParticle();
}
