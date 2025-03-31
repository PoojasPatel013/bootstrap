"use client"

import { useState } from 'react';
import PixelCard from './animations/Components/PixelCard/PixelCard';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Here you would typically send the form data to a server
    console.log('Form submitted:', formData);
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      message: ''
    });
    
    // Show success message
    alert('Thank you for your message! I will get back to you soon.');
  };

  return (
    <section id="contact">
      <div className="container">
        <h2 className="section-title">Contact Me</h2>
        <div className="contact-container">
          <div className="contact-info">
            <div className="contact-item">
              <i className="fas fa-envelope"></i>
              <a href="mailto:pooja@example.com">pooja@example.com</a>
            </div>
            <div className="contact-item">
              <i className="fas fa-phone"></i>
              <a href="tel:+919023562773">+91 9023562773</a>
            </div>
            <div className="contact-item">
              <i className="fab fa-linkedin"></i>
              <a href="https://linkedin.com/in/" target="_blank" rel="noreferrer">LinkedIn</a>
            </div>
            <div className="contact-item">
              <i className="fab fa-github"></i>
              <a href="https://github.com/" target="_blank" rel="noreferrer">GitHub</a>
            </div>
            <div className="contact-item">
              <i className="fas fa-map-marker-alt"></i>
              <span>Vadodara, Gujarat, India</span>
            </div>
          </div>
          
          <PixelCard className="contact-form">
            <div className="card-content">
              <form id="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    value={formData.name}
                    onChange={handleChange}
                    required 
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={formData.email}
                    onChange={handleChange}
                    required 
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    rows="5" 
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                <button type="submit" className="btn">Send Message</button>
              </form>
            </div>
          </PixelCard>
        </div>
      </div>
    </section>
  );
}
