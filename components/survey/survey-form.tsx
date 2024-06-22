'use client';

import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { useRouter } from 'next/navigation';
import { userState } from '@/store/userState';
import { Question } from '@/types/question';
import MultiStepForm from '../form/multi-step-form';
import RadioGroup from '../form/radio-group';
import CheckboxGroup from '../form/checkbox-group';
import SubjectiveInput from '../form/subjective-input';

interface Props {
  questions: Question[];
}

export default function SurveyForm({ questions }: Props) {
  const user = useRecoilValue(userState);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace('/');
    }
  }, [user, router]);

  if (!user) return null;

  return (
    <MultiStepForm
      items={questions}
      keyFn={(item) => item.id.toString()}
      validationFn={(item, value) => {
        if (item.type === 'RADIO' && (!value || value?.length === 0)) return false;
        if (item.type === 'INPUT' && (!value || value?.length === 0)) return false;

        return true;
      }}
    >
      {(item) => {
        const { type } = item;

        if (type === 'RADIO') return <RadioGroup question={item} />;
        else if (type === 'CHECKBOX') return <CheckboxGroup question={item} />;
        else return <SubjectiveInput question={item} />;
      }}
    </MultiStepForm>
  );
}
