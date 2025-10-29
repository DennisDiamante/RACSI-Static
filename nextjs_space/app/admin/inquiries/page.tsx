
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Mail, Phone, Building2, Calendar, MessageSquare, RefreshCw } from 'lucide-react'

interface Inquiry {
  id: number
  name: string
  email: string
  company_name: string
  contact_number: string
  message: string
  status: string
  created_at: string
}

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchInquiries = async () => {
    try {
      setLoading(true)
      setError('')
      const response = await fetch('/api/admin/inquiries')
      
      if (!response.ok) {
        throw new Error('Failed to fetch inquiries')
      }
      
      const data = await response.json()
      setInquiries(data.inquiries)
    } catch (err) {
      setError('Failed to load inquiries. Please try again.')
      console.error('Error fetching inquiries:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchInquiries()
  }, [])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                className="inline-flex items-center text-gray-600 hover:text-yellow-600 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Website
              </Link>
              <div className="h-6 w-px bg-gray-300"></div>
              <div className="flex items-center space-x-3">
                <div className="relative w-10 h-10">
                  <Image
                    src="/logo.png"
                    alt="Radians Automation Logo"
                    fill
                    className="object-contain"
                  />
                </div>
                <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
              </div>
            </div>
            <button
              onClick={fetchInquiries}
              className="inline-flex items-center px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white font-medium rounded-lg transition-colors"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Contact Form Inquiries</h2>
          <p className="text-gray-600">
            View and manage all inquiries submitted through the contact form
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Inquiries</p>
                <p className="text-3xl font-bold text-gray-900">{inquiries.length}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <MessageSquare className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Unanswered</p>
                <p className="text-3xl font-bold text-orange-600">
                  {inquiries.filter(i => i.status === 'unanswered').length}
                </p>
              </div>
              <div className="bg-orange-100 p-3 rounded-lg">
                <Mail className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Answered</p>
                <p className="text-3xl font-bold text-green-600">
                  {inquiries.filter(i => i.status === 'answered').length}
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <Mail className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-600"></div>
            <p className="mt-4 text-gray-600">Loading inquiries...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <p className="text-red-600 font-medium">{error}</p>
          </div>
        )}

        {/* No Inquiries */}
        {!loading && !error && inquiries.length === 0 && (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No inquiries yet</h3>
            <p className="text-gray-600">
              Inquiries submitted through the contact form will appear here
            </p>
          </div>
        )}

        {/* Inquiries List */}
        {!loading && !error && inquiries.length > 0 && (
          <div className="space-y-6">
            {inquiries.map((inquiry) => (
              <div
                key={inquiry.id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {inquiry.name}
                        </h3>
                        <span
                          className={`px-3 py-1 text-xs font-semibold rounded-full ${
                            inquiry.status === 'answered'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-orange-100 text-orange-700'
                          }`}
                        >
                          {inquiry.status.charAt(0).toUpperCase() + inquiry.status.slice(1)}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div className="flex items-center text-gray-600">
                          <Mail className="w-4 h-4 mr-2 text-gray-400" />
                          <a href={`mailto:${inquiry.email}`} className="hover:text-yellow-600">
                            {inquiry.email}
                          </a>
                        </div>
                        
                        <div className="flex items-center text-gray-600">
                          <Phone className="w-4 h-4 mr-2 text-gray-400" />
                          <a href={`tel:${inquiry.contact_number}`} className="hover:text-yellow-600">
                            {inquiry.contact_number}
                          </a>
                        </div>
                        
                        <div className="flex items-center text-gray-600">
                          <Building2 className="w-4 h-4 mr-2 text-gray-400" />
                          {inquiry.company_name}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-500 ml-4">
                      <Calendar className="w-4 h-4 mr-2" />
                      {formatDate(inquiry.created_at)}
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <p className="text-sm font-medium text-gray-700 mb-2">Message:</p>
                    <p className="text-gray-600 whitespace-pre-wrap">{inquiry.message}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
