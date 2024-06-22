'use client';

import { Question } from '@/types/question';
import MultiStepForm from '../form/multi-step-form';
import RadioGroup from '../form/radio-group';
import CheckboxGroup from '../form/checkbox-group';

interface Props {
  questions: Question[];
}

export default function SurveyForm({ questions }: Props) {
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
        else return <CheckboxGroup question={item} />;
      }}
    </MultiStepForm>
  );
}
