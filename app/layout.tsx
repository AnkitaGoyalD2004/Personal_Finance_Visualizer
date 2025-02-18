import { cn } from '@/lib/utils';
import '@/styles/globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from './components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Personal Finance Visualizer',
  description: 'A simple web application for tracking personal finances',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn(inter.className, 'bg-gray-50 text-gray-900')}>
        <div className="flex h-screen">
          {/* Sidebar */}
          <div className="flex flex-col flex-1">
            {/* Navbar */}
            <Navbar />
            {/* Main Content */}
            <main className="flex-1 p-6 overflow-auto">
              {/* Add logic to render Dashboard page */}
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
