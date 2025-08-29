import React from 'react';

const Contact: React.FC = () => {
  return (
    <section id="contact" style={{ padding: '80px 0', background: '#f8f9fa' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '3rem' }}>Let's Work Together</h2>
        <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
          <p style={{ fontSize: '1.1rem', marginBottom: '2rem', color: '#666' }}>
            I'm always interested in new opportunities, internships, and collaborations.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
            <a href="mailto:twelch8585@gmail.com" style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem', 
              padding: '1rem 2rem', 
              background: 'white', 
              color: '#333', 
              textDecoration: 'none', 
              borderRadius: '10px', 
              boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)' 
            }}>
              📧 Email
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
