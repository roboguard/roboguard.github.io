import type { Metadata } from 'next';
import { BaseTemplate } from '@/template/BaseTemplate';
import { IBM_Plex_Mono } from 'next/font/google';
import '@/styles/global.css';

export const metadata: Metadata = {
  icons: [
    {
      rel: 'apple-touch-icon',
      url: '/apple-touch-icon.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      url: '/favicon-32x32.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      url: '/favicon-16x16.png',
    },
    {
      rel: 'icon',
      url: '/favicon.ico',
    },
  ],
};

const ibm = IBM_Plex_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-ibm',
  weight: ['400', '700'],
});

export default async function RootLayout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  return (
    <html lang="eng" className={ibm.variable}>
      <body suppressHydrationWarning>
        <BaseTemplate leftNav={[]} rightNav={[]}>
          <div className="py-5 text-xl [&_p]:my-6">{props.children}</div>
        </BaseTemplate>
      </body>
    </html>
  );
}
