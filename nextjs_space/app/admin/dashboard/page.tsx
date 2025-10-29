
'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { 
  MessageSquare, 
  FileText, 
  LogOut,
  Users,
  Settings 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { signOut } from 'next-auth/react';

export default function AdminDashboard() {
  const { data: session, status } = useSession() || {};
  const router = useRouter();

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600"></div>
      </div>
    );
  }

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' });
  };

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
                ← Back to Website
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
                <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                Welcome, <span className="font-medium">{session?.user?.name}</span>
              </div>
              <Button
                onClick={handleLogout}
                variant="outline"
                className="inline-flex items-center"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome to Admin Panel
          </h2>
          <p className="text-gray-600">
            Manage your website content and inquiries from here
          </p>
        </div>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Inquiries Card */}
          <Link href="/admin/inquiries">
            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-yellow-400">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <MessageSquare className="w-8 h-8 text-blue-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Contact Inquiries
              </h3>
              <p className="text-gray-600 text-sm">
                View and manage all contact form submissions
              </p>
            </Card>
          </Link>

          {/* About Us Editor Card */}
          <Link href="/admin/about-us">
            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-yellow-400">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-green-100 p-3 rounded-lg">
                  <FileText className="w-8 h-8 text-green-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Edit About Us
              </h3>
              <p className="text-gray-600 text-sm">
                Update the About Us page content
              </p>
            </Card>
          </Link>

          {/* Projects Management Card */}
          <Link href="/admin/projects">
            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-yellow-400">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <FileText className="w-8 h-8 text-purple-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Manage Projects
              </h3>
              <p className="text-gray-600 text-sm">
                Add, edit, or remove project references
              </p>
            </Card>
          </Link>

          {/* Settings Card (Placeholder) */}
          <Card className="p-6 opacity-50 cursor-not-allowed border-2">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-gray-100 p-3 rounded-lg">
                <Settings className="w-8 h-8 text-gray-600" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Settings
            </h3>
            <p className="text-gray-600 text-sm">
              Coming soon...
            </p>
          </Card>
        </div>

        {/* Recent Activity Section */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Quick Stats</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100">
              <p className="text-sm text-gray-600 mb-1">Website Status</p>
              <p className="text-3xl font-bold text-blue-600">Active</p>
            </Card>
            <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100">
              <p className="text-sm text-gray-600 mb-1">Last Updated</p>
              <p className="text-lg font-semibold text-green-600">Today</p>
            </Card>
            <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100">
              <p className="text-sm text-gray-600 mb-1">Admin Access</p>
              <p className="text-lg font-semibold text-purple-600">Full Control</p>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
