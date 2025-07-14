import React from 'react';
import { useNavigation } from '../../../context/NavigationContext';
import './Home.css';

const Home = () => {
  const { navigateTo } = useNavigation();

  return (
    <div className="home-container">
      <div className="hero-section">
        <h1 className="hero-title">Welcome to Perfecto!</h1>
        <p className="hero-subtitle">Your ultimate task management solution</p>
        <div className="hero-features">
          <div className="feature-card">
            <h3>Organize Tasks</h3>
            <p>Keep your tasks organized with priority levels and categories</p>
          </div>
          <div className="feature-card">
            <h3>Track Progress</h3>
            <p>Monitor your productivity with real-time progress tracking</p>
          </div>
          <div className="feature-card">
            <h3>Stay Focused</h3>
            <p>Focus on what matters most with our intuitive interface</p>
          </div>
        </div>
        <div className="cta-buttons">
          <button className="btn-primary" onClick={navigateTo.signup}>Get Started</button>
          <button className="btn-secondary" onClick={navigateTo.about}>Learn More</button>
        </div>
      </div>
      
      <div className="stats-section">
        <div className="stat-item">
          <h2>10K+</h2>
          <p>Active Users</p>
        </div>
        <div className="stat-item">
          <h2>50K+</h2>
          <p>Tasks Completed</p>
        </div>
        <div className="stat-item">
          <h2>99%</h2>
          <p>Uptime</p>
        </div>
      </div>
    </div>
  );
};

export default Home; 