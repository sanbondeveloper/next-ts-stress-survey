'use client';

import { userState } from '@/store/userState';
import { useRecoilValue } from 'recoil';

export default function SurveyPage() {
  const user = useRecoilValue(userState);

  return <div>SurveyPage</div>;
}
