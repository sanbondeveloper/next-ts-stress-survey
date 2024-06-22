import { atom, useRecoilState } from 'recoil';
import { Dialog } from '@/types/dialog';

export const dialogState = atom<Dialog>({
  key: 'dialogState',
  default: {
    title: '',
    description: '',
    open: false,
  },
});

export const useDialogStore = () => {
  const [state, setState] = useRecoilState(dialogState);

  const close = () => {
    setState({ ...state, open: false, title: '', description: '' });
    state.onClose?.();
  };

  const setAttributes = ({
    title,
    description,
    onClose,
  }: {
    title: string;
    description: string;
    onClose?: () => void;
  }) => {
    setState({ ...state, open: true, title, description, onClose });
  };

  const confirm = (title: string, description = '') => {
    // setAttributes(title, description);
  };

  const alert = ({ title, description, onClose }: { title: string; description: string; onClose?: () => void }) => {
    setAttributes({ title, description, onClose });
  };

  const prompt = (title: string, description = '') => {
    // setAttributes(title, description);
  };

  return {
    state,
    confirm,
    alert,
    prompt,
    close,
  };
};
