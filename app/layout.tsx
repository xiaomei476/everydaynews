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
  title: '焊点 · 生产性新闻阅读器',
  description: '面向电子信息学习者的近 72 小时生产性新闻与逐步产业逻辑分析。',
  keywords: ['人工智能', '电子行业', '半导体', '先进制造', '能源电网', '生产性新闻', '产业政策', '经济数据'],
  openGraph: {
    title: '焊点 · 生产性新闻阅读器',
    description: '从新闻事实逐步推到产业判断，并在新闻内持续验证。',
    type: 'website',
    locale: 'zh_CN',
    images: [{ url: publicAsset('/og.png'), width: 1200, height: 630, alt: '焊点 · 生产性新闻雷达' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '焊点 · 生产性新闻阅读器',
    description: '近 72 小时人工智能、电子、制造、能源与规则新闻的学习型分析。',
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

