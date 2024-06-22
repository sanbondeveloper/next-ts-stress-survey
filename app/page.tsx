'use client';

import UserForm from '@/components/user/user-form';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    const indexedDB = window.indexedDB;

    if (!indexedDB) window.alert('해당 브라우저에서는 indexedDB를 지원하지 않습니다.');
    else {
      let db;
      const request = indexedDB.open('appDB');

      request.onupgradeneeded = () => {
        db = request.result;
        db.createObjectStore('survey', { keyPath: 'id', autoIncrement: true });
        // store.createIndex('by_team', 'team');
      };
    }
  }, []);

  return <UserForm />;
}
