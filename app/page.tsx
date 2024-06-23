'use client';

import UserForm from '@/components/user/user-form';
import { useInitIndexedDB } from '@/hooks/useInitIndexedDB';

export default function Home() {
  useInitIndexedDB();

  return <UserForm />;
}
