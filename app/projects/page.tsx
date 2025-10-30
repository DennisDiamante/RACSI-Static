
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, MapPin, Wrench, ArrowRight, CheckCircle } from 'lucide-react'

const projects = [
  {
    id: 1,
    title: 'Automotive Manufacturing Plant Automation',
    category: 'System Integration',
    status: 'Completed',
    location: 'Laguna, Philippines',
    date: '2024',
    image: 'https://www.iqsdirectory.com/articles/factory-automation/factory-automation/factory-automation-system-for-automobiles.jpg',
    description: 'Complete automation system for automotive assembly line including PLC programming, HMI development, and SCADA integration.',
    features: [
      'PLC-based control system',
      'Real-time monitoring dashboard',
      'Automated quality control',
      'Production data analytics',
      'Safety interlocks system'
    ]
  },
  {
    id: 2,
    title: 'Industrial Electrical Infrastructure Upgrade',
    category: 'Electrical Installation',
    status: 'Completed',
    location: 'Cavite, Philippines',
    date: '2024',
    image: 'https://belmarelectrical.com/wp-content/uploads/2020/11/Electrical-Engineering-for-Manufacturing-and-Industry-new.jpg',
    description: 'Comprehensive electrical system upgrade for manufacturing facility including main distribution panels and motor control centers.',
    features: [
      'Main distribution panel installation',
      'Motor control center assembly',
      'Power factor correction',
      'Emergency backup systems',
      'Electrical safety compliance'
    ]
  },
  {
    id: 3,
    title: '24/7 Control Room Operations Center',
    category: 'Monitoring Systems',
    status: 'Ongoing',
    location: 'Metro Manila, Philippines',
    date: '2024',
    image: 'https://new.abb.com/images/default-source/abb-custom-archive/control-room-design-cover-croped-2-(2)e01852f4c1f463c09537ff0000433538.jpg?sfvrsn=deec310c_0',
    description: 'State-of-the-art control room setup with advanced monitoring systems for continuous industrial process supervision.',
    features: [
      'Multi-screen monitoring setup',
      'Centralized alarm management',
      'Remote system access',
      'Historical data logging',
      'Redundant communication systems'
    ]
  },
  {
    id: 4,
    title: 'Electrical Substation Automation',
    category: 'Power Systems',
    status: 'Completed',
    location: 'Batangas, Philippines',
    date: '2023',
    image: 'https://studyelectrical.com/wp-content/uploads/2019/04/Substation-components-equipment-layout.jpg',
    description: 'Automation and control system implementation for electrical substation with protective relay coordination.',
    features: [
      'Protective relay systems',
      'SCADA integration',
      'Remote monitoring capability',
      'Fault analysis tools',
      'Load management system'
    ]
  },
  {
    id: 5,
    title: 'Smart Factory Production Line',
    category: 'Industry 4.0',
    status: 'Ongoing',
    location: 'Bulacan, Philippines',
    date: '2024',
    image: 'https://assets.new.siemens.com/siemens/assets/api/uuid:fdfd8d31-2a25-4781-ad9f-94e915af5d62/operation:download/AdobeStock-468739675.jpeg',
    description: 'Implementation of smart manufacturing concepts with IoT integration and predictive maintenance systems.',
    features: [
      'IoT sensor integration',
      'Predictive maintenance',
      'Machine learning analytics',
      'Energy optimization',
      'Quality tracking system'
    ]
  },
  {
    id: 6,
    title: 'Industrial Building Electrical System',
    category: 'Infrastructure',
    status: 'Completed',
    location: 'Pampanga, Philippines',
    date: '2023',
    image: 'https://msb-engineering.com/wp-content/uploads/2011/06/INDUSTRIAL-ELECTRICAL-SYSTEM-OPTIMIZATION-THROUGH-ANALYSIS-scaled.jpeg',
    description: 'Complete electrical system design and installation for new industrial facility with energy-efficient solutions.',
    features: [
      'Energy-efficient lighting',
      'Power distribution optimization',
      'Motor drive systems',
      'Building automation integration',
      'Sustainability compliance'
    ]
  }
]

export default function ProjectsPage() {
  const completedProjects = projects.filter(p => p.status === 'Completed')
  const ongoingProjects = projects.filter(p => p.status === 'Ongoing')

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Project <span className="text-yellow-400">References</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Showcasing our expertise through successful automation and electrical control 
              implementations across diverse industrial sectors throughout the Philippines.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="text-center">
              <h3 className="text-4xl font-bold text-yellow-400 mb-2">{completedProjects.length}+</h3>
              <p className="text-gray-300">Completed Projects</p>
            </div>
            <div className="text-center">
              <h3 className="text-4xl font-bold text-yellow-400 mb-2">{ongoingProjects.length}</h3>
              <p className="text-gray-300">Ongoing Projects</p>
            </div>
            <div className="text-center">
              <h3 className="text-4xl font-bold text-yellow-400 mb-2">100%</h3>
              <p className="text-gray-300">Client Satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      {/* Completed Projects */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Completed Projects
            </h2>
            <p className="text-lg text-gray-600">
              Successfully delivered automation solutions that drive operational excellence
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {completedProjects.map((project, index) => (
              <div 
                key={project.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
              >
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      {project.status}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="bg-yellow-500 text-black text-xs font-semibold px-3 py-1 rounded-full">
                      {project.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-yellow-600 transition-colors duration-300">
                    {project.title}
                  </h3>

                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{project.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{project.date}</span>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-gray-900">Key Features:</h4>
                    <div className="space-y-1">
                      {project.features.slice(0, 3).map((feature, idx) => (
                        <div key={idx} className="flex items-center text-sm text-gray-700">
                          <CheckCircle className="w-4 h-4 text-yellow-500 mr-2 flex-shrink-0" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ongoing Projects */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Ongoing Projects
            </h2>
            <p className="text-lg text-gray-600">
              Current implementations showcasing our commitment to continuous innovation
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {ongoingProjects.map((project, index) => (
              <div 
                key={project.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
              >
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-full animate-pulse">
                      {project.status}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="bg-yellow-500 text-black text-xs font-semibold px-3 py-1 rounded-full">
                      {project.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-yellow-600 transition-colors duration-300">
                    {project.title}
                  </h3>

                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{project.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{project.date}</span>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-gray-900">Key Features:</h4>
                    <div className="space-y-1">
                      {project.features.slice(0, 3).map((feature, idx) => (
                        <div key={idx} className="flex items-center text-sm text-gray-700">
                          <Wrench className="w-4 h-4 text-blue-500 mr-2 flex-shrink-0" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-yellow-500 to-yellow-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-black mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl text-gray-800 mb-8 leading-relaxed">
            Let's discuss how we can bring the same level of excellence and innovation 
            to your automation and control requirements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-black text-white font-semibold rounded-xl hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 group"
            >
              Start Your Project
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
            <Link
              href="/products-services"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-black text-black font-semibold rounded-xl hover:bg-black hover:text-white transition-all duration-300"
            >
              View Our Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
