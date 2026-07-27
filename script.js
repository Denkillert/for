// ==========================================
// НАСТРОЙКИ КОСМОСА
// ==========================================
const heartParticleCount = 12000;
const bgStarCount = 150;
const strayCount = 200;
const qrBase64Data = "data:image/png;base64,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";

// ==========================================
// ЛОГИКА САЙТА
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

const phrase = "Получай свой\nподарочек :)";
const lines = phrase.split("\n");

let globalCharIndex = 0;
lines.forEach((line, lineIdx) => {
    line.split("").forEach(char => {
        const span = document.createElement("span");
        span.textContent = char === " " ? "\u00A0" : char;
        textContainer.appendChild(span);
        globalCharIndex++;
    });
    if (lineIdx < lines.length - 1) {
        const br = document.createElement("br");
        textContainer.appendChild(br);
    }
});

function getHeartPoint(t) {
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
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
        x: centerX, y: centerY,
        vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed,
        tx: (heartTarget.x * internalDist) + centerX,
        ty: (heartTarget.y * internalDist) + centerY,
        origTx: (heartTarget.x * internalDist) + centerX,
        origTy: (heartTarget.y * internalDist) + centerY,
        qrx: centerX, qry: centerY,
        size: isOutline ? (Math.random() * 1.1 + 0.6) : (Math.random() * 0.8 + 0.3),
        supernovaColor: supernovaColors[Math.floor(Math.random() * supernovaColors.length)],
        heartColor: finalColor,
        alpha: Math.random() * 0.5 + 0.3,
        wobble: Math.random() * 100,
        wobbleSpeed: Math.random() * 0.04 + 0.01,
        isStray: i < strayCount,
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
    const qrSize = 200; // Разрешение парсинга
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
        const isMobile = Math.min(canvas.width, canvas.height) < 700;
        
        // ФИКСИРОВАННЫЙ РАЗМЕР QR В ПИКСЕЛЯХ (220px на телефоне - идеально для камеры)
        const targetSize = isMobile ? 220 : 300; 
        const qrScale = targetSize / qrSize;
        
        qrTotalSizeOnScreen = targetSize;
        qrOffsetX = canvas.width / 2 - qrTotalSizeOnScreen / 2;
        
        // На телефоне поднимаем QR выше (12% от верха), чтобы точно не обрезался
        qrOffsetY = isMobile ? canvas.height * 0.12 : canvas.height * 0.35;
        
        const textY = qrOffsetY + qrTotalSizeOnScreen + 50;

        const lineSpacing = 50;
        let charCounter = 0;
        lines.forEach((line, lineIdx) => {
            const lineY = textY + lineIdx * lineSpacing;
            const chars = line.split("");
            chars.forEach((char, i) => {
                const p = heartParticles[charCounter];
                if (p) {
                    p.qrx = canvas.width / 2 - (chars.length * 9) + (i * 18);
                    p.qry = lineY;
                    p.isTextPointer = true;
                    p.letterIndex = charCounter;
                }
                charCounter++;
            });
        });

        for (let i = charCounter; i < heartParticles.length; i++) {
            const p = heartParticles[i];
            const pos = qrPositions[(i - charCounter) % qrPositions.length];
            p.qrx = pos.x * qrScale + qrOffsetX;
            p.qry = pos.y * qrScale + qrOffsetY;
            p.isTextPointer = false;
        }
    }
}

qrImage.onload = parseQR;
if (qrImage.complete) parseQR();

function triggerSurprise(e) {
    if (e) {
        e.preventDefault();
        e.stopPropagation();
    }
    if (mode === "heart") {
        mode = "qr-vortex";
        cardText.style.opacity = "0";
        setTimeout(() => cardText.style.display = "none", 1000);
        setTimeout(() => { mode = "qr"; }, 2200);
    }
}

qrBtn.addEventListener("click", triggerSurprise, { passive: false });
qrBtn.addEventListener("touchstart", triggerSurprise, { passive: false });
qrBtn.addEventListener("touchend", triggerSurprise, { passive: false });

setTimeout(() => { mode = "collapse"; }, 2200);
setTimeout(() => { mode = "big-bang"; }, 4500);
setTimeout(() => { mode = "heart"; }, 5500);
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

    if (mode !== "qr") ctx.globalCompositeOperation = "screen";

    heartParticles.forEach(p => {
        p.wobble += p.wobbleSpeed;
        if (mode === "supernova") {
            p.x += p.vx; p.y += p.vy;
            p.vx *= 0.94; p.vy *= 0.94;
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
            p.x = burstX; p.y = burstY;
            if (p.isStray) {
                p.x += p.strayVx * p.burstProgress * 1.5;
                p.y += p.strayVy * p.burstProgress * 1.5;
            }
            ctx.fillStyle = "rgba(255, 255, 255, 1)";
        } else if (mode === "heart") {
            if (p.isStray) {
                p.x += p.strayVx * 0.5; p.y += p.strayVy * 0.5;
                p.alpha -= 0.015;
                if (p.alpha < 0) p.alpha = 0;
            } else {
                const pulse = 1 + Math.sin(globalTime * 2.0) * 0.02;
                const targetX = centerX + (p.origTx - centerX) * pulse;
                const targetY = centerY + (p.origTy - centerY) * pulse;
                const vibrationX = Math.sin(p.wobble * 2) * 2.8;
                const vibrationY = Math.cos(p.wobble * 2) * 2.8;
                p.x = targetX + vibrationX; p.y = targetY + vibrationY;
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
                if (distance < 6) {
                    const spans = textContainer.querySelectorAll("span");
                    if (spans[p.letterIndex]) spans[p.letterIndex].classList.add("visible");
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
