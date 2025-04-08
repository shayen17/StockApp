import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <img 
        src="/stock4.jpg" 
        alt="Gestión de stock"
        className="home-image"
      />
      <div className="home-text">
        <h1>📦 Todo tu inventario, en un solo clic.</h1>
        <p>Nuestra app te ayuda a mantener el control, sin complicaciones.</p>
      </div>
    </div>
  );
};

export default Home;
