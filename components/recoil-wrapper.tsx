'use client';

import { RecoilRoot } from 'recoil';
import React from 'react';

interface Props {
  children: React.ReactNode;
}

export default function RecoilRootWrapper({ children }: Props) {
  return <RecoilRoot>{children}</RecoilRoot>;
}
