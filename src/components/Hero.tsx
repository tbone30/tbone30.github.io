import React, { useEffect, useState } from 'react';
import './Hero.css';

const Hero: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const hero = document.querySelector('.hero') as HTMLElement;
      if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <h1 className="hero-title">Thomas F. Welch</h1>
          <p className="hero-subtitle">Software Engineer & Computer Science Student</p>
          <div className="cta-buttons">
            <button 
              className="btn btn-primary" 
              onClick={() => scrollToSection('about')}
            >
              Learn More
            </button>
            <button 
              className="btn btn-outline" 
              onClick={() => scrollToSection('contact')}
            >
              Get In Touch
            </button>
          </div>
        </div>
      </div>
      <div 
        className="hero-cursor-glow"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
        }}
      />
    </section>
  );
};

export default Hero;
