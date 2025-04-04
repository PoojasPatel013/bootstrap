import "./Footer.css"
import React from "react";
import { FaHeart, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">PP</div>
      
        {/* <div className="footer-social">
              <a href="mailto:poojaspatel1375@gmail.com">
                <i className="fas fa-envelope"></i>
              </a>
              <a href="https://www.linkedin.com/in/pooja-p-77329933b/">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="https://x.com/PoojaPatel55629" target="_blank" rel="noreferrer">
              <i className="fab fa-twitter"></i>
              </a>
            </div> */}
        <div className="copyright"><p>&copy; {new Date().getFullYear()} Pooja Patel. All Rights Reserved.</p>.</div>
        <div className="made-with">
          Made with <FaHeart className="heart-icon" /> by Pooja Patel
        </div>
      </div>
    </footer>
  );
};

  
  