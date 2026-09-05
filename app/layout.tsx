import type { Metadata } from 'next';
import './globals.css';

const isStaticMirror = process.env.STATIC_EXPORT === 'true';
const mirrorBasePath = process.env.GITHUB_PAGES_BASE_PATH || '/everydaynews';
const siteOrigin = isStaticMirror
  ? 'https://xiaomei476.github.io/'
  : 'https://solder-daily-radar.true-fairy-7392.chatgpt.site/';
const publicAsset = (path: string) => (isStaticMirror ? `${mirrorBasePath}${path}` : path);

export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin),
  title: '焊点 · 生产性新闻雷达',
  description: '面向电子爱好者的人工智能、电子、制造、能源、政策与经济每日生产情报。',
  keywords: ['人工智能', '电子行业', '半导体', '先进制造', '能源电网', '生产性新闻', '产业政策', '经济数据'],
  openGraph: {
    title: '焊点 · 生产性新闻雷达',
    description: '按行业阅读变化，持续验证产业承诺是否兑现。',
    type: 'website',
    locale: 'zh_CN',
    images: [{ url: publicAsset('/og.png'), width: 1200, height: 630, alt: '焊点 · 生产性新闻雷达' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '焊点 · 生产性新闻雷达',
    description: '人工智能、电子、制造、能源、政策与数据的每日高密度简报。',
    images: [publicAsset('/og.png')],
  },
  icons: { icon: publicAsset('/icon.svg') },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
