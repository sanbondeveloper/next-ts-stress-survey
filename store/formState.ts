import { atom } from 'recoil';

export const formState = atom<{ [key: string]: number[] }>({
  key: 'formState',
  default: {},
});
