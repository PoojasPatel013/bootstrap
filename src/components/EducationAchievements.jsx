import PixelCard from './animations/Components/PixelCard/PixelCard';

export default function EducationAchievements() {
  const achievements = [
    {
      title: "API Optimization Expert",
      description: "Achieved 20% faster API response time, enhancing user experience.",
      icon: "fas fa-bolt"
    },
    {
      title: "Successful App Launch",
      description: "Developed and deployed scalable web applications with 95% uptime.",
      icon: "fas fa-rocket"
    },
    {
      title: "Published Author",
      description: "Self-published author with novels and poetry books with successful impact.",
      icon: "fas fa-book"
    },
    {
      title: "NCC Cadet",
      description: "Served for 3 years in the National Cadet Corps, developing leadership and teamwork skills.",
      icon: "fas fa-medal"
    }
  ];

  return (
    <section id="education-achievements">
      <div className="container">
        <div className="two-column-grid">
          <div className="column">
            <h2 className="section-title">Education</h2>
            <PixelCard className="education-card">
              <div className="card-content">
                <h3>B.Tech - Computer Science Engineering</h3>
                <h4>Parul University</h4>
                <p>August 2022 - May 2026</p>
                <p><strong>Relevant Coursework:</strong> Cloud Computing, Web Development, Cybersecurity, Database Management</p>
              </div>
            </PixelCard>
          </div>
          
          <div className="column">
            <h2 className="section-title">Achievements</h2>
            <div className="achievements-list">
              {achievements.map((achievement, index) => (
                <PixelCard key={index} className="achievement-item">
                  <div className="card-content">
                    <div className="achievement-icon"><i className={achievement.icon}></i></div>
                    <h3>{achievement.title}</h3>
                    <p>{achievement.description}</p>
                  </div>
                </PixelCard>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
