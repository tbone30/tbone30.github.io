import React, { useEffect } from 'react';
import './DynamicBackground.css';

const DynamicBackground: React.FC = () => {
  useEffect(() => {
    createParticles();
  }, []);

  const createParticles = () => {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      // Random particle types
      const types = ['', 'triangle', 'square'];
      const randomType = types[Math.floor(Math.random() * types.length)];
      if (randomType) particle.classList.add(randomType);
      
      // Random size
      const size = Math.random() * 6 + 2;
      if (!randomType) {
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
      }
      
      // Random position
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      
      // Random animation duration
      particle.style.animationDuration = (Math.random() * 10 + 5) + 's';
      particle.style.animationDelay = Math.random() * 5 + 's';
      
      particlesContainer.appendChild(particle);
    }
  };

  useEffect(() => {
    // Mouse movement effect for background
    const handleMouseMove = (e: MouseEvent) => {
      const mouseX = e.clientX / window.innerWidth;
      const mouseY = e.clientY / window.innerHeight;
      
      const background = document.querySelector('.dynamic-background') as HTMLElement;
      if (background) {
        background.style.backgroundPosition = `${mouseX * 100}% ${mouseY * 100}%`;
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      <div className="dynamic-background"></div>
      <div className="particles" id="particles"></div>
    </>
  );
};

export default DynamicBackground;
