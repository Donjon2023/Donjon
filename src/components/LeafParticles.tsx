import React, { useEffect, useRef } from 'react';

const LEAF_URLS = [
  'https://fengyejiyuan.oss-rg-china-mainland.aliyuncs.com/yezi1.png',
  'https://fengyejiyuan.oss-rg-china-mainland.aliyuncs.com/yezi2.png'
];

class Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  angle: number;
  spin: number;
  img: HTMLImageElement;

  constructor(x: number, y: number, images: HTMLImageElement[]) {
    this.x = x;
    this.y = y;
    // Gentle drift: slightly random horizontal, mostly downwards
    this.vx = (Math.random() - 0.5) * 1.2;
    this.vy = Math.random() * 1.5 + 0.5; 
    this.maxLife = 80 + Math.random() * 60; // 80 to 140 frames
    this.life = this.maxLife;
    this.size = 24 + Math.random() * 24; // 24px to 48px (longest edge)
    this.angle = Math.random() * Math.PI * 2;
    this.spin = (Math.random() - 0.5) * 0.04; // Slow spin
    this.img = images[Math.floor(Math.random() * images.length)];
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.angle += this.spin;
    this.life--;
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (!this.img.complete || this.img.naturalWidth === 0) return;

    const aspect = this.img.naturalWidth / this.img.naturalHeight;
    let w = this.size;
    let h = this.size;
    
    if (aspect > 1) {
      h = this.size / aspect;
    } else {
      w = this.size * aspect;
    }

    // Fade in quickly, fade out slowly
    let opacity = 1;
    if (this.maxLife - this.life < 10) {
      opacity = (this.maxLife - this.life) / 10;
    } else {
      opacity = this.life / (this.maxLife - 10);
    }
    
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.globalAlpha = Math.max(0, opacity * 0.7); // Max 70% opacity for subtlety
    ctx.drawImage(this.img, -w / 2, -h / 2, w, h);
    ctx.restore();
  }
}

export function LeafParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000, lastX: -1000, lastY: -1000 });

  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    LEAF_URLS.forEach(url => {
      const img = new Image();
      img.src = url;
      loadedImages.push(img);
    });
    imagesRef.current = loadedImages;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    const handleMouseMove = (e: MouseEvent | TouchEvent) => {
      if (imagesRef.current.length === 0) return;

      let clientX, clientY;
      if ('touches' in e) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else {
        clientX = e.clientX;
        clientY = e.clientY;
      }

      const dx = clientX - mouseRef.current.lastX;
      const dy = clientY - mouseRef.current.lastY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      mouseRef.current.x = clientX;
      mouseRef.current.y = clientY;

      // Spawn particles if mouse moved enough (prevents clumping)
      if (distance > 20) {
        // Spawn 1 or 2 particles
        const count = Math.random() > 0.4 ? 1 : 2;
        for (let i = 0; i < count; i++) {
          const offsetX = (Math.random() - 0.5) * 30;
          const offsetY = (Math.random() - 0.5) * 30;
          particlesRef.current.push(
            new Particle(clientX + offsetX, clientY + offsetY, imagesRef.current)
          );
        }
        mouseRef.current.lastX = clientX;
        mouseRef.current.lastY = clientY;
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleMouseMove);

    // Occasionally spawn a random leaf even if not moving, just to keep it alive
    const autoSpawnInterval = setInterval(() => {
      if (imagesRef.current.length > 0) {
        // Spawn around 10 leaves (8 to 12)
        const count = 8 + Math.floor(Math.random() * 5);
        for (let i = 0; i < count; i++) {
          particlesRef.current.push(
            new Particle(
              Math.random() * canvas.width,
              -20 - Math.random() * 50, // Spawn slightly above the screen, staggered
              imagesRef.current
            )
          );
        }
      }
    }, 1500);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Iterate backwards to safely remove items
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        p.update();
        p.draw(ctx);
        if (p.life <= 0) {
          particlesRef.current.splice(i, 1);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleMouseMove);
      clearInterval(autoSpawnInterval);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[100]"
    />
  );
}
