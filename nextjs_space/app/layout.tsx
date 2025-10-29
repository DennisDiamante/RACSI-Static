
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'

const inter = Inter({ subsets: ['latin'] })

export const dynamic = "force-dynamic"

const metadataBase = process.env.NEXTAUTH_URL 
  ? new URL(process.env.NEXTAUTH_URL) 
  : new URL('http://localhost:3000')

export const metadata: Metadata = {
  metadataBase,
  title: 'Radians Automation and Control Solutions, Inc.',
  description: 'Leading provider of industrial automation and electrical control solutions in the Philippines. Specializing in motor controllers, SCADA systems, PLC programming, and system integration.',
  keywords: 'industrial automation, electrical control solutions, motor controllers, PLC programming, SCADA systems, Philippines automation company',
  openGraph: {
    title: 'Radians Automation and Control Solutions, Inc.',
    description: 'Leading provider of industrial automation and electrical control solutions in the Philippines.',
    images: ['/og-image.png'],
    type: 'website',
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navigation />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
