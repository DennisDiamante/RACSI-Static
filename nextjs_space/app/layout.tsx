
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import { Providers } from '@/components/providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Radians Automation and Control Solutions, Inc.',
  description:
    'Leading provider of industrial automation and electrical control solutions in the Philippines. Specializing in motor controllers, SCADA systems, PLC programming, and system integration.',
  keywords:
    'industrial automation, electrical control solutions, motor controllers, PLC programming, SCADA systems, Philippines automation company',
  openGraph: {
    title: 'Radians Automation and Control Solutions, Inc.',
    description:
      'Leading provider of industrial automation and electrical control solutions in the Philippines.',
    images: ['/og-image.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Radians Automation and Control Solutions, Inc.',
    description:
      'Leading provider of industrial automation and electrical control solutions in the Philippines.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Navigation />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
