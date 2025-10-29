
'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  RefreshCw,
  MessageSquare,
  Mail,
  LogOut,
  Trash2,
  CheckCircle2,
  XCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { signOut } from 'next-auth/react';

interface Inquiry {
  id: number;
  name: string;
  email: string;
  company_name: string;
  contact_number: string;
  message: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export default function AdminInquiriesPage() {
  const { data: session, status } = useSession() || {};
  const router = useRouter();
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    unanswered: 0,
    answered: 0,
  });

  const fetchInquiries = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/inquiries');
      const data = await response.json();

      if (data.success) {
        setInquiries(data.inquiries);
        const answered = data.inquiries.filter(
          (i: Inquiry) => i.status === 'answered'
        ).length;
        const unanswered = data.inquiries.filter(
          (i: Inquiry) => i.status === 'unanswered'
        ).length;

        setStats({
          total: data.count,
          answered,
          unanswered,
        });
      }
    } catch (error) {
      console.error('Error fetching inquiries:', error);
      toast.error('Failed to load inquiries');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: number, newStatus: string) => {
    try {
      const response = await fetch(`/api/admin/inquiries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        toast.success(`Inquiry marked as ${newStatus}`);
        fetchInquiries();
      } else {
        toast.error('Failed to update status');
      }
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Failed to update status');
    }
  };

  const deleteInquiry = async (id: number) => {
    if (!confirm('Are you sure you want to delete this inquiry?')) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/inquiries/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success('Inquiry deleted successfully');
        fetchInquiries();
      } else {
        toast.error('Failed to delete inquiry');
      }
    } catch (error) {
      console.error('Error deleting inquiry:', error);
      toast.error('Failed to delete inquiry');
    }
  };

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' });
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-600"></div>
          <p className="mt-4 text-gray-600">Loading inquiries...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                href="/admin/dashboard"
                className="inline-flex items-center text-gray-600 hover:text-yellow-600 transition-colors"
              >
                ← Back to Dashboard
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
                <h1 className="text-xl font-bold text-gray-900">
                  Inquiry Management
                </h1>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Button
                onClick={fetchInquiries}
                variant="outline"
                className="inline-flex items-center"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
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
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Contact Form Inquiries
          </h2>
          <p className="text-gray-600">
            View and manage all inquiries submitted through the contact form
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Inquiries</p>
                <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
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
                  {stats.unanswered}
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
                  {stats.answered}
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <Mail className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Inquiries List */}
        <div className="space-y-4">
          {inquiries.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-12 text-center">
              <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No inquiries found</p>
            </div>
          ) : (
            inquiries.map((inquiry) => (
              <div
                key={inquiry.id}
                className="bg-white rounded-lg shadow hover:shadow-md transition-shadow p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {inquiry.name}
                    </h3>
                    <Badge
                      variant={
                        inquiry.status === 'answered' ? 'default' : 'secondary'
                      }
                      className={
                        inquiry.status === 'answered'
                          ? 'bg-green-100 text-green-700 hover:bg-green-200'
                          : 'bg-orange-100 text-orange-700 hover:bg-orange-200'
                      }
                    >
                      {inquiry.status === 'answered' ? 'Answered' : 'Unanswered'}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-500">
                    {new Date(inquiry.created_at).toLocaleString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                      hour: 'numeric',
                      minute: '2-digit',
                      hour12: true,
                    })}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 text-sm">
                  <div className="flex items-center text-gray-600">
                    <Mail className="w-4 h-4 mr-2" />
                    <a
                      href={`mailto:${inquiry.email}`}
                      className="hover:text-yellow-600"
                    >
                      {inquiry.email}
                    </a>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <span className="mr-2">📞</span>
                    <a
                      href={`tel:${inquiry.contact_number}`}
                      className="hover:text-yellow-600"
                    >
                      {inquiry.contact_number}
                    </a>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <span className="mr-2">🏢</span>
                    {inquiry.company_name}
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    Message:
                  </p>
                  <p className="text-gray-600 bg-gray-50 p-3 rounded">
                    {inquiry.message}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-2 pt-4 border-t border-gray-200">
                  {inquiry.status === 'unanswered' ? (
                    <Button
                      onClick={() => updateStatus(inquiry.id, 'answered')}
                      variant="outline"
                      size="sm"
                      className="text-green-600 hover:bg-green-50"
                    >
                      <CheckCircle2 className="w-4 h-4 mr-1" />
                      Mark as Answered
                    </Button>
                  ) : (
                    <Button
                      onClick={() => updateStatus(inquiry.id, 'unanswered')}
                      variant="outline"
                      size="sm"
                      className="text-orange-600 hover:bg-orange-50"
                    >
                      <XCircle className="w-4 h-4 mr-1" />
                      Mark as Unanswered
                    </Button>
                  )}
                  <Button
                    onClick={() => deleteInquiry(inquiry.id)}
                    variant="outline"
                    size="sm"
                    className="text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
