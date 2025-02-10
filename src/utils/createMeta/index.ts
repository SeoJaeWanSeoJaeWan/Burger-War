import { Metadata } from 'next';

const client = process.env.NEXT_PUBLIC_CLIENT;

const createMeta = ({
  title = '',
  description,
}: {
  title?: string;
  description: string;
}): Metadata => ({
  title: `NEU${title}`,
  description,
  keywords: '프론트엔드, 프로그래밍, 개발, 포트폴리오, 서재완, React, Next.js',
  verification: {
    google: 'xDw6n-eYm5QL9k9bksfKbS7_HgYWxkLNr2dj-cQ3Eeo',
    other: {
      'naver-site-verification': '97b412d0cd322b753727cba1112cef71ca195bc8',
    },
  },
  openGraph: {
    title: `NEU${title}`,
    description,
    type: 'website',
    images: { url: `${client}/assets/common/ogimage.png` },
  },
  twitter: {
    title: `NEU${title}`,
    description,
    card: 'summary_large_image',
    images: { url: `${client}/assets/common/ogimage.png` },
  },

  applicationName: 'NEU',
  appleWebApp: {
    capable: true,
    title: `NEU`,
    statusBarStyle: 'default',
  },
});

export default createMeta;
