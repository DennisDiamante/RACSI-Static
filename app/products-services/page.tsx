
import Image from 'next/image'
import Link from 'next/link'
import { Settings, Monitor, Zap, ArrowRight, CheckCircle } from 'lucide-react'

const services = [
  {
    id: 1,
    title: 'Assembly of Motor Controllers',
    description: 'Comprehensive motor control solutions designed for industrial applications with precision engineering and reliable performance.',
    icon: Settings,
    image: 'https://automationelectric.com/wp-content/uploads/2021/07/Motor-Controls-Motor-Control-Panels-Automation-Electric-Controls-scaled.jpg',
    products: [
      {
        name: 'Full Voltage Controller',
        description: 'Direct-on-line motor starters for simple and reliable motor control applications.',
        image: 'https://www.softstartrv.com/wp-content/uploads/2021/02/What-Is-The-Difference-Between-A-VFD-And-A-Soft-Starter-1.jpg'
      },
      {
        name: 'RVAT and Wye-Delta Controllers',
        description: 'Reduced voltage starting systems that minimize inrush current and mechanical stress.',
        image: 'https://automationelectric.com/wp-content/uploads/2022/07/PLC-Programming-and-Ladder-Logic-For-Industrial-Controls-Automation-Electric-Controls.jpg'
      },
      {
        name: 'Softstarters and VFD',
        description: 'Variable frequency drives and soft starters for smooth motor acceleration and energy efficiency.',
        image: 'https://www.panelmatic.com/wp-content/uploads/2025/03/Industrial-Control-Panel-Design-FI.jpg'
      }
    ],
    features: [
      'Custom engineering design',
      'Quality component sourcing',
      'Comprehensive testing',
      'Installation support',
      'Performance optimization',
      'Maintenance services'
    ]
  },
  {
    id: 2,
    title: 'Automation and System Integration',
    description: 'Complete automation solutions from concept to commissioning, integrating cutting-edge technology with proven methodologies.',
    icon: Monitor,
    image: 'https://www.dosupply.com/tech/wp-content/uploads/2019/01/3-2-1024x729.png',
    products: [
      {
        name: 'PLC Programming and HMI Development',
        description: 'Advanced programmable logic controller solutions with intuitive human-machine interfaces.',
        image: 'https://automationelectric.com/wp-content/uploads/2022/07/PLC-Programming-and-Ladder-Logic-For-Industrial-Controls-Automation-Electric-Controls.jpg'
      },
      {
        name: 'SCADA Systems',
        description: 'Supervisory control and data acquisition systems for comprehensive process monitoring.',
        image: 'https://www.dosupply.com/tech/wp-content/uploads/2019/01/3-2-1024x729.png'
      },
      {
        name: 'Technical Services Integration',
        description: 'Complete system integration services ensuring seamless operation and optimal performance.',
        image: 'https://www.panelmatic.com/wp-content/uploads/2025/03/Industrial-Control-Panel-Design-FI.jpg'
      }
    ],
    features: [
      'System architecture design',
      'Custom software development',
      'Network integration',
      'Real-time monitoring',
      'Data analytics',
      'Remote diagnostics'
    ]
  },
  {
    id: 3,
    title: 'Supply of Electrical Components & Panel Boards',
    description: 'High-quality electrical components and custom panel boards engineered for reliability and safety in demanding industrial environments.',
    icon: Zap,
    image: 'https://eshop.se.com/in/media/shoptimize/blog/post/b/l/blog-img-1.jpg',
    products: [
      {
        name: 'Main Distribution Panels',
        description: 'Centralized electrical distribution systems designed for optimal power management.',
        image: 'https://eshop.se.com/in/media/shoptimize/blog/post/b/l/blog-img-1.jpg'
      },
      {
        name: 'Enclosed Circuit Breakers',
        description: 'Protective circuit breakers in various enclosure types for safe electrical distribution.',
        image: 'https://www.panelmatic.com/wp-content/uploads/2025/03/Industrial-Control-Panel-Design-FI.jpg'
      },
      {
        name: 'Transfer Switch Systems',
        description: 'Manual and automatic transfer switches for reliable power source switching.',
        image: 'https://automationelectric.com/wp-content/uploads/2021/07/Motor-Controls-Motor-Control-Panels-Automation-Electric-Controls-scaled.jpg'
      }
    ],
    features: [
      'Custom panel design',
      'Quality component selection',
      'Code compliance',
      'Factory testing',
      'Installation guidance',
      'After-sales support'
    ]
  }
]

export default function ProductsServicesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Products & <span className="text-yellow-400">Services</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Comprehensive industrial automation and electrical control solutions designed 
              to enhance efficiency, safety, and reliability across diverse industries.
            </p>
          </div>
        </div>
      </section>

      {/* Services Sections */}
      {services.map((service, index) => (
        <section 
          key={service.id} 
          className={`py-20 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Service Header */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
              <div className={`space-y-6 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-yellow-500 rounded-xl flex items-center justify-center">
                    <service.icon className="w-8 h-8 text-black" />
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                    {service.title}
                  </h2>
                </div>
                
                <p className="text-lg text-gray-700 leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className={`relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {service.products.map((product, idx) => (
                <div 
                  key={idx}
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-yellow-600 transition-colors duration-300">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {product.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-yellow-500 to-yellow-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-black mb-6">
            Need a Custom Solution?
          </h2>
          <p className="text-xl text-gray-800 mb-8 leading-relaxed">
            Our engineering team is ready to design and implement automation solutions 
            tailored specifically to your operational requirements and industry standards.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-black text-white font-semibold rounded-xl hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 group"
            >
              Get Custom Quote
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-black text-black font-semibold rounded-xl hover:bg-black hover:text-white transition-all duration-300"
            >
              View Our Projects
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
