// ==========================================
// НАСТРОЙКИ КОСМОСA — НАСТРАИВАЙТЕ ЗДЕСЬ!
// ==========================================
const heartParticleCount = 12000; // КОЛИЧЕСТВО ЧАСТИЦ СЕРДЦА
const bgStarCount = 150;         // Количество фоновых звезд неба
const strayCount = 200;          // Сколько искр полностью улетит за экран при взрыве

// Твоя строка кода оставлена строго в исходном виде:
const qrBase64Data = "ВСТАВЬТЕ_СЮДА_ВАШУ_СТРОКУ_BASE64";

// ==========================================
// ЛОГИКА САЙТА (ПОЛНОСТЬЮ ИСПРАВЛЕНА И ВЫВЕРЕНА)
// ==========================================
const canvas = document.getElementById("cosmic-canvas");
const ctx = canvas.getContext("2d");
const cardText = document.getElementById("card-text");
const qrBtn = document.getElementById("qr-btn");
const textContainer = document.getElementById("final-text-container");

const hasValidQR = qrBase64Data && qrBase64Data.startsWith("data:image");

const qrImage = new Image();
if (hasValidQR) {
    qrImage.src = qrBase64Data;
}

let scaleFactor = 1;
function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    scaleFactor = Math.min(canvas.width, canvas.height) * 0.0145;
}
window.addEventListener("resize", resize);
resize();

const heartParticles = [];
const backgroundStars = [];
let mode = "supernova"; 
let globalTime = 0;
let qrPositions = []; 

const phrase = "Получай свой подарочек :)";

// Нарезаем фразу на отдельные spans для красивого проявления
phrase.split("").forEach(char => {
    const span = document.createElement("span");
    span.textContent = char === " " ? "\u00A0" : char;
    textContainer.appendChild(span);
});

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

const supernovaColors = [
    "rgba(0, 242, 254, ", "rgba(255, 0, 128, ", "rgba(0, 255, 133, ", 
    "rgba(255, 102, 0, ", "rgba(157, 78, 221, ", "rgba(255, 255, 255, "
];

for (let i = 0; i < heartParticleCount; i++) {
    const t = Math.random() * Math.PI * 2;
    const heartTarget = getHeartPoint(t);
    
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 24 + 4; 

    const isOutline = Math.random() > 0.45;
    let finalColor;

    if (isOutline) {
        const fire = ["rgba(255,50,0,", "rgba(255,122,0,", "rgba(255,180,0,", "rgba(255,255,255,"];
        finalColor = fire[Math.floor(Math.random() * fire.length)];
    } else {
        const blues = ["rgba(0,70,255,", "rgba(0,180,255,", "rgba(0,240,255,", "rgba(30,130,255,"];
        finalColor = blues[Math.floor(Math.random() * blues.length)];
    }

    const outlineSpread = (Math.random() - 0.5) * 0.12; 
    const internalDist = isOutline ? (1.0 + outlineSpread) : Math.random() * 0.95;

    heartParticles.push({
        x: centerX,
        y: centerY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        tx: (heartTarget.x * internalDist) + centerX,
        ty: (heartTarget.y * internalDist) + centerY,
        origTx: (heartTarget.x * internalDist) + centerX,
        origTy: (heartTarget.y * internalDist) + centerY,
        qrx: centerX, 
        qry: centerY, 
        size: isOutline ? (Math.random() * 1.1 + 0.6) : (Math.random() * 0.8 + 0.3), 
        supernovaColor: supernovaColors[Math.floor(Math.random() * supernovaColors.length)],
        heartColor: finalColor,
        alpha: Math.random() * 0.5 + 0.3,
        wobble: Math.random() * 100,
        wobbleSpeed: Math.random() * 0.04 + 0.01,
        isStray: i < strayCount,
        dx: (Math.random() - 0.5) * (Math.random() * 12 + 6), 
        dy: (Math.random() - 0.5) * (Math.random() * 12 + 6),
        
        orbitRadius: Math.random() * (canvas.width * 0.4) + 10,
        orbitAngle: Math.random() * Math.PI * 2,
        orbitSpeed: Math.random() * 0.06 + 0.03,
        
        burstProgress: 0,
        burstSpeed: Math.random() * 0.04 + 0.03,
        
        strayVx: Math.cos(angle) * (Math.random() * 25 + 20), 
        strayVy: Math.sin(angle) * (Math.random() * 25 + 20),

        vortexAngleX: Math.random() * Math.PI * 2,
        vortexAngleY: Math.random() * Math.PI * 2,
        vortexSpeedX: (Math.random() - 0.5) * 0.15,
        vortexSpeedY: (Math.random() - 0.5) * 0.15,
        vortexRadius: Math.random() * 90 + 30 
    });
}

