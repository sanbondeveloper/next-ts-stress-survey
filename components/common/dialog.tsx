'use client';

import { useDialogStore } from '@/store/dialogState';

export default function Dialog() {
  const { state, close } = useDialogStore();
  const { title, description, open, children } = state;

  if (!open) return null;

  return (
    <div className="dialog-dimmed">
      <div className="dialog-content">
        <h1 className="mb-5 text-2xl font-bold">{title}</h1>
        {children && children}
        {!children && (
          <>
            <p className="mb-16">{description}</p>
            <div className="flex justify-center">
              <button onClick={close}>확인</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
