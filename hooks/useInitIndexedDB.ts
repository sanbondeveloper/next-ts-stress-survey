import { useDialogStore } from '@/store/dialogState';
import { useEffect } from 'react';

export function useInitIndexedDB() {
  const { alert } = useDialogStore();

  useEffect(() => {
    const indexedDB = window.indexedDB;

    if (!indexedDB) {
      alert({ title: 'IndexedDB 오류', description: '해당 브라우저에서는 indexedDB를 지원하지 않습니다.' });
    } else {
      let db;
      const request = indexedDB.open('appDB');

      request.onupgradeneeded = () => {
        db = request.result;
        db.createObjectStore('survey', { keyPath: 'id', autoIncrement: true });
      };
    }
  }, [alert]);
}
