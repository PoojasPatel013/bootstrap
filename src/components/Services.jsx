"use client"

import { useState } from "react"
import { Code, Cloud, Shield, Database, Braces } from "lucide-react"
import "./Services.css"

const services = [
  {
    id: "cloud",
    title: "Cloud Engineering",
    icon: () => <Cloud className="size-6" />,
    description:
      "Expertise in Google Cloud, Azure, and cloud security solutions with hands-on experience in VM instances, networking, and firewall management.",
    image: "/placeholder.svg?height=400&width=600",
    skills: [
      "Google Cloud Platform",
      "Azure",
      "AWS",
      "Cloud Security Solutions",
      "VM Instances",
      "Networking",
      "Firewall Management",
    ],
  },
  {
    id: "web",
    title: "Web Development",
    icon: () => <Code className="size-6" />,
    description:
      "Full-stack development using MERN and MEAN stacks, creating responsive and dynamic web applications with modern frameworks.",
    image: "/placeholder.svg?height=400&width=600",
    skills: ["MERN Stack", "MEAN Stack", "REST APIs", "Socket.io", "Responsive Design", "Frontend Frameworks"],
  },
  {
    id: "security",
    title: "Cybersecurity",
    icon: () => <Shield className="size-6" />,
    description:
      "Vulnerability assessment and penetration testing expertise with experience in Kali Linux and security breach prevention.",
    image: "/placeholder.svg?height=400&width=600",
    skills: [
      "Kali Linux",
      "Vulnerability Assessment",
      "Penetration Testing",
      "Network Security",
      "Access Control",
      "Security Protocols",
    ],
  },
  {
    id: "data",
    title: "Data Engineering",
    icon: () => <Database className="size-6" />,
    description:
      "Database management and optimization with expertise in SQL, MongoDB, and data-driven application development.",
    image: "/placeholder.svg?height=400&width=600",
    skills: ["MongoDB", "SQL", "Database Design", "Data Optimization", "API Integration", "Data Visualization"],
  },
]

export default function ServicesSection() {
  const [activeTab, setActiveTab] = useState(services[0].id)
  const activeService = services.find((service) => service.id === activeTab) || services[0]

  return (
    <section id="services" className="py-20 bg-black text-white">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-center mb-16">Services</h2>

        <div className="services-tabs">
          <div className="tabs-navigation flex gap-4 justify-center">
            {services.map((service) => (
              <button
                key={service.id}
                onClick={() => setActiveTab(service.id)}
                className={`tab-button flex items-center gap-2 px-6 py-3 ${activeTab === service.id ? "active" : ""}`}
              >
                {service.icon()}
                <span>{service.title}</span>
              </button>
            ))}
          </div>

          <div className="tab-content mt-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div className="service-content">
                <h3 className="text-3xl font-bold mb-6">{activeService.title}</h3>
                <p className="text-lg mb-8">{activeService.description}</p>
                <div className="skills-list">
                  <h4 className="text-xl font-semibold mb-4">Key Skills:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {activeService.skills.map((skill, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Braces className="size-4 text-primary-color" />
                        <span>{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <button className="btn mt-10">Learn More</button>
              </div>
              <div className="service-image">
                <div className="relative overflow-hidden rounded-lg">
                  <img
                    src={activeService.image || "/placeholder.svg"}
                    alt={activeService.title}
                    className="w-full h-auto object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

