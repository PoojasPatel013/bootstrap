import PixelCard from "./animations/Components/SpotlightCard/SpotlightCard"

export default function Experience() {
  const achievements = [
    {
      title: "API Optimization Expert",
      description: "Achieved 20% faster API response time, enhancing user experience.",
      icon: "fas fa-bolt",
    },
    {
      title: "Successful App Launch",
      description: "Developed and deployed scalable web applications with significant uptime.",
      icon: "fas fa-rocket",
    },
    {
      title: "Published Author",
      description: "Self-published author with novels and poetry books with successful impact.",
      icon: "fas fa-book",
    },
    {
      title: "NCC Cadet",
      description: "Served for 3 years in the National Cadet Corps, developing leadership and teamwork skills.",
      icon: "fas fa-medal",
    },
  ]

  return (
    <section id="achievements" className="py-16 bg-black/30 backdrop-blur-sm">
      <div className="container">
        <h2 className="section-title text-center mb-10">Achievements</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {achievements.map((achievement, index) => (
            <PixelCard key={index} className="achievement-item h-full">
              <div className="card-content flex flex-col items-center text-center p-6">
                <div className="achievement-icon text-3xl mb-4">
                  <i className={achievement.icon}></i>
                </div>
                <h3 className="text-lg font-bold mb-2">{achievement.title}</h3>
                <p className="text-sm">{achievement.description}</p>
              </div>
            </PixelCard>
          ))}
        </div>
      </div>
    </section>
  )
}

