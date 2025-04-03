"use client"

import { useEffect } from "react"
import "./App.css"
import "./mobile-fixes.css" // Import our mobile fixes
import Header from "./header"
import SplashCursor from "./components/animations/Animations/SplashCursor/SplashCursor"
import Lightning from "./components/animations/Backgrounds/Lightning/Lightning"
import Hero from "./components/Hero"
import About from "./components/About"
import Skills from "./components/Skills"
import Projects from "./components/Projects"
import Experience from "./components/Experience"
import Certifications from "./components/Certifications"
import EducationAchievements from "./components/EducationAchievements"
import Memberships from "./components/Memberships"
import Contact from "./components/Contact"
import Footer from "./components/Footer"

function App() {
  // Force visibility of sections on mobile
  useEffect(() => {
    const forceVisibility = () => {
      if (window.innerWidth <= 768) {
        document.querySelectorAll("section, .pixel-card").forEach((el) => {
          el.classList.add("animate")
          el.style.opacity = "1"
          el.style.transform = "none"
          el.style.visibility = "visible"
        })
      }
    }

    // Run on mount and resize
    forceVisibility()
    window.addEventListener("resize", forceVisibility)

    // Run again after a short delay to ensure it applies after any animations
    setTimeout(forceVisibility, 500)

    return () => {
      window.removeEventListener("resize", forceVisibility)
    }
  }, [])

  return (
    <div className="app">
      {/* Background Animations */}
      <Lightning />
      <SplashCursor />

      {/* Main Content */}
      <Header />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Certifications />
        <EducationAchievements />
        <Memberships />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App

