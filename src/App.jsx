import React from 'react';
import './app.css';
import Header from './header';
import SplashCursor from './components/animations/Animations/SplashCursor/SplashCursor';
import MetaBalls from './components/animations/Animations/MetaBalls/MetaBalls';
import Lightning from './components/animations/Backgrounds/Lightning/Lightning';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Certifications from './components/Certifications';
import EducationAchievements from './components/EducationAchievements';
import Memberships from './components/Memberships';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ServicesSection from './components/Services';


function App() {
  return (
    <div className="app">
      {/* Background Animations */}
      <Lightning/>
      <SplashCursor />
      {/* <MetaBalls /> */}
      
      {/* Main Content */}
      <Header />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Certifications />
        <EducationAchievements/>
        {/* <ServicesSection/> */}
        <Memberships />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
