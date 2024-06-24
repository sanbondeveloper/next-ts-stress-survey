'use client';

import { useState } from 'react';

interface Props<T> {
  items: T[];
  keyFn: (item: T) => string;
  validationFn: (item: T, step: number) => boolean;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  children: (item: T) => React.ReactNode;
}

export default function MultiStepForm<T>({ items, keyFn, validationFn, onSubmit, children }: Props<T>) {
  const [step, setStep] = useState(0);
  const isValid = validationFn(items[step], step);

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

  return (
    <form className="w-full px-2" onSubmit={onSubmit}>
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
        <button type="button" onClick={handlePrev} disabled={step === 0}>
          이전
        </button>
        <button type={step !== items.length - 1 ? 'button' : 'submit'} onClick={handleNext} disabled={!isValid}>
          {step !== items.length - 1 ? '다음' : '제출'}
        </button>
      </div>
    </form>
  );
}
