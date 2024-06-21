'use client';

import { Question } from '@/types/question';
import MultiStepForm from '../form/multi-step-form';

interface Props {
  questions: Question[];
}

export default function SurveyForm({ questions }: Props) {
  return (
    <main>
      <MultiStepForm items={questions} keyFn={(item) => item.id.toString()}>
        {(item) => <>{`${item.id}. ${'문제'.repeat(50)}`}</>}
      </MultiStepForm>
    </main>
  );
}
