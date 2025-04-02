// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './App.css'
// import App from './App.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )
import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"

// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  const root = ReactDOM.createRoot(document.getElementById("root"))
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
})

// Add scroll animation observer
window.addEventListener("load", () => {
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate")
      }
    })
  }, observerOptions)

  // Observe all sections
  document.querySelectorAll("section").forEach((section) => {
    observer.observe(section)
  })

  // Observe all pixel cards
  document.querySelectorAll(".pixel-card").forEach((card) => {
    observer.observe(card)
  })
})

