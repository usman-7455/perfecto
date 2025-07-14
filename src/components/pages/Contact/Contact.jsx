import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="contact-container">
      <div className="contact-header">
        <h1 className="contact-title">Contact Us</h1>
        <p className="contact-subtitle">Get in touch with our team. We'd love to hear from you!</p>
      </div>

      <div className="contact-content">
        <div className="contact-info">
          <h2>Get In Touch</h2>
          <p>Have questions about Perfecto? Need help with your account? Want to share feedback? We're here to help!</p>
          
          <div className="contact-methods">
            <div className="contact-method">
              <div className="method-icon">📧</div>
              <div className="method-details">
                <h3>Email</h3>
                <p>support@perfecto.com</p>
                <p>We typically respond within 24 hours</p>
              </div>
            </div>

            <div className="contact-method">
              <div className="method-icon">📞</div>
              <div className="method-details">
                <h3>Phone</h3>
                <p>+1 (555) 123-4567</p>
                <p>Monday - Friday, 9AM - 6PM EST</p>
              </div>
            </div>

            <div className="contact-method">
              <div className="method-icon">💬</div>
              <div className="method-details">
                <h3>Live Chat</h3>
                <p>Available on our website</p>
                <p>Instant support during business hours</p>
              </div>
            </div>

            <div className="contact-method">
              <div className="method-icon">📍</div>
              <div className="method-details">
                <h3>Office</h3>
                <p>123 Productivity Street</p>
                <p>Tech City, TC 12345</p>
              </div>
            </div>
          </div>
        </div>

        <div className="contact-form-container">
          <h2>Send us a Message</h2>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Your full name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="your.email@example.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject *</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                placeholder="What's this about?"
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message *</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="6"
                placeholder="Tell us more about your inquiry..."
              ></textarea>
            </div>

            <button type="submit" className="submit-btn">
              Send Message
            </button>
          </form>
        </div>
      </div>

      <div className="faq-section">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-grid">
          <div className="faq-item">
            <h3>How do I reset my password?</h3>
            <p>Click on the "Forgot Password" link on the login page and follow the instructions sent to your email.</p>
          </div>
          <div className="faq-item">
            <h3>Can I export my tasks?</h3>
            <p>Yes! You can export your tasks in various formats including CSV, PDF, and JSON from the settings menu.</p>
          </div>
          <div className="faq-item">
            <h3>Is my data secure?</h3>
            <p>Absolutely. We use enterprise-grade encryption and follow strict security protocols to protect your data.</p>
          </div>
          <div className="faq-item">
            <h3>Do you offer refunds?</h3>
            <p>We offer a 30-day money-back guarantee for all paid plans. Contact our support team for assistance.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact; 