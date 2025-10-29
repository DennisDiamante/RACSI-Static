
import Image from 'next/image'
import { Target, Eye, Award, Users, Clock, Shield } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              About <span className="text-yellow-400">Radians Automation</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Pioneering industrial automation and control solutions with engineering excellence, 
              innovative technology, and unwavering commitment to customer success.
            </p>
          </div>
        </div>
      </section>

      {/* Company Background */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                Engineering Excellence Since Day One
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Radians Automation and Control Solutions, Inc. stands as a trusted leader in the industrial 
                automation sector, providing comprehensive solutions that drive efficiency, safety, and 
                innovation across diverse industries throughout the Philippines and beyond.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Our expertise spans from motor controller assembly to complex system integration, 
                backed by a team of skilled engineers committed to delivering solutions that exceed 
                expectations and industry standards.
              </p>
              
              {/* Key Stats */}
              <div className="grid grid-cols-2 gap-6 pt-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-yellow-500 rounded-xl mx-auto flex items-center justify-center mb-3">
                    <Users className="w-8 h-8 text-black" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Expert Team</h3>
                  <p className="text-gray-600">Skilled Engineers</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-yellow-500 rounded-xl mx-auto flex items-center justify-center mb-3">
                    <Clock className="w-8 h-8 text-black" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">24/7</h3>
                  <p className="text-gray-600">Technical Support</p>
                </div>
              </div>
            </div>
            
            <div className="relative aspect-[3/2] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://static.vecteezy.com/system/resources/previews/007/424/037/large_2x/professional-engineering-and-worker-team-congratulated-success-by-applaud-their-leader-after-construction-project-complete-and-he-raise-your-hand-happily-photo.jpg"
                alt="Professional Engineering Team"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Our Foundation
            </h2>
            <p className="text-xl text-gray-600">
              Built on principles that drive our commitment to excellence
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Mission */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-yellow-500 rounded-xl flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-700 leading-relaxed">
                To deliver high-quality and reliable automation and control solutions that empower 
                industries to operate smarter, safer, and more efficiently. We commit to providing 
                responsive technical support, innovative engineering services, and customized systems 
                integration designed to enhance productivity and profitability for our clients.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-yellow-500 rounded-xl flex items-center justify-center mb-6">
                <Eye className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-700 leading-relaxed">
                To be a leading and widely trusted provider of automation and control solutions 
                in the Philippines and beyond, recognized for engineering excellence, customer 
                commitment, and continuous innovation in industrial automation technology.
              </p>
            </div>

            {/* Core Values */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-yellow-500 rounded-xl flex items-center justify-center mb-6">
                <Award className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Core Values</h3>
              <p className="text-gray-700 leading-relaxed">
                <strong>Engineering Excellence:</strong> We commit to delivering precise and reliable 
                automation solutions built on proven engineering standards and continuous technical 
                improvement, ensuring every project meets the highest quality benchmarks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-[3/2] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://www.getgenea.com/wp-content/uploads/2022/02/shutterstock_1727882452-scaled.jpg"
                alt="Modern Office Space"
                fill
                className="object-cover"
              />
            </div>
            
            <div className="space-y-6">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                Why Choose <span className="text-yellow-500">Radians Automation?</span>
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <Shield className="w-5 h-5 text-black" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Proven Reliability</h4>
                    <p className="text-gray-700">
                      Track record of delivering robust solutions that stand the test of time and harsh industrial environments.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <Target className="w-5 h-5 text-black" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Customized Solutions</h4>
                    <p className="text-gray-700">
                      Every project is tailored to meet specific client requirements and industry standards.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <Users className="w-5 h-5 text-black" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Expert Support</h4>
                    <p className="text-gray-700">
                      Responsive technical support and comprehensive maintenance services to ensure optimal performance.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <Award className="w-5 h-5 text-black" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Quality Assurance</h4>
                    <p className="text-gray-700">
                      Rigorous quality control processes ensure every solution meets international standards.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
