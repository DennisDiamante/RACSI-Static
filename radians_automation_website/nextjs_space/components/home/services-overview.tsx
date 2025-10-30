
'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Settings, Monitor, Zap, ArrowRight } from 'lucide-react'

const services = [
  {
    id: 1,
    title: 'Assembly of Motor Controllers',
    description: 'Full Voltage Controllers, RVAT and Wye-Delta Controllers, Softstarters and Variable Frequency Drives for efficient motor control solutions.',
    icon: Settings,
    image: 'https://automationelectric.com/wp-content/uploads/2021/07/Motor-Controls-Motor-Control-Panels-Automation-Electric-Controls-scaled.jpg',
    features: ['Full Voltage Controller', 'RVAT Controllers', 'Wye-Delta Controllers', 'Variable Frequency Drives']
  },
  {
    id: 2,
    title: 'Automation and System Integration',
    description: 'PLC Programming, HMI Development, SCADA systems, and comprehensive technical services for complete automation solutions.',
    icon: Monitor,
    image: 'https://www.dosupply.com/tech/wp-content/uploads/2019/01/3-2-1024x729.png',
    features: ['PLC Programming', 'HMI Development', 'SCADA Systems', 'System Integration']
  },
  {
    id: 3,
    title: 'Supply of Electrical Components',
    description: 'Main Distribution Panels, Circuit Breakers, Transfer Switches, and comprehensive electrical panel board solutions.',
    icon: Zap,
    image: 'https://eshop.se.com/in/media/shoptimize/blog/post/b/l/blog-img-1.jpg',
    features: ['Distribution Panels', 'Circuit Breakers', 'Transfer Switches', 'Panel Boards']
  }
]

export default function ServicesOverview() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Our <span className="text-yellow-500">Core Services</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive industrial automation and electrical control solutions tailored to meet your specific requirements and industry standards.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
            >
              {/* Service Image */}
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                <div className="absolute top-4 left-4">
                  <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center text-black group-hover:scale-110 transition-transform duration-300">
                    <service.icon className="w-6 h-6" />
                  </div>
                </div>
              </div>

              {/* Service Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-yellow-600 transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {service.description}
                </p>

                {/* Features List */}
                <div className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center text-sm text-gray-700">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3" />
                      {feature}
                    </div>
                  ))}
                </div>

                {/* Learn More Link */}
                <Link
                  href="/products-services"
                  className="inline-flex items-center text-yellow-600 font-semibold hover:text-yellow-700 transition-colors duration-300 group/link"
                >
                  Learn More
                  <ArrowRight className="ml-2 w-4 h-4 group-hover/link:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-16"
        >
          <Link
            href="/products-services"
            className="inline-flex items-center px-8 py-4 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 group"
          >
            View All Services
            <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
