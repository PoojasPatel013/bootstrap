export default function Skills() {
    const skillCategories = [
      {
        title: "Web Development",
        skills: [
          { name: "React.js", icon: "fab fa-react" },
          { name: "Node.js", icon: "fab fa-node-js" },
          { name: "JavaScript", icon: "fab fa-js" },
          { name: "Angular", icon: "fab fa-angular" },
          { name: "MongoDB", icon: "fas fa-database" },
          { name: "Python", icon: "fab fa-python" },
        ],
      },
      {
        title: "Cybersecurity",
        skills: [
          { name: "Kali Linux", icon: "fas fa-shield-alt" },
          { name: "Vulnerability Assessment", icon: "fas fa-bug" },
          { name: "Networking", icon: "fas fa-network-wired" },
        ],
      },
      {
        title: "Tools & Platforms",
        skills: [
          { name: "Git", icon: "fab fa-git-alt" },
          { name: "GitHub", icon: "fab fa-github" },
          { name: "Google Cloud", icon: "fas fa-cloud" },
          { name: "Azure", icon: "fas fa-cloud" },
          { name: "AWS", icon: "fas fa-cloud" },
        ],
      },
    ]
  
    return (
      <section id="skills">
        <div className="container">
          <h2 className="section-title">Technical Skills</h2>
          <div className="skills-container">
            {skillCategories.map((category, index) => (
              <div className="skill-category" key={index}>
                <h3>{category.title}</h3>
                <div className="skills-grid">
                  {category.skills.map((skill, skillIndex) => (
                    <div className="skill-item" key={skillIndex}>
                      <div className="skill-icon">
                        <i className={skill.icon}></i>
                      </div>
                      <div className="skill-name">{skill.name}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }
  
  