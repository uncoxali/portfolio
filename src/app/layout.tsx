import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import SmoothScrolling from '@/components/SmoothScrolling';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Ali Mohammadi | Frontend Developer',
  description:
    'Professional portfolio of Ali Mohammadi, a skilled Frontend Developer with 6+ years of experience',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${inter.className} bg-dark-bg text-white overflow-x-hidden`}>
        <SmoothScrolling>{children}</SmoothScrolling>
      </body>
    </html>
  );
}
