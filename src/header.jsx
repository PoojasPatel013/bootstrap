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
    <header className={`site-header ${scrolled ? "scrolled" : ""}`}>
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
                <a href="#about" onClick={closeMenu}>
                  About
                </a>
              </li>
              <li>
                <a href="#skills" onClick={closeMenu}>
                  Skills
                </a>
              </li>
              <li>
                <a href="#projects" onClick={closeMenu}>
                  Projects
                </a>
              </li>
              <li>
                <a href="#experience" onClick={closeMenu}>
                  Experience
                </a>
              </li>
              <li>
                <a href="#education-achievements" onClick={closeMenu}>
                  Education
                </a>
              </li>
              <li>
                <a href="#certifications" onClick={closeMenu}>
                  Certifications
                </a>
              </li>
              <li>
                <a href="#contact" onClick={closeMenu}>
                  Contact
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}

