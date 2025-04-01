import PixelCard from './animations/Components/PixelCard/PixelCard';

export default function About() {
  return (
    <section id="about">
      <div className="container">
        <h2 className="section-title">About Me</h2>
        <div className="about-content">
          <div className="about-text">
            <p>Aspiring Cloud engineer with expertise in web development and Python, passionate about building scalable, secure, and high-performance web applications. Skilled in full-stack development, API integration, and cybersecurity, with hands-on experience in vulnerability assessments.</p>
            <p>Eager to contribute to innovative projects that leverage cutting-edge technologies to drive progress. I'm also a published author with successful novels and poetry books.</p>
            <div className="about-details">
              <div className="detail">
                <i className="fas fa-map-marker-alt"></i>
                <span>Vadodara, Gujarat, India</span>
              </div>
              <div className="detail">
                <i className="fas fa-graduation-cap"></i>
                <span>B.Tech - Computer Science Engineering</span>
              </div>
              <div className="detail">
                <i className="fas fa-briefcase"></i>
                <span>Open to Work Opportunities</span>
              </div>
            </div>
          </div>
          <PixelCard>
            <div className="card-content">
              <div className="profile-img"></div>
              <h3>Pooja Patel</h3>
              <p>Full Stack Developer</p>
              <p>Cloud Engineer</p>
              <p>Published Author</p>
            </div>
          </PixelCard>
        </div>
      </div>
    </section>
  );
}
