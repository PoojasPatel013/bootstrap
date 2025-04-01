import PixelCard from "./animations/Components/PixelCard/PixelCard"

export default function EducationAchievements() {
  return (
    <section id="education-experience" className="py-16">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Education Column */}
          <div>
            <h2 className="section-title mb-6">Education</h2>
            <PixelCard className="education-card h-full">
              <div className="card-content">
                <h3 className="text-xl font-bold mb-2">B.Tech - Computer Science Engineering</h3>
                <h4 className="text-lg font-semibold mb-1">Parul University</h4>
                <p className="text-sm text-muted-foreground mb-3">August 2022 - May 2026</p>
                <p>
                  <strong>Relevant Coursework:</strong> Cloud Computing, Web Development, Networking, Database
                  Management
                </p>
              </div>
            </PixelCard>
          </div>

          {/* Experience Column */}
          <div>
            <h2 className="section-title mb-6">Experience</h2>
            <div className="timeline">
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <PixelCard className="h-full">
                    <div className="card-content">
                      <h3 className="text-xl font-bold mb-1">Cybersecurity Associate</h3>
                      <h4 className="text-lg font-semibold mb-1">Pregard</h4>
                      <p className="timeline-date text-sm text-muted-foreground mb-3">
                        July 2023 - October 2023 (3 months)
                      </p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>
                          Conducted vulnerability assessments and penetration testing on 10+ systems, reducing security
                          risks by 30%.
                        </li>
                        <li>
                          Gained hands-on experience in ethical hacking, Kali Linux, Windows access control, and
                          security breach prevention.
                        </li>
                        <li>Implemented firewall rules and network security protocols to safeguard sensitive data.</li>
                      </ul>
                    </div>
                  </PixelCard>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

