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
          { name: "Tailwind CSS", icon: "fab fa-css3-alt" },
          { name: "Material UI", icon: "fab fa-css3-alt" },
          { name: "Flask", icon: "fab fa-python" }
          
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
        title: "No-Code Tools",
        skills: [
          { name: "WordPress", icon: "fab fa-wordpress" },
          {name: "framer", icon: ""},
        ],
      },
      {
        title: "Tools & Technologies",
        skills: [
          { name: "Git", icon: "fab fa-git-alt" },
          { name: "GitHub", icon: "fab fa-github" },
          { name: "Kali Linux", icon: "fas fa-shield-alt" },
          {name: "Cisco Packet Tracer", icon: "fas fa-network-wired"},
          { name: "Postman", icon: "fas fa-paper-plane" },
          { name: "Canva", icon: "fab fa-canva" },
          { name: "Microsoft excel", icon: "fas fa-table" },
          { name: "Microsoft Powerpoint", icon: "fas fa-file-powerpoint" },
          { name: "Microsoft Word", icon: "fas fa-file-word" },

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
  
  