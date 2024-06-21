import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import RecoilRootWrapper from '@/components/recoil-wrapper';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '스트레스 자가진단',
  description: '스스로 스트레스를 진단해보세요',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <RecoilRootWrapper>{children}</RecoilRootWrapper>
      </body>
    </html>
  );
}
