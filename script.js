const canvas = document.getElementById('cosmic-canvas');
const ctx = canvas.getContext('2d');
const cardText = document.getElementById('card-text');

let scaleFactor = 1;
function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    scaleFactor = Math.min(canvas.width, canvas.height) * 0.015;
}
window.addEventListener('resize', resize);
resize();

const heartParticles = [];
const backgroundStars = [];
const heartParticleCount = 2500; // Огромное количество частиц для эффекта плотного газа!
const bgStarCount = 200;         // Количество звезд на фоне
let mode = 'explode';

function getHeartPoint(t) {
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y = -(13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t));
    return { x: x * scaleFactor, y: y * scaleFactor };
}

// 1. Создание фонового космоса (звезды разного размера и яркости)
for (let i = 0; i < bgStarCount; i++) {
    backgroundStars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.8,
        alpha: Math.random() * 0.7 + 0.3,
        blinkSpeed: Math.random() * 0.02 + 0.005,
        wobble: Math.random() * 10
    });
}

// 2. Создание мега-облака частиц для сердца
const centerX = canvas.width / 2;
const centerY = canvas.height * 0.42;

for (let i = 0; i < heartParticleCount; i++) {
    const t = (i / heartParticleCount) * Math.PI * 2;
    const heartTarget = getHeartPoint(t);
    
    const angle = Math.random() * Math.PI * 2;
    // Радиус взрыва: сильный разброс скоростей создает космическую пыль вокруг контура
    const speed = Math.random() * 18 + 2; 

    const isOutline = Math.random() > 0.5;
    let color, size;

    if (isOutline) {
        // Огненная корона по краям (как на референсе)
        const fireColors = ['#ff3b00', '#ff6a00', '#ff9500', '#ffcc00', '#ffffff'];
        color = fireColors[Math.floor(Math.random() * fireColors.length)];
        size = Math.random() * 1.5 + 1.2;
    } else {
        // Внутреннее синее облако газа
        const spaceBlues = ['#0055ff', '#00bfff', '#00f2fe', '#1e90ff', '#4169e1', '#0a0a3a'];
        color = spaceBlues[Math.floor(Math.random() * spaceBlues.length)];
        size = Math.random() * 1.2 + 0.5;
    }

    // Заполнение внутреннего пространства сердца туманностью
    const internalDist = isOutline ? (Math.random() * 0.15 + 0.9) : (Math.random() * 0.9);

    heartParticles.push({
        x: centerX,
        y: centerY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        tx: (heartTarget.x * internalDist) + centerX,
        ty: (heartTarget.y * internalDist) + centerY,
        origTx: (heartTarget.x * internalDist) + centerX,
        origTy: (heartTarget.y * internalDist) + centerY,
        size: size,
        color: color,
        alpha: Math.random() * 0.6 + 0.4,
        wobble: Math.random() * 100,
        wobbleSpeed: Math.random() * 0.05 + 0.01
    });
}

// Интерактив для экранов смартфонов
const touch = { x: null, y: null, radius: 50 };
function handleMove(x, y) { touch.x = x; touch.y = y; }
function handleEnd() { touch.x = null; touch.y = null; }

window.addEventListener('mousemove', (e) => handleMove(e.clientX, e.clientY));
window.addEventListener('touchmove', (e) => handleMove(e.touches.clientX, e.touches.clientY));
window.addEventListener('mouseleave', handleEnd);
window.addEventListener('touchend', handleEnd);

// Тайминги переключения
setTimeout(() => { mode = 'heart'; }, 900); // Быстрый взрыв, переходящий в сборку
setTimeout(() => { cardText.classList.add('show'); }, 4000);

let centralStarPulse = 0;

function animate() {
    // Очень медленное затирание кадров оставляет густые неоновые хвосты-галактики
    ctx.fillStyle = 'rgba(1, 1, 3, 0.08)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Рисуем далекий звездный космос на фоне
    backgroundStars.forEach(star => {
        star.alpha += star.blinkSpeed;
        if (star.alpha > 1 || star.alpha < 0.2) star.blinkSpeed = -star.blinkSpeed;
        
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.abs(star.alpha)})`;
        // Легкое космическое смещение звезд для эффекта живого неба
        const shiftX = Math.sin(star.wobble) * 0.3;
        ctx.fillRect(star.x + shiftX, star.y, star.size, star.size);
        star.wobble += 0.005;
    });

    // Режим наложения 'screen' заставляет мириады частиц светиться при пересечении друг с другом
    ctx.globalCompositeOperation = 'screen';

    // Яркое космическое ядро в самом центре сердца
    if (mode === 'heart') {
        centralStarPulse += 0.04;
        const starSize = 5 + Math.sin(centralStarPulse) * 1.5;
        
        ctx.save();
        ctx.shadowBlur = 40;
        ctx.shadowColor = '#00bfff';
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(centerX, centerY, starSize, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }

    // Физика и отрисовка 2500 частиц сердца
    heartParticles.forEach(p => {
        p.wobble += p.wobbleSpeed;

        if (mode === 'explode') {
            p.x += p.vx;
            p.y += p.vy;
            p.vx *= 0.93;
            p.vy *= 0.93;
        } else if (mode === 'heart') {
            // Космическое колыхание газа туманности
            const wave = Math.sin(p.wobble) * 5;
            const targetX = p.origTx + Math.cos(p.wobble) * wave * 0.6;
            const targetY = p.origTy + Math.sin(p.wobble) * wave * 0.6;

            // Магнитное расталкивание пальцем
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

        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
    });

    // Возвращаем стандартный режим смешивания для стабильной отрисовки интерфейса поверх
    ctx.globalCompositeOperation = 'source-over';
    ctx.globalAlpha = 1;

    requestAnimationFrame(animate);
}

animate();
