'use client';

import { useState } from 'react';

interface Props<T> {
  items: T[];
  keyFn: (item: T) => string;
  children: (item: T) => React.ReactNode;
}

export default function MultiStepForm<T>({ items, keyFn, children }: Props<T>) {
  const [step, setStep] = useState(0);

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
    <form className="max-w-[1024px] px-4" onSubmit={handleSubmit}>
      <div className="w-full overflow-hidden">
        <div className="flex w-full" style={containerStyle}>
          {items.map((item) => (
            <div className="w-full flex-shrink-0 flex-grow basis-full p-4" key={keyFn(item)}>
              {children(item)}
            </div>
          ))}
        </div>
      </div>
      <div className="flex w-full justify-between p-4">
        <button onClick={handlePrev} disabled={step === 0}>
          이전
        </button>
        <button onClick={handleNext}>{step !== items.length - 1 ? '다음' : '제출'}</button>
      </div>
    </form>
  );
}
