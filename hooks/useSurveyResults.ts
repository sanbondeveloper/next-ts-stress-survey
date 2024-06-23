import { useEffect, useState } from 'react';
import { Result } from '@/types/user';

export function useSurveyResults() {
  const [surveyResults, setSurveyResults] = useState<Result[]>([]);

  useEffect(() => {
    const request = window.indexedDB.open('appDB');

    request.onerror = () => {};

    request.onsuccess = () => {
      const db = request.result;
      const transaction = db.transaction(['survey'], 'readonly');

      transaction.onerror = () => {};

      const objectStore = transaction.objectStore('survey');
      const getAllRequest = objectStore.getAll();

      getAllRequest.onsuccess = () => {
        setSurveyResults(getAllRequest.result);
      };
    };
  }, []);

  return surveyResults;
}