let qrOffsetX = 0, qrOffsetY = 0, qrTotalSizeOnScreen = 0;
function parseQR() {
    const tempCanvas = document.createElement("canvas");
    const tempCtx = tempCanvas.getContext("2d");
    const qrSize = 130; 
    tempCanvas.width = qrSize;
    tempCanvas.height = qrSize;
    
    tempCtx.imageSmoothingEnabled = false;
    tempCtx.drawImage(qrImage, 0, 0, qrSize, qrSize);
    const imgData = tempCtx.getImageData(0, 0, qrSize, qrSize);
    const data = imgData.data;

    qrPositions = []; 

    for (let y = 0; y < qrSize; y++) {
        for (let x = 0; x < qrSize; x++) {
            const idx = (y * qrSize + x) * 4;
            const brightness = (data[idx] + data[idx + 1] + data[idx + 2]) / 3;
            if (brightness < 180 && data[idx + 3] > 50) { 
                qrPositions.push({ x: x, y: y });
            }
        }
    }

    if (qrPositions.length > 0) {
        const qrScale = Math.min(canvas.width, canvas.height) * 0.0022; 
        qrTotalSizeOnScreen = qrSize * qrScale;
        qrOffsetX = canvas.width / 2 - qrTotalSizeOnScreen / 2;
        qrOffsetY = canvas.height * 0.42 - qrTotalSizeOnScreen / 2;

        const textY = qrOffsetY + qrTotalSizeOnScreen + 60;

        heartParticles.forEach((p, index) => {
            // ЭФФЕКТ: Ровно 24 частицы летят вниз на место текста, имитируя рождение букв
            if (index < phrase.length) {
                p.qrx = canvas.width / 2 - (phrase.length * 9) + (index * 18);
                p.qry = textY;
                p.isTextPointer = true;
                p.letterIndex = index;
            } else {
                const pos = qrPositions[index % qrPositions.length];
                p.qrx = pos.x * qrScale + qrOffsetX;
                p.qry = pos.y * qrScale + qrOffsetY;
                p.isTextPointer = false;
            }
        });
    }
}

qrImage.onload = parseQR;
if (qrImage.complete) parseQR();

qrBtn.addEventListener("click", () => {
    if (mode === "heart") {
        mode = "qr-vortex"; 
        cardText.style.opacity = "0"; 
        setTimeout(() => cardText.style.display = "none", 1000);
        setTimeout(() => { mode = "qr"; }, 2200); 
    }
});

setTimeout(() => { mode = "collapse"; }, 2200);  
setTimeout(() => { mode = "big-bang";  }, 4500);  
setTimeout(() => { mode = "heart";     }, 5500);  
setTimeout(() => { if(mode === "heart") cardText.classList.add("show"); }, 6800); 

