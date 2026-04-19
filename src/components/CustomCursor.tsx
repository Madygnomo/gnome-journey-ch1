import React, { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Mobile check
    const isMobile = /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent);
    if (isMobile) return;

    // --- Trail logic (Stars) ---
    const NUM_DOTS = 5;
    const dots: { el: HTMLDivElement, x: number, y: number }[] = [];
    
    for (let i = 0; i < NUM_DOTS; i++) {
        const dot = document.createElement("div");
        dot.className = "cursor-dot";
        dot.textContent = "⭐";
        dot.style.position = 'fixed';
        dot.style.top = '0';
        dot.style.left = '0';
        dot.style.pointerEvents = 'none';
        dot.style.zIndex = '999999';
        dot.style.fontSize = '16px';
        document.body.appendChild(dot);
        dots.push({ el: dot, x: 0, y: 0 });
    }

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    const handleMouseMove = (e: MouseEvent) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);

    function animateDots() {
        let x = mouseX;
        let y = mouseY;

        dots.forEach((dot, index) => {
            dot.x += (x - dot.x) * 0.15;
            dot.y += (y - dot.y) * 0.15;
            dot.el.style.transform = `translate(${dot.x}px, ${dot.y}px) scale(${1 - index * 0.12})`;
            x = dot.x;
            y = dot.y;
        });
        requestAnimationFrame(animateDots);
    }
    animateDots();

    // --- Sparkle Logic (Canvas) ---
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const setCanvasSize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };
    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    interface Particle {
        x: number;
        y: number;
        size: number;
        color: string;
        angle: number;
        speed: number;
        life: number;
    }
    let particles: Particle[] = [];

    function createSparkle(x: number, y: number) {
        const colors = ["#ffcc00", "#a584e4", "#ff99cc", "#cc99ff"];
        for (let i = 0; i < 20; i++) {
            particles.push({
                x,
                y,
                size: Math.random() * 4 + 2,
                color: colors[Math.floor(Math.random() * colors.length)],
                angle: Math.random() * 2 * Math.PI,
                speed: Math.random() * 2 + 1,
                life: 60,
            });
        }
    }

    function drawStar(x: number, y: number, r: number, points: number, inset: number, color: string) {
        if (!ctx) return;
        ctx.save();
        ctx.beginPath();
        ctx.translate(x, y);
        ctx.moveTo(0, 0 - r);
        for (let i = 0; i < points; i++) {
            ctx.rotate(Math.PI / points);
            ctx.lineTo(0, 0 - r * inset);
            ctx.rotate(Math.PI / points);
            ctx.lineTo(0, 0 - r);
        }
        ctx.closePath();
        ctx.fillStyle = color;
        ctx.fill();
        ctx.restore();
    }

    function updateParticles() {
        if (!ctx || !canvas) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = particles.length - 1; i >= 0; i--) {
            let p = particles[i];
            p.x += Math.cos(p.angle) * p.speed;
            p.y += Math.sin(p.angle) * p.speed;
            p.life -= 1;

            drawStar(p.x, p.y, p.size, 5, 0.5, p.color);

            if (p.life <= 0) {
                particles.splice(i, 1);
            }
        }
        requestAnimationFrame(updateParticles);
    }

    const handleClick = (e: MouseEvent) => {
        createSparkle(e.clientX, e.clientY);
    };

    document.addEventListener("click", handleClick);
    updateParticles();

    return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("resize", setCanvasSize);
        document.removeEventListener("click", handleClick);
        dots.forEach(dot => dot.el.remove());
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none z-[999998]"
    />
  );
}
