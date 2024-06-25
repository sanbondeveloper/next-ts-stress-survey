import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import jwt from 'jsonwebtoken';
import DashBoard from '@/components/dashboard/dashboard';

export default async function DashBoardPage() {
  const cookieStore = cookies();
  const token = cookieStore.get('accessToken')?.value;
  const secretKey = process.env.SECRET_KEY;

  if (!token) return redirect('/');
  if (!secretKey) throw new Error('시크릿 키 없음');

  jwt.verify(token, secretKey, (err) => {
    if (err) redirect('/');
  });

  return <DashBoard />;
}
