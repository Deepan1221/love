import React, { useEffect, useRef } from 'react';

export default function FloatingParticles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle types: hearts, twinkling stars, soft bokeh bubbles
    const particles = [];
    const particleCount = 45;

    class Particle {
      constructor(isClick = false, clickX = 0, clickY = 0) {
        this.reset(isClick, clickX, clickY);
      }

      reset(isClick = false, clickX = 0, clickY = 0) {
        this.x = isClick ? clickX : Math.random() * width;
        this.y = isClick ? clickY : Math.random() * height;
        this.size = Math.random() * 8 + 4;
        this.speedY = isClick ? -(Math.random() * 2 + 1.5) : -(Math.random() * 0.8 + 0.3);
        this.speedX = (Math.random() - 0.5) * 0.6;
        this.opacity = isClick ? 1 : Math.random() * 0.6 + 0.2;
        this.fadeRate = isClick ? 0.015 : 0;
        this.type = Math.random() > 0.4 ? 'heart' : 'sparkle';
        this.color = Math.random() > 0.5 ? '#7DD3FC' : '#E0F2FE'; // soft blue / ice white
        this.rotation = Math.random() * Math.PI * 2;
        this.rotSpeed = (Math.random() - 0.5) * 0.02;
      }

      update() {
        this.y += this.speedY;
        this.x += this.speedX + Math.sin(this.y * 0.01) * 0.3;
        this.rotation += this.rotSpeed;

        if (this.fadeRate > 0) {
          this.opacity -= this.fadeRate;
        }

        if (this.y < -20 || this.opacity <= 0) {
          this.reset();
          this.y = height + 20;
        }
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = Math.max(0, this.opacity);
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);

        if (this.type === 'heart') {
          // Draw sweet mini heart
          const s = this.size;
          ctx.fillStyle = this.color;
          ctx.beginPath();
          ctx.moveTo(0, s / 4);
          ctx.quadraticCurveTo(0, 0, s / 4, 0);
          ctx.quadraticCurveTo(s / 2, 0, s / 2, s / 3);
          ctx.quadraticCurveTo(s / 2, 0, (3 * s) / 4, 0);
          ctx.quadraticCurveTo(s, 0, s, s / 4);
          ctx.quadraticCurveTo(s, s / 2, (3 * s) / 4, (3 * s) / 4);
          ctx.lineTo(s / 2, s);
          ctx.lineTo(s / 4, (3 * s) / 4);
          ctx.quadraticCurveTo(0, s / 2, 0, s / 4);
          ctx.fill();
        } else {
          // Draw 4-point star sparkle
          const r = this.size * 0.8;
          ctx.fillStyle = this.color;
          ctx.beginPath();
          ctx.moveTo(0, -r);
          ctx.quadraticCurveTo(0, 0, r, 0);
          ctx.quadraticCurveTo(0, 0, 0, r);
          ctx.quadraticCurveTo(0, 0, -r, 0);
          ctx.quadraticCurveTo(0, 0, 0, -r);
          ctx.fill();
        }
        ctx.restore();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Spawn hearts on user click/tap
    const handleClick = (e) => {
      for (let i = 0; i < 6; i++) {
        particles.push(new Particle(true, e.clientX, e.clientY));
      }
      if (particles.length > 80) {
        particles.splice(0, 6);
      }
    };
    window.addEventListener('click', handleClick);

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('click', handleClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10 opacity-70"
    />
  );
}
