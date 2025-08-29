import React from 'react';

const Skills: React.FC = () => {
  return (
    <section id="skills" style={{ padding: '80px 0', background: '#f8f9fa' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '3rem' }}>Skills & Technologies</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
          <div style={{ background: 'white', padding: '2rem', borderRadius: '10px', boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)' }}>
            <h3 style={{ color: '#667eea', marginBottom: '1rem' }}>Programming Languages</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {['Java', 'TypeScript', 'Python', 'JavaScript', 'C', 'C++'].map(skill => (
                <span key={skill} style={{ background: '#e9ecef', padding: '0.5rem 1rem', borderRadius: '20px', fontSize: '0.9rem' }}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
