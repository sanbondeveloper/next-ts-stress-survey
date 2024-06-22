import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import RecoilRootWrapper from '@/components/common/recoil-wrapper';
import Dialog from '@/components/common/dialog';

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
        <RecoilRootWrapper>
          <Dialog />
          {children}
        </RecoilRootWrapper>
      </body>
    </html>
  );
}
