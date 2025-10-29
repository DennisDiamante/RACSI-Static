
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, MapPin, Wrench, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Project {
  id: number;
  title: string;
  description: string;
  category: string;
  status: string;
  location: string;
  date: string;
  image: string;
  features: string;
  featured: boolean;
  display_order: number;
}

export default function ProjectsPage() {
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [showAllCompleted, setShowAllCompleted] = useState(false);
  const [showAllOngoing, setShowAllOngoing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/projects');
        const data = await response.json();
        if (data.success) {
          setAllProjects(data.projects);
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-600"></div>
          <p className="mt-4 text-gray-600">Loading projects...</p>
        </div>
      </div>
    );
  }

  const completedProjects = allProjects.filter(p => p.status === 'Completed');
  const ongoingProjects = allProjects.filter(p => p.status === 'Ongoing');

  // Get featured projects (up to 4 for completed, 2 for ongoing)
  const featuredCompleted = completedProjects.filter(p => p.featured).slice(0, 4);
  const featuredOngoing = ongoingProjects.filter(p => p.featured).slice(0, 2);

  // Determine which projects to display
  const displayedCompleted = showAllCompleted ? completedProjects : featuredCompleted;
  const displayedOngoing = showAllOngoing ? ongoingProjects : featuredOngoing;

  const hasMoreCompleted = completedProjects.length > 4;
  const hasMoreOngoing = ongoingProjects.length > 2;

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
            {displayedCompleted.map((project) => {
              const features = JSON.parse(project.features);
              return (
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
                      {features.slice(0, 3).map((feature: string, idx: number) => (
                        <div key={idx} className="flex items-center text-sm text-gray-700">
                          <CheckCircle className="w-4 h-4 text-yellow-500 mr-2 flex-shrink-0" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
            })}
          </div>

          {/* See More Button for Completed Projects */}
          {!showAllCompleted && hasMoreCompleted && (
            <div className="mt-8 text-center">
              <Button
                onClick={() => setShowAllCompleted(true)}
                className="bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-3 rounded-lg font-semibold inline-flex items-center group"
              >
                See More Completed Projects
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          )}

          {showAllCompleted && (
            <div className="mt-8 text-center">
              <Button
                onClick={() => setShowAllCompleted(false)}
                variant="outline"
                className="px-8 py-3 rounded-lg font-semibold"
              >
                Show Less
              </Button>
            </div>
          )}
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
            {displayedOngoing.map((project) => {
              const features = JSON.parse(project.features);
              return (
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
                      {features.slice(0, 3).map((feature: string, idx: number) => (
                        <div key={idx} className="flex items-center text-sm text-gray-700">
                          <Wrench className="w-4 h-4 text-blue-500 mr-2 flex-shrink-0" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
            })}
          </div>

          {/* See More Button for Ongoing Projects */}
          {!showAllOngoing && hasMoreOngoing && (
            <div className="mt-8 text-center">
              <Button
                onClick={() => setShowAllOngoing(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold inline-flex items-center group"
              >
                See More Ongoing Projects
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          )}

          {showAllOngoing && (
            <div className="mt-8 text-center">
              <Button
                onClick={() => setShowAllOngoing(false)}
                variant="outline"
                className="px-8 py-3 rounded-lg font-semibold"
              >
                Show Less
              </Button>
            </div>
          )}
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
