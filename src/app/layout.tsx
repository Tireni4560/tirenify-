import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: 'Tirenify | Digital Exposure Awareness',
  description:
    'Tirenify helps you understand if your email appears in public breach records and gives you privacy-aware guidance to protect your identity.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
