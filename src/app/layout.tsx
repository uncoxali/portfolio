import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import SmoothScrolling from '@/components/SmoothScrolling';
import { ThemeProvider } from '@/components/ThemeProvider';
import CookieConsent from '@/components/CookieConsent';
import PWAInstaller from '@/components/PWAInstaller';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true
});

export const metadata: Metadata = {
  title: {
    default: 'Ali Mohammadi | Senior Frontend Developer',
    template: '%s | Ali Mohammadi'
  },
  description:
    'Professional portfolio of Ali Mohammadi, a skilled Senior Frontend Developer with 6+ years of experience in React, Next.js, and TypeScript. Specializing in creating exceptional digital experiences.',
  keywords: 'Frontend Developer, React, Next.js, TypeScript, Portfolio, JavaScript, UI/UX, Senior Developer, Web Development, Iran Developer',
  authors: [{ name: 'Ali Mohammadi', url: 'https://github.com/alimohamadi' }],
  creator: 'Ali Mohammadi',
  publisher: 'Ali Mohammadi',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    }
  },
  openGraph: {
    title: 'Ali Mohammadi | Senior Frontend Developer',
    description: 'Professional portfolio showcasing 6+ years of experience in frontend development with React, Next.js, and TypeScript',
    type: 'website',
    locale: 'en_US',
    url: 'https://your-portfolio-url.com',
    siteName: 'Ali Mohammadi Portfolio',
    images: [
      {
        url: 'https://your-portfolio-url.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Ali Mohammadi - Senior Frontend Developer'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ali Mohammadi | Senior Frontend Developer',
    description: 'Professional portfolio showcasing 6+ years of experience in frontend development with React, Next.js, and TypeScript',
    creator: '@alimohamadi',
    images: ['https://your-portfolio-url.com/twitter-image.jpg']
  },
  alternates: {
    canonical: 'https://your-portfolio-url.com'
  },
  verification: {
    google: 'your-google-verification-code'
  },
  metadataBase: new URL('https://your-portfolio-url.com'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className='scroll-smooth'>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#6366f1" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Ali Mohammadi",
              "url": "https://your-portfolio-url.com",
              "image": "https://your-portfolio-url.com/profile.jpg",
              "jobTitle": "Senior Frontend Developer",
              "worksFor": {
                "@type": "Organization",
                "name": "Freelance"
              },
              "sameAs": [
                "https://github.com/alimohamadi",
                "https://www.linkedin.com/in/ali-mohammadi20",
                "https://twitter.com/alimohamadi"
              ]
            })
          }}
        />
      </head>
      <body 
        className={`${inter.className} bg-dark-bg text-white overflow-x-hidden`}
        aria-label="Portfolio of Ali Mohammadi"
      >
        <ThemeProvider>
          <SmoothScrolling>
            {children}
          </SmoothScrolling>
          <CookieConsent />
          <PWAInstaller />
        </ThemeProvider>
      </body>
    </html>
  );
}