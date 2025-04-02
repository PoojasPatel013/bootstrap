export default function About() {
  return (
    <section id="about" className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-center mb-12">ABOUT ME</h2>

        <div className="text-white">
          <p className="mb-6">
            Aspiring Cloud engineer with expertise in web development and Python, passionate about building scalable,
            secure, and high-performance web applications. Skilled in full-stack development, API integration, and
            cybersecurity, with hands-on experience in vulnerability assessments.
          </p>
          <p className="mb-6">
            Eager to contribute to innovative projects that leverage cutting-edge technologies to drive progress. I'm
            also a published author with successful novels and poetry books.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            <div className="flex items-center text-white">
              <span className="mr-3">📍</span>
              <span>Vadodara, Gujarat, India</span>
            </div>
            <div className="flex items-center text-white">
              <span className="mr-3">🎓</span>
              <span>B.Tech - Computer Science Engineering</span>
            </div>
            <div className="flex items-center text-white">
              <span className="mr-3">💼</span>
              <span>Open to Work Opportunities</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

