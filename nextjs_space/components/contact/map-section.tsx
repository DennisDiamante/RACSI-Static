
'use client'

export default function MapSection() {
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
          <div className="aspect-video w-full">
            <iframe
              src="https://lh3.googleusercontent.com/2z8ae1dUzJ5QrpgLQHxN-1EF9nbVTZSGh6Lqi1eGkUTA9X-3SJ_241lU7bLowTyHVHL_xLsVs8-nEVE2YwnYwlRHAzVpX_Mk7waS=s0-v0-rj"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Radians Automation Office Location"
            />
          </div>
          
          <div className="p-6 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
          </div>
        </div>
      </div>
    </section>
  )
}
