import PixelCard from './animations/Components/SpotlightCard/SpotlightCard';

export default function Certifications() {
  const certifications = [
    {
      title: "Google Cloud Cybersecurity Certificate",
      description: "Earned 5+ skill badges in VM instances, networking, and firewall management.",
      icon: "fas fa-certificate"
    },
    {
      title: "Google Cloud - Prompt Design in Vertex AI Studio",
      description: "Developed expertise in Generative AI using Vertex AI Studio, achieved 10,000+ skill credits.",
      icon: "fas fa-brain"
    },
    {
      title: "Advanced Software Engineering Job Simulation",
      description: "Mastered data structures, software architecture, and relational database design.",
      icon: "fas fa-code"
    },
    {
      title: "AWS Cloud Essentials",
      description: "Fundamentals of AWS cloud services, architecture, and best practices.",
      icon: "fab fa-aws"
    }
  ];

  return (
    <section id="certifications">
      <div className="container">
        <h2 className="section-title">Certifications</h2>
        <div className="certifications-grid">
          {certifications.map((cert, index) => (
            <PixelCard key={index}>
              <div className="card-content">
                <div className="cert-icon"><i className={cert.icon}></i></div>
                <h3>{cert.title}</h3>
                <p>{cert.description}</p>
              </div>
            </PixelCard>
          ))}
        </div>
      </div>
    </section>
  );
}