function animate() {
    ctx.fillStyle = (mode === "qr" || mode === "qr-vortex" || mode === "dissolve") ? "rgba(1, 1, 4, 0.22)" : "rgba(1, 1, 4, 0.085)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    globalTime += 0.015;

    backgroundStars.forEach(star => {
        star.alpha += star.blink;
        if (star.alpha > 1 || star.alpha < 0.2) star.blink = -star.blink;
        ctx.fillStyle = "rgba(255, 255, 255, " + Math.abs(star.alpha) + ")";
        ctx.fillRect(star.x, star.y, star.size, star.size);
    });

    if (mode !== "qr") {
        ctx.globalCompositeOperation = "screen";
    }

    heartParticles.forEach(p => {
        p.wobble += p.wobbleSpeed;

        if (mode === "supernova") {
            p.x += p.vx;
            p.y += p.vy;
            p.vx *= 0.94;
            p.vy *= 0.94;
            ctx.fillStyle = p.supernovaColor + p.alpha + ")";

        } else if (mode === "collapse") {
            p.orbitAngle += p.orbitSpeed;
            p.orbitRadius *= 0.92;
            const targetX = centerX + Math.cos(p.orbitAngle) * p.orbitRadius;
            const targetY = centerY + Math.sin(p.orbitAngle) * (p.orbitRadius * 0.22);
            p.x += (targetX - p.x) * 0.12;
            p.y += (targetY - p.y) * 0.12;
            ctx.fillStyle = "rgba(140, 235, 255, " + p.alpha + ")";

        } else if (mode === "big-bang") {
            if (p.burstProgress < 1) {
                p.burstProgress += p.burstSpeed;
                if (p.burstProgress > 1) p.burstProgress = 1;
            }
            const burstX = centerX + (p.tx - centerX) * p.burstProgress;
            const burstY = centerY + (p.ty - centerY) * p.burstProgress;
            p.x = burstX;
            p.y = burstY;

            if (p.isStray) {
                p.x += p.strayVx * p.burstProgress * 1.5;
                p.y += p.strayVy * p.burstProgress * 1.5;
            }
            ctx.fillStyle = "rgba(255, 255, 255, 1)"; 

        } else if (mode === "heart") {
            if (p.isStray) {
                p.x += p.strayVx * 0.5;
                p.y += p.strayVy * 0.5;
                p.alpha -= 0.015;
                if (p.alpha < 0) p.alpha = 0;
            } else {
                const pulse = 1 + Math.sin(globalTime * 2.0) * 0.02; 
                const targetX = centerX + (p.origTx - centerX) * pulse;
                const targetY = centerY + (p.origTy - centerY) * pulse;

                const vibrationX = Math.sin(p.wobble * 2) * 2.8;
                const vibrationY = Math.cos(p.wobble * 2) * 2.8;

                p.x = targetX + vibrationX;
                p.y = targetY + vibrationY;
            }
            ctx.fillStyle = p.heartColor + p.alpha + ")";

        } else if (mode === "qr-vortex") {
            p.vortexAngleX += p.vortexSpeedX;
			p.vortexAngleY += p.vortexSpeedY;
const sphereX = Math.cos(p.vortexAngleX) * Math.sin(p.vortexAngleY) * p.vortexRadius;
const sphereY = Math.sin(p.vortexAngleX) * Math.sin(p.vortexAngleY) * p.vortexRadius;

p.x += (centerX + sphereX - p.x) * 0.08;
p.y += (centerY + sphereY - p.y) * 0.08;
ctx.fillStyle = "rgba(255, 255, 255, 0.85)";

} else if (mode === "qr") {
	p.x += (p.qrx - p.x) * 0.08;
	p.y += (p.qry - p.y) * 0.08;
if (p.isTextPointer) {
	const distance = Math.sqrt((p.qrx - p.x)**2 + (p.qry - p.y)**2);
	if (distance < 6) {const spans = textContainer.querySelectorAll("span");
	if (spans[p.letterIndex]) {spans[p.letterIndex].classList.add("visible");
	}
	p.alpha -= 0.05;
	if (p.alpha < 0) p.alpha = 0;
	}
	ctx.fillStyle = "rgba(255, 255, 255, " + p.alpha + ")";
	} else {
		ctx.fillStyle = "rgba(255, 245, 235, 0.95)";
		}
		}
	ctx.beginPath();
	let currentRadius = p.size;
	if (mode === "qr-vortex") currentRadius = 1.4;
	if (mode === "qr") currentRadius = p.isTextPointer ? 2.5 : 1.9;
	
	ctx.arc(p.x, p.y, currentRadius, 0, Math.PI * 2);
	ctx.fill();
	});
	
	ctx.globalCompositeOperation = "source-over";
	requestAnimationFrame(animate);
	}
	
	animate();