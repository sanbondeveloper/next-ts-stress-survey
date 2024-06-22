'use client';

import { formState } from '@/store/formState';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';

interface Props<T> {
  items: T[];
  keyFn: (item: T) => string;
  validationFn: (item: T, value: number[] | undefined) => boolean;
  children: (item: T) => React.ReactNode;
}

export default function MultiStepForm<T>({ items, keyFn, validationFn, children }: Props<T>) {
  const [step, setStep] = useState(0);
  const formValue = useRecoilValue(formState);
  const isValid = validationFn(items[step], formValue[`#${step + 1}`]);

  const containerStyle = {
    transform: `translateX(-${step * 100}%)`,
  };

  const handlePrev = () => {
    if (step === 0) return;

    setStep((prev) => prev - 1);
  };

  const handleNext = () => {
    if (step === items.length - 1) return;

    setStep((prev) => prev + 1);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form className="w-full px-2" onSubmit={handleSubmit}>
      <div className="w-full overflow-hidden">
        <div className="flex w-full" style={containerStyle}>
          {items.map((item) => (
            <div className="w-full flex-shrink-0 p-4" key={keyFn(item)}>
              {children(item)}
            </div>
          ))}
        </div>
      </div>
      <div className="flex w-full justify-between p-4">
        <button onClick={handlePrev} disabled={step === 0}>
          이전
        </button>
        <button onClick={handleNext} disabled={!isValid}>
          {step !== items.length - 1 ? '다음' : '제출'}
        </button>
      </div>
    </form>
  );
}
