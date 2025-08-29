import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer style={{ background: '#333', color: 'white', textAlign: 'center', padding: '2rem 0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        <p>&copy; 2025 Thomas Welch. Built with ❤️ and React.</p>
      </div>
    </footer>
  );
};

export default Footer;
