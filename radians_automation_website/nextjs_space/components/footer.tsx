
import Link from 'next/link'
import Image from 'next/image'
import { Phone, Mail, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-3">
              <div className="relative w-10 h-10">
                <Image
                  src="/logo.png"
                  alt="Radians Automation Logo"
                  fill
                  className="object-contain brightness-0 invert"
                />
              </div>
              <div>
                <h3 className="text-base font-bold leading-tight">Radians Automation and Control Solutions, Inc.</h3>
              </div>
            </Link>
            <p className="text-gray-300 text-sm">
              Leading provider of industrial automation and electrical control solutions, 
              delivering engineering excellence and innovative solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-yellow-400">Quick Links</h3>
            <div className="space-y-2">
              <Link href="/about" className="block text-gray-300 hover:text-yellow-400 transition-colors text-sm">
                About Us
              </Link>
              <Link href="/products-services" className="block text-gray-300 hover:text-yellow-400 transition-colors text-sm">
                Products & Services
              </Link>
              <Link href="/projects" className="block text-gray-300 hover:text-yellow-400 transition-colors text-sm">
                Project References
              </Link>
              <Link href="/contact" className="block text-gray-300 hover:text-yellow-400 transition-colors text-sm">
                Contact Us
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-yellow-400">Contact Information</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start space-x-3">
                <Phone className="w-4 h-4 text-yellow-400 mt-1 flex-shrink-0" />
                <span className="text-gray-300">(02) 7006 6626</span>
              </div>
              <div className="flex items-start space-x-3">
                <Mail className="w-4 h-4 text-yellow-400 mt-1 flex-shrink-0" />
                <span className="text-gray-300">info@radians-automation.com</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-yellow-400 mt-1 flex-shrink-0" />
                <div className="text-gray-300">
                  <p>Main Office: 307 Sitio Cutud, Sta Monica, Sasmuan, Pampanga</p>
                  <p className="mt-1">Sub-office: U5 2F Terracasa Bldg, Blk. 1 Lot 9, Greenwoods Executive Village, Taytay, Rizal</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="text-center text-gray-400 text-sm">
            <p>&copy; 2024 Radians Automation and Control Solutions, Inc. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
