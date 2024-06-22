import { atom } from 'recoil';

export const formState = atom<{ [key: string]: number[] | string }>({
  key: 'formState',
  default: {},
});
