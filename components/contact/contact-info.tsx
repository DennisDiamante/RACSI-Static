
import { Phone, Mail, MapPin, Clock, MessageSquare } from 'lucide-react'

export default function ContactInfo() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Get in Touch
        </h2>
        <p className="text-gray-600 leading-relaxed">
          Our engineering team is ready to discuss your automation and control requirements. 
          We provide free consultations and customized solutions for your industrial needs.
        </p>
      </div>

      {/* Contact Methods */}
      <div className="space-y-6">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center flex-shrink-0">
            <Phone className="w-6 h-6 text-black" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
            <p className="text-gray-600">(02) 7006 6626</p>
            <p className="text-sm text-gray-500">Available during business hours</p>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center flex-shrink-0">
            <Mail className="w-6 h-6 text-black" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
            <p className="text-gray-600">info@radians-automation.com</p>
            <p className="text-sm text-gray-500">We respond within 24 hours</p>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center flex-shrink-0">
            <MapPin className="w-6 h-6 text-black" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">Offices</h3>
            <div className="space-y-2">
              <div>
                <p className="font-medium text-gray-700">Main Office</p>
                <p className="text-gray-600 text-sm">307 Sitio Cutud, Sta Monica, Sasmuan, Pampanga</p>
              </div>
              <div>
                <p className="font-medium text-gray-700">Sub-office</p>
                <p className="text-gray-600 text-sm">U5 2F Terracasa Bldg, Blk. 1 Lot 9, Greenwoods Executive Village, Taytay, Rizal</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center flex-shrink-0">
            <Clock className="w-6 h-6 text-black" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">Business Hours</h3>
            <div className="text-gray-600 space-y-1">
              <p>Monday - Friday: 8:00 AM - 6:00 PM</p>
              <p>Saturday: 8:00 AM - 12:00 PM</p>
              <p>Sunday: Closed</p>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="bg-gray-50 rounded-2xl p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
          <MessageSquare className="w-5 h-5 text-yellow-500 mr-2" />
          Why Choose Us?
        </h3>
        <div className="space-y-3">
          <div className="flex items-center text-sm text-gray-700">
            <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3 flex-shrink-0" />
            Free initial consultation and system assessment
          </div>
          <div className="flex items-center text-sm text-gray-700">
            <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3 flex-shrink-0" />
            Custom solutions tailored to your requirements
          </div>
          <div className="flex items-center text-sm text-gray-700">
            <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3 flex-shrink-0" />
            Experienced engineers with proven track record
          </div>
          <div className="flex items-center text-sm text-gray-700">
            <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3 flex-shrink-0" />
            Comprehensive after-sales support and maintenance
          </div>
        </div>
      </div>
    </div>
  )
}
