
'use client'

import { ExternalLink } from 'lucide-react'

export default function MapSection() {
  const googleMapsLink = 'https://maps.app.goo.gl/o95rZQgUgVwTV2a27'
  
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Visit Our Office
          </h2>
          <p className="text-lg text-gray-600">
            Located in Taytay, Rizal for easy access from Metro Manila and surrounding areas
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="w-full h-[450px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3861.5396728594475!2d121.1156!3d14.5459!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397c7f9f9f9f9f9%3A0x0!2zMTTCsDMyJzQ1LjIiTiAxMjHCsDA2JzU2LjIiRQ!5e0!3m2!1sen!2sph!4v1234567890!5m2!1sen!2sph"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Radians Automation Office Location - Terracasa Building, Greenwoods Executive Village, Taytay, Rizal"
            />
          </div>
          
          <div className="p-6 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Main Office</h3>
                <p className="text-gray-600 text-sm">
                  307 Sitio Cutud, Sta Monica<br />
                  Sasmuan, Pampanga
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Sub-office (Map Location)</h3>
                <p className="text-gray-600 text-sm">
                  U5 2F Terracasa Bldg, Blk. 1 Lot 9<br />
                  Greenwoods Executive Village<br />
                  Taytay, Rizal
                </p>
              </div>
            </div>
            
            <div className="flex justify-center">
              <a
                href={googleMapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
              >
                <ExternalLink className="w-5 h-5" />
                <span>Open with Google Maps</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
