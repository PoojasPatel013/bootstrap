"use client"

import { useState } from "react"
import "./contact.css"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Here you would typically send the form data to a server
    console.log("Form submitted:", formData)

    // Reset form
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    })

    // Show success message
    alert("Thank you for your message! I will get back to you soon.")
  }

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <h2 style={{color: "black"}} className="section-title contact-title"  >Contact</h2>

        <div className="contact-content">
          <div className="contact-info">
            <h3>Let's Work Together</h3>
            <p className="elegant-text">
              Interested in working together? I'd love to hear about your financial needs and how I can help.
            </p>

            <div className="contact-methods">
              <div className="contact-method">
                <div className="method-icon">
                  <i className="fas fa-envelope"></i>
                </div>
                <div className="method-details">
                  <h4>Email</h4>
                  <a href="mailto:poojaspatel1375@gmail.com">[email protected]</a>
                </div>
              </div>

              <div className="contact-method">
                <div className="method-icon">
                  <i className="fab fa-linkedin-in"></i>
                </div>
                <div className="method-details">
                  <h4>LinkedIn</h4>
                  <a href="https://www.linkedin.com/in/pooja-p-77329933b/" target="_blank" rel="noreferrer">
                    linkedin.com
                  </a>
                </div>
              </div>

              <div className="contact-method">
                <div className="method-icon">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <div className="method-details">
                  <h4>Location</h4>
                  <p>Vadodara, India</p>
                </div>
              </div>
            </div>

            <div className="social-links">
              <a href="https://stackoverflow.com/users/29349305/pooja-patel" className="social-link" target="_blank" rel="noreferrer">
                <i className="fa-brands fa-stack-overflow"></i>
                <span>StackOverflow</span>
              </a>
              <a href="https://developers.google.com/profile/u/103599152646825029853/edit?utm_source=developer.android.com" className="social-link" target="_blank" rel="noreferrer">
                <i className="fab fa-google"></i>
                <span>Google</span>
              </a>
              <a href="https://instagram.com/fiery.pooja" className="social-link" target="_blank" rel="noreferrer">
                <i className="fab fa-instagram"></i>
                <span>Instagram</span>
              </a>
            </div>
          </div>

          <div className="contact-form-container">
            <form id="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
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
              <button type="submit" className="submit-button">
                Send Message <i className="fas fa-paper-plane"></i>
              </button>
            </form>
            <div className="accent-dot"></div>
          </div>
        </div>
      </div>
    </section>
  )
}

