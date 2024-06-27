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

  const itemStyle = (index: number) => ({
    display: step === index ? 'block' : 'none',
  });

  const handlePrev = () => {
    if (step === 0) return;

    setStep((prev) => prev - 1);
  };

  const handleNext = () => {
    if (step === items.length - 1 || !isValid) return;

    setStep((prev) => prev + 1);
  };

  return (
    <form className="w-full px-2" onSubmit={onSubmit}>
      <div className="w-full overflow-hidden">
        <div className="flex w-full">
          {items.map((item, index) => (
            <div key={keyFn(item)} className="w-full flex-shrink-0 p-4" style={itemStyle(index)}>
              {children(item)}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-10 flex w-full justify-between p-4">
        <button type="button" onClick={handlePrev} disabled={step === 0}>
          이전
        </button>
        <div className="flex items-center justify-center text-lg font-bold text-white">
          {step + 1} / {items.length}
        </div>
        {step !== items.length - 1 && (
          <button type="button" onClick={handleNext} disabled={!isValid}>
            다음
          </button>
        )}
        {step === items.length - 1 && (
          <button type="submit" disabled={!isValid}>
            제출
          </button>
        )}
      </div>
    </form>
  );
}
