import PixelCard from "./animations/Components/SpotlightCard/SpotlightCard"

export default function Memberships() {
  const memberships = [
    {
      title: "Google Cloud Innovator",
      icon: "fab fa-google",
    },
    {
      title: "Google Developer program",
      icon: "fab fa-google",
    },
    {
      title: "Google Women in Tech",
      icon: "fab fa-google",
    },
  ]

  return (
    <section id="memberships">
      <div className="container">
        <h2 className="section-title">Memberships</h2>
        <div className="memberships-grid">
          {memberships.map((membership, index) => (
            <PixelCard key={index} className="membership-card">
              <div className="card-content">
                <div className="membership-icon">
                  <i className={membership.icon}></i>
                </div>
                <h3>{membership.title}</h3>
              </div>
            </PixelCard>
          ))}
        </div>
      </div>
    </section>
  )
}

