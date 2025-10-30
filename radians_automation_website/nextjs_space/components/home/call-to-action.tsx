
'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Phone, Mail, MapPin, ArrowRight } from 'lucide-react'

export default function CallToAction() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='https://previews.123rf.com/images/davidzydd/davidzydd1603/davidzydd160300089/52803731-repeating-black-white-abstract-circle-pattern-design-background.jpg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
                Ready to Transform Your <span className="text-yellow-400">Industrial Operations?</span>
              </h2>
              <p className="text-xl text-gray-300 leading-relaxed">
                Get expert consultation and customized automation solutions designed to enhance your productivity and profitability.
              </p>
            </div>

            {/* Contact Info Cards */}
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex items-center space-x-4 bg-white/10 backdrop-blur-sm rounded-lg p-4"
              >
                <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center">
                  <Phone className="w-5 h-5 text-black" />
                </div>
                <div>
                  <p className="text-sm text-gray-300">Call us directly</p>
                  <p className="font-semibold text-white">(02) 7006 6626</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex items-center space-x-4 bg-white/10 backdrop-blur-sm rounded-lg p-4"
              >
                <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center">
                  <Mail className="w-5 h-5 text-black" />
                </div>
                <div>
                  <p className="text-sm text-gray-300">Email us</p>
                  <p className="font-semibold text-white">info@radians-automation.com</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex items-center space-x-4 bg-white/10 backdrop-blur-sm rounded-lg p-4"
              >
                <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-black" />
                </div>
                <div>
                  <p className="text-sm text-gray-300">Visit our offices</p>
                  <p className="font-semibold text-white">Pampanga & Rizal</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Content - CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl p-8 text-black">
              <h3 className="text-2xl font-bold mb-4">
                Get Your Free Consultation
              </h3>
              <p className="mb-6 text-gray-800">
                Our engineering experts are ready to discuss your automation needs and provide customized solutions.
              </p>
              <div className="space-y-4">
                <Link
                  href="/contact"
                  className="block w-full bg-black text-white text-center py-4 px-6 rounded-xl font-semibold hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 group"
                >
                  <span className="inline-flex items-center">
                    Contact Us Today
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </Link>
                <Link
                  href="/projects"
                  className="block w-full border-2 border-black text-black text-center py-4 px-6 rounded-xl font-semibold hover:bg-black hover:text-white transition-all duration-300"
                >
                  View Our Projects
                </Link>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 text-center"
              >
                <h4 className="text-3xl font-bold text-yellow-400 mb-2">24/7</h4>
                <p className="text-sm text-gray-300">Technical Support</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 text-center"
              >
                <h4 className="text-3xl font-bold text-yellow-400 mb-2">100%</h4>
                <p className="text-sm text-gray-300">Custom Solutions</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
