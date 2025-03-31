export default function Footer() {
    return (
      <footer>
        <div className="container">
          <div className="footer-content">
            <div className="footer-logo">PP</div>
            <p>&copy; {new Date().getFullYear()} Pooja Patel. All Rights Reserved.</p>
            <div className="footer-social">
              <a href="mailto:pooja@example.com">
                <i className="fas fa-envelope"></i>
              </a>
              <a href="https://linkedin.com/in/">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="https://github.com/">
                <i className="fab fa-github"></i>
              </a>
            </div>
          </div>
        </div>
      </footer>
    )
  }
  
  