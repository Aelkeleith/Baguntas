// A function to generate random particles
function generateParticles(count, particleTypes) {
    const particles = [];
    for (let i = 0; i < count; i++) {
        const randomIndex = Math.floor(Math.random() * particleTypes.length);
        const particle = particleTypes[randomIndex];
        particles.push(particle);
    }
    return particles;
}

// A function to apply the collision rules
function applyCollisionRules(particles) {
    const newParticles = particles.map((particle, index) => {
        const nextIndex = (index + 1) % particles.length;
        const nextParticle = particles[nextIndex];
        
        if (particle === "👊" && nextParticle === "✌️") {
            return "👊";
        } else if (particle === "✌️" && nextParticle === "🤚") {
            return "✌️";
        } else if (particle === "🤚" && nextParticle
