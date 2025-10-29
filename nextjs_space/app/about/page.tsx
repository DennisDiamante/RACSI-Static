
import Image from 'next/image';
import { prisma } from '@/lib/db';

// Force dynamic rendering - no caching
export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function getAboutUsContent() {
  try {
    const aboutUs = await prisma.aboutUs.findFirst({
      orderBy: { id: 'asc' },
    });
    return aboutUs?.content || '';
  } catch (error) {
    console.error('Error fetching About Us content:', error);
    return '';
  }
}

export default async function AboutPage() {
  const content = await getAboutUsContent();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              About <span className="text-yellow-400">Us</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Leading provider of industrial automation and electrical control solutions, 
              delivering engineering excellence and innovative solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {content ? (
            <div className="prose prose-lg max-w-none">
              <p className="whitespace-pre-wrap text-gray-700 text-lg leading-relaxed">
                {content}
              </p>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Content not available</p>
            </div>
          )}
        </div>
      </section>

      {/* Mission, Vision, Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Mission */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="text-yellow-600 mb-4">
                <svg
                  className="w-12 h-12"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Our Mission
              </h3>
              <p className="text-gray-700">
                To provide innovative and reliable industrial automation
                solutions that empower businesses to achieve operational
                excellence and sustainable growth.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="text-yellow-600 mb-4">
                <svg
                  className="w-12 h-12"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Our Vision
              </h3>
              <p className="text-gray-700">
                To be the leading provider of industrial automation and control
                solutions in the Philippines, recognized for our technical
                expertise, innovation, and commitment to customer success.
              </p>
            </div>

            {/* Core Values */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="text-yellow-600 mb-4">
                <svg
                  className="w-12 h-12"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Core Values
              </h3>
              <p className="text-gray-700">
                We uphold excellence in engineering, integrity, and professionalism 
                while maintaining a customer-centric approach. Our commitment to 
                quality drives continuous innovation and improvement in every solution we deliver.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
