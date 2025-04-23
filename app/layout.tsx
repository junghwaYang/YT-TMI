import './globals.css';

import type { Metadata } from 'next';
import { Noto_Sans_KR } from 'next/font/google';

import { Toaster } from '@/components/ui/sonner';

const notoSansKr = Noto_Sans_KR({
  variable: '--font-noto',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  icons: {
    icon: '/favicon.png',
  },
  title: 'YT-TMI | 유튜브 댓글 감정 분석기',
  description:
    'YouTube 댓글을 감정 분석하고, 긍정/부정/중립으로 시각화하는 웹 앱입니다. 유튜브 영상의 분위기를 한눈에 파악해보세요!',
  keywords: ['YouTube', '댓글', '감정 분석', 'YT-TMI', 'AI 분석기'],
  authors: [
    { name: 'junghwaYang', url: 'https://github.com/junghwaYang/YT-TMI' },
  ],
  creator: 'Lua',
  metadataBase: new URL('https://YT-TMI.vercel.app/'), // 배포 후 도메인
  openGraph: {
    title: 'YT-TMI | 유튜브 댓글 감정 분석기',
    description:
      '유튜브 댓글을 긍정/부정/중립으로 분석하고 시각화합니다. 분위기를 한눈에 확인해보세요!',
    url: 'https://YT-TMI.vercel.app/',
    siteName: 'YT-TMI',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'YT-TMI 감정 분석 미리보기',
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'YT-TMI | 유튜브 댓글 감정 분석기',
    description:
      '유튜브 댓글을 감정 분석하고, 긍정/부정/중립으로 시각화하는 웹앱입니다.',
    images: ['/og-image.png'],
    creator: '@your_twitter_handle',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${notoSansKr.variable} antialiased`}>
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
