import './globals.css';

import type { Metadata } from 'next';
import { Noto_Sans_KR } from 'next/font/google';

import { Toaster } from '@/components/ui/sonner';

const notoSansKr = Noto_Sans_KR({
  variable: '--font-noto',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'YT-TMI (YouTube 댓글 감정 분석기)',
  description: 'YouTube 댓글 감정 분석기',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${notoSansKr.variable} antialiased`}>
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
