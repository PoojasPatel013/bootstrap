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

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <header className={`header ${scrolled ? "scrolled" : ""}`}>
      <div className="container">
        <div className="header-content">
          <a href="#hero" className="logo">
            PP
          </a>

          <div className={`menu-toggle ${isMenuOpen ? "active" : ""}`} onClick={toggleMenu}>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>

          <nav>
            <ul className={`nav-links ${isMenuOpen ? "active" : ""}`}>
              <li>
                <a href="About.jsx" onClick={closeMenu}>
                  About
                </a>
              </li>
              <li>
                <a href="./Skills" onClick={closeMenu}>
                  Expertise
                </a>
              </li>
              <li>
                <a href="#credentials" onClick={closeMenu}>
                  Credentials
                </a>
              </li>
              <li>
                <a href="#services" onClick={closeMenu}>
                  Services
                </a>
              </li>
              <li>
                <a href="#contact" onClick={closeMenu}>
                  Contact
                </a>
              </li>
            </ul>
          </nav>

          <div className="social-icons">
            <a href="https://www.linkedin.com/in/pooja-p-77329933b/" target="_blank" rel="noreferrer">
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a href="https://x.com/PoojaPatel55629" target="_blank" rel="noreferrer">
              <i className="fab fa-twitter"></i>
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}

