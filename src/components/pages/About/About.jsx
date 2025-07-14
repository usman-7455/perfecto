import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      <div className="about-header">
        <h1 className="about-title">About Perfecto</h1>
        <p className="about-subtitle">Empowering productivity through intelligent task management</p>
      </div>

      <div className="about-content">
        <div className="mission-section">
          <h2>Our Mission</h2>
          <p>
            At Perfecto, we believe that everyone deserves to work smarter, not harder. 
            Our mission is to provide intuitive, powerful task management tools that help 
            individuals and teams achieve their goals with clarity and efficiency.
          </p>
        </div>

        <div className="story-section">
          <h2>Our Story</h2>
          <p>
            Founded in 2025, Perfecto was born from the frustration of juggling multiple 
            task management tools that were either too complex or too simple. We set out 
            to create a solution that strikes the perfect balance - powerful enough for 
            serious productivity, yet simple enough for anyone to use.
          </p>
        </div>

        <div className="values-section">
          <h2>Our Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <h3>Simplicity</h3>
              <p>We believe the best tools are those that get out of your way and let you focus on what matters.</p>
            </div>
            <div className="value-card">
              <h3>Reliability</h3>
              <p>Your tasks are important. We ensure your data is always safe and accessible when you need it.</p>
            </div>
            <div className="value-card">
              <h3>Innovation</h3>
              <p>We continuously evolve our platform to meet the changing needs of modern work.</p>
            </div>
            <div className="value-card">
              <h3>Community</h3>
              <p>We build for people, with people. Your feedback drives our development.</p>
            </div>
          </div>
        </div>

        <div className="team-section">
          <h2>Meet Our Team</h2>
          <div className="team-grid">
            <div className="team-member">
              <div className="member-avatar">👨‍💻</div>
              <h3>usman</h3>
            </div>
            <div className="team-member">
              <div className="member-avatar">👩‍💻</div>
              <h3>ALI</h3>
            </div>
            <div className="team-member">
              <div className="member-avatar">👨‍🎨</div>
              <h3>omar</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About; 