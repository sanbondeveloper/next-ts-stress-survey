import { atom } from 'recoil';

export const formState = atom<{ [key: string]: string[] | string }>({
  key: 'formState',
  default: {},
});
