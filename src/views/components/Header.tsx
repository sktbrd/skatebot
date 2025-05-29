import React from "react";

const Header: React.FC = () => (
  <div style={{ 
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    padding: '30px',
    borderRadius: '16px',
    marginBottom: '30px',
    textAlign: 'center',
    boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
  }}>
    <h1 style={{ margin: '0 0 10px 0', fontSize: '2.5em', fontWeight: '700' }}>
      🛹 SkateHive DevBot
    </h1>
    <p style={{ margin: '0', fontSize: '1.2em', opacity: '0.9' }}>
      Development Progress Blog Generator
    </p>
  </div>
);

export default Header;
