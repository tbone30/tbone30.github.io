import React from 'react';

const Projects: React.FC = () => {
  return (
    <section id="projects" style={{ padding: '80px 0', background: 'white' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '3rem' }}>Featured Projects</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
          <div style={{ background: 'white', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)' }}>
            <div style={{ height: '200px', background: 'linear-gradient(135deg, #667eea, #764ba2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem' }}>
              🎵
            </div>
            <div style={{ padding: '1.5rem' }}>
              <h3 style={{ marginBottom: '0.5rem' }}>Music Recommender</h3>
              <p style={{ color: '#666', marginBottom: '1rem' }}>
                Full-stack music recommender web application leveraging Spotify OAuth.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
