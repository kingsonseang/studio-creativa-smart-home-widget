import type { Metadata } from 'next';
import { campton } from '@/fonts/config';
import './globals.css';

export const metadata: Metadata = {
  title: 'Smart Home Widgets',
  description: 'Smart Home Widgets by @Techymunched for Studio Creativa',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${campton.variable} antialiased`}>{children}</body>
    </html>
  );
}
