import "./Footer.css"
import React from "react";
import { FaHeart, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">PP</div>
        <nav className="footer-nav">
          <a href="#">Home</a>
          <a href="#">About</a>
          <a href="#">Services</a>
          <a href="#">Contact</a>
        </nav>
        <div className="footer-social">
              <a href="mailto:poojaspatel1375@gmail.com">
                <i className="fas fa-envelope"></i>
              </a>
              <a href="https://www.linkedin.com/in/pooja-p-77329933b/">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="https://github.com/PoojasPatel013">
                <i className="fab fa-github"></i>
              </a>
            </div>
        <div className="copyright"><p>&copy; {new Date().getFullYear()} Pooja Patel. All Rights Reserved.</p>.</div>
        <div className="made-with">
          Made with <FaHeart className="heart-icon" /> by Pooja Patel
        </div>
      </div>
    </footer>
  );
};

  
  