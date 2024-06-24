import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import DashBoard from '@/components/dashboard/dashboard';

export default function DashBoardPage() {
  const cookieStore = cookies();
  const hasCookie = cookieStore.has('accessToken');

  if (!hasCookie) redirect('/');

  return <DashBoard />;
}
