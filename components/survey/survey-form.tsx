'use client';

import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useRouter } from 'next/navigation';
import { useDialogStore } from '@/store/dialogState';
import { userState } from '@/store/userState';
import { formState } from '@/store/formState';
import { Question } from '@/types/question';
import MultiStepForm from '../form/multi-step-form';
import RadioGroup from '../form/radio-group';
import CheckboxGroup from '../form/checkbox-group';
import SubjectiveInput from '../form/subjective-input';
import AuthForm from '../dashboard/auth-form';

interface Props {
  questions: Question[];
}

export default function SurveyForm({ questions }: Props) {
  const user = useRecoilValue(userState);
  const [formValues, setFormValues] = useRecoilState(formState);
  const router = useRouter();
  const { alert, prompt } = useDialogStore();

  useEffect(() => {
    if (!user) {
      router.replace('/');
    }
  }, [user, router]);

  if (!user) return null;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user) return;

    const values = Object.values(formValues);
    const totalScore = values.reduce((acc, value) => {
      if (typeof value === 'string') {
        return (acc += +value);
      } else {
        return (acc += value.reduce((acc, value) => acc + +value, 0));
      }
    }, 0);

    const request = window.indexedDB.open('appDB');
    request.onerror = () => {
      alert({
        title: 'indexedDB 오류',
        description: '예기치 못한 오류가 발생했습니다. 잠시 후 다시 시도해주세요',
      });
    };

    request.onsuccess = () => {
      const db = request.result;
      const transaction = db.transaction(['survey'], 'readwrite');

      transaction.oncomplete = () => {
        setFormValues({});
        prompt({
          title: '제출 완료',
          children: <AuthForm />,
        });
      };

      transaction.onerror = () => {
        alert({
          title: '제출 실패',
          description: '예기치 못한 오류가 발생했습니다. 잠시 후 다시 시도해주세요',
        });
      };

      const objStore = transaction.objectStore('survey');
      objStore.add({ team: user.team, name: user.name, score: totalScore });
    };
  };

  return (
    <MultiStepForm
      items={questions}
      keyFn={(item) => item.id.toString()}
      validationFn={(item, step) => {
        const value = formValues[`#${step + 1}`];

        if (item.type === 'RADIO' && (!value || value?.length === 0)) return false;
        if (item.type === 'INPUT' && (!value || value?.length === 0)) return false;

        return true;
      }}
      onSubmit={handleSubmit}
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
