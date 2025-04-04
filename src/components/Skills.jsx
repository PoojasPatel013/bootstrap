export default function Skills() {
    const skillCategories = [
      {
        title: "Programming Languages",
        skills: [
          { name: "Java", icon: "fab fa-java" },
          { name: "HTML", icon: "fab fa-html5" },
          { name: "CSS", icon: "fab fa-css3-alt" },
          { name: "JavaScript", icon: "fab fa-js" },
          {name: "typeScript", icon: "fab fa-js-square"},
          {name: "kotlin", icon: "fab fa-java"},
          {name: "python", icon: "fab fa-python"},
        ],
      },
      {
        title: "Web Development",
        skills: [
          { name: "React.js", icon: "fab fa-react" },
          { name: "Node.js", icon: "fab fa-node-js" },
          {name: "gulp", icon: "fab fa-gulp"},
          {name: "express", icon: "fab fa-node-js"},
          {name: "bootstrap", icon: "fab fa-bootstrap"},
          {name: "Angular", icon: "fab fa-angular"},
          {name: "Spring", icon: "fab fa-java"},
          { name: "Tailwind CSS", icon: "fab fa-css3-alt" },
          { name: "Material UI", icon: "fab fa-css3-alt" },
          { name: "Flask", icon: "fab fa-python" },
        ],
      },
      {
        title: "Cloud Platforms and architecture",
        skills: [
          { name: "Google Cloud", icon: "fas fa-cloud" },
          { name: "Azure", icon: "fas fa-cloud" },
          { name: "AWS", icon: "fas fa-cloud" },
          {name: "OCI", icon: "fas fa-cloud"},
        ],
      },
      {
        title: "Database Management",
        skills: [
          { name: "MySQL", icon: "fas fa-database" },
          { name: "MongoDB", icon: "fas fa-database" },
          { name: "SQLite", icon: "fas fa-database" },
        ],
      },
      {
        title: "Tools & Technologies",
        skills: [
          { name: "Git", icon: "fab fa-git-alt" },
          { name: "Kali Linux", icon: "fas fa-shield-alt" },
          { name: "WordPress", icon: "fab fa-wordpress" },
          {name: "Cisco Packet Tracer", icon: "fas fa-network-wired"},
          { name: "Postman", icon: "fas fa-paper-plane" },
          { name: "Microsoft excel", icon: "fas fa-table" },
        ],
      },
      {
        title: "Deployment & CI/CD",
        skills: [
          {name: "render.com", icon: "fas fa-cloud" },
          {name: "vercel", icon: "fas fa-cloud" },
          { name: "GitHub Actions", icon: "fab fa-github" },
        ],
      },
      {
        title: "Mobile Development/ Current Learning",
        skills: [
          { name: "Android", icon: "fab fa-android" },
          { name: "React Native", icon: "fab fa-react" },
        ],
      }
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
  
  