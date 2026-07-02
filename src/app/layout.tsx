import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: 'Tirenify | Digital Exposure Awareness',
  description:
    'Tirenify helps you understand if your email appears in public breach records and gives you privacy-aware guidance to protect your identity.',
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.jpg',
  },
  openGraph: {
    type: 'website',
    url: 'https://tirenify.netlify.app/',
    siteName: 'Tirenify',
    title: 'Tirenify | Digital Exposure Awareness',
    description:
      'Tirenify helps you understand if your email appears in public breach records and gives you privacy-aware guidance to protect your identity.',
    locale: 'en_GB',
    images: [
      {
        url: 'https://tirenify.netlify.app/favicon.jpg',
        width: 1200,
        height: 630,
        alt: 'Tirenify — Know if your data has been breached',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@tirenify',
    creator: '@tirenify',
    title: 'Tirenify | Digital Exposure Awareness',
    description:
      'Tirenify helps you understand if your email appears in public breach records and gives you privacy-aware guidance to protect your identity.',
    images: [
      {
        url: 'https://tirenify.netlify.app/favicon.jpg',
        alt: 'Tirenify — Know if your data has been breached',
      },
    ],
  },
  themeColor: '#09090b',
  authors: [{ name: 'Daniel Adeleye' }],
  robots: 'index, follow',
  canonical: 'https://tirenify.netlify.app/',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
