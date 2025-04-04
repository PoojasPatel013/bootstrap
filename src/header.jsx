"use client"

import { useState, useEffect } from "react"
import "./header.css"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className={`header ${scrolled ? "scrolled" : ""}`}>
      <div className="container">
        <div className="header-content">
          <a href="#hero" className="logo">
            PP
          </a>
          <p
            style={{ color: "black", fontFamily: "'Dancing Script', cursive", fontSize: "1.5rem", fontWeight: "bold" }}
          >
            Architecting Clouds, Crafting Regal Stories
          </p>

          <div className={`menu-toggle ${isMenuOpen ? "active" : ""}`} onClick={toggleMenu}>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>

          {/* <nav>
            <ul className={`nav-links ${isMenuOpen ? "active" : ""}`}>
              <li>
                <a href="#about" onClick={() => setIsMenuOpen(false)}>
                  About
                </a>
              </li>
              <li>
                <a href="#skills" onClick={() => setIsMenuOpen(false)}>
                  Expertise
                </a>
              </li>
              <li>
                <a href="#education-experience" onClick={() => setIsMenuOpen(false)}>
                  Credentials
                </a>
              </li>
              <li>
                <a href="#achievements" onClick={() => setIsMenuOpen(false)}>
                  Achievements
                </a>
              </li>
              <li>
                <a href="#contact" onClick={() => setIsMenuOpen(false)}>
                  Contact
                </a>
              </li>
            </ul>
          </nav> */}

          <div className="social-icons">
            <a href="https://www.linkedin.com/in/pooja-p-77329933b/" target="_blank" rel="noreferrer">
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a href="https:github.com/PoojasPatel013" target="_blank" rel="noreferrer">
              <i className="fab fa-github"></i>
            </a>
            <a href="https://developers.google.com/profile/u/103599152646825029853/edit?utm_source=developer.android.com" className="social-link" target="_blank" rel="noreferrer">
                <i className="fab fa-google"></i>
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}

