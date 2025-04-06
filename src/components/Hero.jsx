"use client"

import { useEffect, useState, useRef } from "react"
import "./Hero.css"
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
    <section id="hero" className="min-h-screen flex items-center justify-center">
      <div className="container">
        <div className="hero-content text-center text-white">
          <h1 className="glitch text-5xl md:text-7xl font-bold mb-6" data-text="POOJA PATEL">
            POOJA PATEL
          </h1>
          <div className="typewriter text-xl md:text-2xl mb-8">
            <span id="typewriter-text">{displayText}</span>
            <span className="cursor">|</span>
          </div>
          <div className="hero-links flex flex-wrap justify-center gap-4">
            <a href="mailto:poojaspatel1375@gmail.com" className="btn">
              <i className="fas fa-envelope mr-2"></i> Email
            </a>
            
            <a href="/resume.pdf" download className="btn">
              <i className="fas fa-file-download mr-2"></i> Download Resume
            </a>

          </div>
        </div>
      </div>
    </section>
  )
}

