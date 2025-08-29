import React, { useEffect, useRef, useState } from 'react';
import './DynamicBackground.css';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  type: 'circle' | 'triangle' | 'square' | 'hexagon';
  rotation: number;
  rotationSpeed: number;
  pulsePhase: number;
}

interface Wave {
  amplitude: number;
  frequency: number;
  phase: number;
  speed: number;
  color: string;
}

const DynamicBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  
  const particlesRef = useRef<Particle[]>([]);
  const wavesRef = useRef<Wave[]>([]);
  const timeRef = useRef(0);

  // Initialize particles and waves
  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    // Initialize particles
    initializeParticles();
    initializeWaves();

    return () => {
      window.removeEventListener('resize', updateDimensions);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const initializeParticles = () => {
    const particles: Particle[] = [];
    const colors = [
      'rgba(102, 126, 234, ',
      'rgba(118, 75, 162, ',
      'rgba(240, 147, 251, ',
      'rgba(245, 87, 108, ',
      'rgba(79, 172, 254, ',
      'rgba(0, 242, 254, '
    ];
    
    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        size: Math.random() * 8 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.5 + 0.2,
        type: ['circle', 'triangle', 'square', 'hexagon'][Math.floor(Math.random() * 4)] as any,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.05,
        pulsePhase: Math.random() * Math.PI * 2
      });
    }
    particlesRef.current = particles;
  };

  const initializeWaves = () => {
    const waves: Wave[] = [];
    const colors = [
      'rgba(102, 126, 234, 0.1)',
      'rgba(118, 75, 162, 0.1)',
      'rgba(240, 147, 251, 0.1)',
      'rgba(79, 172, 254, 0.1)'
    ];

    for (let i = 0; i < 4; i++) {
      waves.push({
        amplitude: Math.random() * 100 + 50,
        frequency: Math.random() * 0.02 + 0.01,
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.02 + 0.01,
        color: colors[i]
      });
    }
    wavesRef.current = waves;
  };

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Animation loop
  useEffect(() => {
    if (!dimensions.width || !dimensions.height) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    const drawWaves = (ctx: CanvasRenderingContext2D) => {
      wavesRef.current.forEach((wave, index) => {
        ctx.beginPath();
        ctx.strokeStyle = wave.color;
        ctx.lineWidth = 2;
        
        wave.phase += wave.speed;
        
        for (let x = 0; x <= dimensions.width; x += 5) {
          const y = dimensions.height / 2 + 
                    Math.sin(x * wave.frequency + wave.phase) * wave.amplitude +
                    Math.sin(timeRef.current * 0.5 + index) * 20;
          
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      });
    };

    const updateAndDrawParticles = (ctx: CanvasRenderingContext2D) => {
      particlesRef.current.forEach(particle => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        // Bounce off edges
        if (particle.x < 0 || particle.x > dimensions.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > dimensions.height) particle.vy *= -1;
        
        // Keep particles in bounds
        particle.x = Math.max(0, Math.min(dimensions.width, particle.x));
        particle.y = Math.max(0, Math.min(dimensions.height, particle.y));
        
        // Update rotation and pulse
        particle.rotation += particle.rotationSpeed;
        particle.pulsePhase += 0.05;
        
        // Mouse attraction
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150) {
          const force = (150 - distance) / 150 * 0.5;
          particle.vx += (dx / distance) * force * 0.1;
          particle.vy += (dy / distance) * force * 0.1;
        }
        
        // Apply friction
        particle.vx *= 0.98;
        particle.vy *= 0.98;
        
        // Draw particle
        drawParticle(ctx, particle);
      });
    };

    const drawParticle = (ctx: CanvasRenderingContext2D, particle: Particle) => {
      ctx.save();
      ctx.translate(particle.x, particle.y);
      ctx.rotate(particle.rotation);
      
      const pulseSize = particle.size * (1 + Math.sin(particle.pulsePhase) * 0.2);
      const alpha = particle.alpha * (0.8 + Math.sin(particle.pulsePhase * 2) * 0.2);
      
      ctx.fillStyle = particle.color + alpha + ')';
      ctx.strokeStyle = particle.color + (alpha * 0.5) + ')';
      ctx.lineWidth = 1;

      switch (particle.type) {
        case 'circle':
          ctx.beginPath();
          ctx.arc(0, 0, pulseSize, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
          break;
        
        case 'triangle':
          ctx.beginPath();
          ctx.moveTo(0, -pulseSize);
          ctx.lineTo(-pulseSize * 0.866, pulseSize * 0.5);
          ctx.lineTo(pulseSize * 0.866, pulseSize * 0.5);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
          break;
        
        case 'square':
          ctx.fillRect(-pulseSize, -pulseSize, pulseSize * 2, pulseSize * 2);
          ctx.strokeRect(-pulseSize, -pulseSize, pulseSize * 2, pulseSize * 2);
          break;
        
        case 'hexagon':
          ctx.beginPath();
          for (let i = 0; i < 6; i++) {
            const angle = (i / 6) * Math.PI * 2;
            const x = Math.cos(angle) * pulseSize;
            const y = Math.sin(angle) * pulseSize;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
          break;
      }
      
      ctx.restore();
    };

    const drawConnections = (ctx: CanvasRenderingContext2D) => {
      const particles = particlesRef.current;
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            const alpha = (100 - distance) / 100 * 0.1;
            ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    const drawMouseEffects = (ctx: CanvasRenderingContext2D) => {
      const mouse = mouseRef.current;
      const time = timeRef.current;
      
      // Ripple effect
      for (let i = 0; i < 3; i++) {
        const radius = (time * 100 + i * 50) % 200;
        const alpha = 1 - (radius / 200);
        
        ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.3})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, radius, 0, Math.PI * 2);
        ctx.stroke();
      }
      
      // Glow effect
      const gradient = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 100);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 0.1)');
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(mouse.x - 100, mouse.y - 100, 200, 200);
    };

    const animate = () => {
      timeRef.current += 0.016; // ~60fps
      
      // Clear canvas with gradient
      const gradient = ctx.createLinearGradient(0, 0, dimensions.width, dimensions.height);
      gradient.addColorStop(0, `hsl(${timeRef.current * 10 % 360}, 70%, 20%)`);
      gradient.addColorStop(0.5, `hsl(${(timeRef.current * 10 + 60) % 360}, 70%, 15%)`);
      gradient.addColorStop(1, `hsl(${(timeRef.current * 10 + 120) % 360}, 70%, 25%)`);
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, dimensions.width, dimensions.height);

      // Draw flowing waves
      drawWaves(ctx);
      
      // Draw and update particles
      updateAndDrawParticles(ctx);
      
      // Draw connections between nearby particles
      drawConnections(ctx);
      
      // Draw mouse interaction effects
      drawMouseEffects(ctx);

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [dimensions]);

  return (
    <canvas
      ref={canvasRef}
      className="dynamic-background-canvas"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'none'
      }}
    />
  );
};

export default DynamicBackground;
