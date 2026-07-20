const canvas = document.getElementById('cosmic-canvas');
const ctx = canvas.getContext('2d');
const cardText = document.getElementById('card-text');

let scaleFactor = 1;
function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    scaleFactor = Math.min(canvas.width, canvas.height) * 0.014;
}
window.addEventListener('resize', resize);
resize();

const heartParticleCount = 10000; 
const bgStarCount = 150;
const heartParticles = [];
const backgroundStars = [];
let mode = 'explode';

function getHeartPoint(t) {
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y = -(13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t));
    return { x: x * scaleFactor, y: y * scaleFactor };
}

for (let i = 0; i < bgStarCount; i++) {
    backgroundStars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5,
        alpha: Math.random() * 0.7 + 0.3,
        blink: Math.random() * 0.02 + 0.005
    });
}

const centerX = canvas.width / 2;
const centerY = canvas.height * 0.42;

for (let i = 0; i < heartParticleCount; i++) {
    const t = Math.random() * Math.PI * 2;
    const heartTarget = getHeartPoint(t);
    
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 18 + 2; 

    const isOutline = Math.random() > 0.45;
    let color;

    if (isOutline) {
        const fire = ['rgba(255,59,0,', 'rgba(255,122,0,', 'rgba(255,180,0,', 'rgba(255,255,255,'];
        color = fire[Math.floor(Math.random() * fire.length)];
    } else {
        const blues = ['rgba(0,85,255,', 'rgba(0,191,255,', 'rgba(0,242,254,', 'rgba(30,144,255,'];
        color = blues[Math.floor(Math.random() * blues.length)];
    }

    const internalDist = isOutline ? (Math.random() * 0.12 + 0.9) : (Math.random() * 0.95);
    const baseAlpha = Math.random() * 0.4 + 0.3;

    heartParticles.push({
        x: centerX,
        y: centerY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        tx: (heartTarget.x * internalDist) + centerX,
        ty: (heartTarget.y * internalDist) + centerY,
        origTx: (heartTarget.x * internalDist) + centerX,
        origTy: (heartTarget.y * internalDist) + centerY,
        size: isOutline ? (Math.random() * 1.4 + 0.8) : (Math.random() * 1.1 + 0.4),
        baseColor: color,
        alpha: baseAlpha,
        wobble: Math.random() * 100,
        wobbleSpeed: Math.random() * 0.05 + 0.01
    });
}

const touch = { x: null, y: null, radius: 55 };
function handleMove(x, y) { touch.x = x; touch.y = y; }
function handleEnd() { touch.x = null; touch.y = null; }

window.addEventListener('mousemove', (e) => handleMove(e.clientX, e.clientY));
window.addEventListener('touchmove', (e) => handleMove(e.touches.clientX, e.touches.clientY));
window.addEventListener('mouseleave', handleEnd);
window.addEventListener('touchend', handleEnd);

setTimeout(() => { mode = 'heart'; }, 900); 
setTimeout(() => { cardText.classList.add('show'); }, 4000);

let centralStarPulse = 0;

function animate() {
    ctx.fillStyle = 'rgba(1, 1, 4, 0.09)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    backgroundStars.forEach(star => {
        star.alpha += star.blink;
        if (star.alpha > 1 || star.alpha < 0.2) star.blink = -star.blink;
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.abs(star.alpha)})`;
        ctx.fillRect(star.x, star.y, star.size, star.size);
    });

    ctx.globalCompositeOperation = 'screen';

    if (mode === 'heart') {
        centralStarPulse += 0.04;
        const starSize = 5 + Math.sin(centralStarPulse) * 1.5;
        ctx.save();
        ctx.shadowBlur = 30;
        ctx.shadowColor = '#00bfff';
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(centerX, centerY, starSize, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }

    heartParticles.forEach(p => {
        p.wobble += p.wobbleSpeed;

        if (mode === 'explode') {
            p.x += p.vx;
            p.y += p.vy;
            p.vx *= 0.93;
            p.vy *= 0.93;
        } else if (mode === 'heart') {
            const wave = Math.sin(p.wobble) * 5;
            const targetX = p.origTx + Math.cos(p.wobble) * wave * 0.5;
            const targetY = p.origTy + Math.sin(p.wobble) * wave * 0.5;

            if (touch.x !== null && touch.y !== null) {
                const dx = p.x - touch.x;
                const dy = p.y - touch.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < touch.radius) {
                    const force = (touch.radius - dist) / touch.radius;
                    p.x += (dx / dist) * force * 8;
                    p.y += (dy / dist) * force * 8;
                }
            }

            p.x += (targetX - p.x) * 0.035;
            p.y += (targetY - p.y) * 0.035;
        }

        ctx.fillStyle = p.baseColor + p.alpha + ')';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
    });

    ctx.globalCompositeOperation = 'source-over';
    requestAnimationFrame(animate);
}

animate();
