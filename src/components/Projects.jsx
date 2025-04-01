import PixelCard from "./animations/Components/PixelCard/PixelCard"

export default function Projects() {
  const projects = [
    {
      title: "Indian Recipes Platform",
      description: "A responsive recipe-sharing platform showcasing regional and ancestral Indian recipes.",
      tech: ["Template engine", "Node.js", "MongoDB"],
      demoLink: "https://flavourfusion-ak9j.onrender.com/",
      codeLink: "#",
    },
    {
      title: "Dive - Luxury Fashion Platform",
      description:
        "An e-commerce platform featuring exclusive luxury fashion collections with payment gateway integration.",
      tech: ["Express.js", "MongoDB", "API", "ReactJS"],
      demoLink: "#",
      codeLink: "#",
    },
    {
      title: "Weather Forecasting Dashboard",
      description: "A real-time weather forecasting web app with AI-driven suggestions using third-party APIs.",
      tech: ["React.js", "API", "AI"],
      demoLink: "#",
      codeLink: "#",
    },
    {
      title: "Digital Art Gallery",
      description: "An interactive platform for digital artists to showcase and sell their artwork.",
      tech: ["React.js", "Canvas", "API"],
      demoLink: "https://direction-art-gallery.vercel.app/",
      codeLink: "",
    },
    {
      title: "FemPlan",
      description: "A task manager app for women that tracks menstrual cycles, diet, and more.",
      tech: ["Flask", "Bootstrap", "Python"],
      demoLink: "https://femplan-feminine-glory.onrender.com/",
      codeLink: "#",
    },
    {
      title: "ChronoVault",
      description: "A mental health care and journaling app that helps users reduce anxiety and depression levels.",
      tech: ["MERN Stack", "Community Platform"],
      demoLink: "#",
      codeLink: "#",
    },
    {
      title: "Moodie",
      description: "A personalised journal or diary to log your moods and thoughts.",
      tech: ["Angular", "TypeScript", "API"],
      demoLink: "#",
      codeLink: "#",
    },
    {
      title: "NutriPlanner",
      description: "A diet and nutrition planner that helps users track their meals and nutritional intake.",
      tech: ["ReactJS", "Node.js", "express.js", "MongoDB"],
      demoLink: "#",
      codeLink: "#",
    }
  ]

  return (
    <section id="projects">
      <div className="container">
        <h2 className="section-title">Projects</h2>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <PixelCard key={index}>
              <div className="card-content">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-tech">
                  {project.tech.map((tech, techIndex) => (
                    <span key={techIndex}>{tech}</span>
                  ))}
                </div>
                <div className="project-links">
                  <a href={project.demoLink} className="btn-small">
                    <i className="fas fa-external-link-alt"></i> Demo
                  </a>
                  <a href={project.codeLink} className="btn-small">
                    <i className="fab fa-github"></i> Code
                  </a>
                </div>
              </div>
            </PixelCard>
          ))}
        </div>
      </div>
    </section>
  )
}

