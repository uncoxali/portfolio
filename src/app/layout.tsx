import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import SmoothScrolling from '@/components/SmoothScrolling';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Ali Mohammadi | Senior Frontend Developer',
  description:
    'Professional portfolio of Ali Mohammadi, a skilled Senior Frontend Developer with 6+ years of experience in React, Next.js, and TypeScript',
  keywords: 'Frontend Developer, React, Next.js, TypeScript, Portfolio, JavaScript, UI/UX',
  authors: [{ name: 'Ali Mohammadi' }],
  creator: 'Ali Mohammadi',
  openGraph: {
    title: 'Ali Mohammadi | Senior Frontend Developer',
    description: 'Professional portfolio showcasing 6+ years of experience in frontend development',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ali Mohammadi | Senior Frontend Developer',
    description: 'Professional portfolio showcasing 6+ years of experience in frontend development',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${inter.className} bg-dark-bg text-white overflow-x-hidden`}>
        <SmoothScrolling>
          {children}
        </SmoothScrolling>
      </body>
    </html>
  );
}