"use client"

import { useEffect, useState, useRef } from "react"

export default function Hero() {
  const [displayText, setDisplayText] = useState("")
  const typewriterRef = useRef(null)

  useEffect(() => {
    const phrases = ["Full Stack Developer", "Cloud Engineer", "Published Author"]

    let phraseIndex = 0
    let charIndex = 0
    let isDeleting = false
    let typingSpeed = 100

    function typeWriter() {
      const currentPhrase = phrases[phraseIndex]

      if (isDeleting) {
        setDisplayText(currentPhrase.substring(0, charIndex - 1))
        charIndex--
        typingSpeed = 50
      } else {
        setDisplayText(currentPhrase.substring(0, charIndex + 1))
        charIndex++
        typingSpeed = 100
      }

      if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true
        typingSpeed = 1000 // Pause at the end
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false
        phraseIndex = (phraseIndex + 1) % phrases.length
        typingSpeed = 500 // Pause before typing next phrase
      }

      typewriterRef.current = setTimeout(typeWriter, typingSpeed)
    }

    typewriterRef.current = setTimeout(typeWriter, 1000)

    return () => {
      if (typewriterRef.current) {
        clearTimeout(typewriterRef.current)
      }
    }
  }, [])

  return (
    <section id="hero">
      <div className="container">
        <div className="hero-content">
          <h1 className="glitch" data-text="POOJA PATEL">
            POOJA PATEL
          </h1>
          <div className="typewriter">
            <span id="typewriter-text">{displayText}</span>
            <span className="cursor">|</span>
          </div>
          <div className="hero-links">
            <a href="mailto:poojaspatel1375@gmail.com" className="btn">
              <i className="fas fa-envelope"></i> Email
            </a>
            <a href="https://linkedin.com/in/" className="btn">
              <i className="fab fa-linkedin"></i> LinkedIn
            </a>
            <a href="https://github.com/PoojasPatel013" className="btn">
              <i className="fab fa-github"></i> GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

