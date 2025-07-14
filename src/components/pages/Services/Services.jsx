import React from 'react';
import { useNavigation } from '../../../context/NavigationContext';
import './Services.css';

const Services = () => {
  const { navigateTo } = useNavigation();

  return (
    <div className="services-container">
      <div className="services-header">
        <h1 className="services-title">Our Services</h1>
        <p className="services-subtitle">Comprehensive task management solutions for every need</p>
      </div>

      <div className="services-grid">
        <div className="service-card">
          <div className="service-icon">📋</div>
          <h3>Task Management</h3>
          <p>Create, organize, and track tasks with intuitive drag-and-drop interface. Set priorities, due dates, and categories.</p>
          <ul className="service-features">
            <li>Priority-based organization</li>
            <li>Due date tracking</li>
            <li>Category management</li>
            <li>Progress monitoring</li>
          </ul>
        </div>

        <div className="service-card">
          <div className="service-icon">👥</div>
          <h3>Team Collaboration</h3>
          <p>Work together seamlessly with shared workspaces, real-time updates, and team communication tools.</p>
          <ul className="service-features">
            <li>Shared workspaces</li>
            <li>Real-time updates</li>
            <li>Team assignments</li>
            <li>Activity tracking</li>
          </ul>
        </div>

        <div className="service-card">
          <div className="service-icon">📊</div>
          <h3>Analytics & Reports</h3>
          <p>Gain insights into your productivity with detailed analytics, performance reports, and trend analysis.</p>
          <ul className="service-features">
            <li>Productivity metrics</li>
            <li>Performance reports</li>
            <li>Trend analysis</li>
            <li>Custom dashboards</li>
          </ul>
        </div>

        <div className="service-card">
          <div className="service-icon">🔔</div>
          <h3>Smart Notifications</h3>
          <p>Stay on top of your tasks with intelligent reminders, email notifications, and mobile alerts.</p>
          <ul className="service-features">
            <li>Smart reminders</li>
            <li>Email notifications</li>
            <li>Mobile alerts</li>
            <li>Custom schedules</li>
          </ul>
        </div>

        <div className="service-card">
          <div className="service-icon">🔒</div>
          <h3>Secure Storage</h3>
          <p>Your data is protected with enterprise-grade security, encryption, and regular backups.</p>
          <ul className="service-features">
            <li>End-to-end encryption</li>
            <li>Regular backups</li>
            <li>GDPR compliance</li>
            <li>Access controls</li>
          </ul>
        </div>

        <div className="service-card">
          <div className="service-icon">📱</div>
          <h3>Mobile Access</h3>
          <p>Access your tasks anywhere with our mobile app, available on iOS and Android devices.</p>
          <ul className="service-features">
            <li>iOS & Android apps</li>
            <li>Offline access</li>
            <li>Sync across devices</li>
            <li>Touch-optimized UI</li>
          </ul>
        </div>
      </div>

      <div className="pricing-section">
        <h2>Pricing Plans</h2>
        <div className="pricing-grid">
          <div className="pricing-card">
            <h3>Free</h3>
            <div className="price">$0<span>/month</span></div>
            <ul>
              <li>Up to 50 tasks</li>
              <li>Basic features</li>
              <li>Email support</li>
              <li>1 user</li>
            </ul>
            <button className="pricing-btn" onClick={navigateTo.signup}>Get Started</button>
          </div>

          <div className="pricing-card featured">
            <div className="featured-badge">Most Popular</div>
            <h3>Pro</h3>
            <div className="price">$9<span>/month</span></div>
            <ul>
              <li>Unlimited tasks</li>
              <li>Advanced features</li>
              <li>Priority support</li>
              <li>Up to 5 users</li>
              <li>Analytics & reports</li>
            </ul>
            <button className="pricing-btn featured" onClick={navigateTo.signup}>Start Free Trial</button>
          </div>

          <div className="pricing-card">
            <h3>Enterprise</h3>
            <div className="price">$29<span>/month</span></div>
            <ul>
              <li>Everything in Pro</li>
              <li>Unlimited users</li>
              <li>Custom integrations</li>
              <li>Dedicated support</li>
              <li>Advanced security</li>
            </ul>
            <button className="pricing-btn">Contact Sales</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services; 