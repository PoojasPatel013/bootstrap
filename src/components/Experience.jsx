import PixelCard from './animations/Components/PixelCard/PixelCard';

export default function Experience() {
  return (
    <section id="experience">
      <div className="container">
        <h2 className="section-title">Experience</h2>
        <div className="timeline">
          <div className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <PixelCard>
                <div className="card-content">
                  <h3>Cybersecurity Associate</h3>
                  <h4>Pregard</h4>
                  <p className="timeline-date">July 2023 - October 2023 (3 months)</p>
                  <ul>
                    <li>Conducted vulnerability assessments and penetration testing on 10+ systems, reducing security risks by 30%.</li>
                    <li>Gained hands-on experience in ethical hacking, Kali Linux, Windows access control, and security breach prevention.</li>
                    <li>Implemented firewall rules and network security protocols to safeguard sensitive data.</li>
                  </ul>
                </div>
              </PixelCard>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
