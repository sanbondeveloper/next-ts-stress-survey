import { atom, useRecoilState } from 'recoil';
import { Dialog } from '@/types/dialog';

export const dialogState = atom<Dialog>({
  key: 'dialogState',
  default: {
    title: '',
    open: false,
  },
});

export const useDialogStore = () => {
  const [state, setState] = useRecoilState(dialogState);

  const close = () => {
    setState({ open: false, title: '' });
    state.onClose?.();
  };

  const setAttributes = ({
    title,
    description,
    children,
    onClose,
  }: {
    title: string;
    description?: string;
    children?: React.ReactNode;
    onClose?: () => void;
  }) => {
    setState({ ...state, open: true, title, description, children, onClose });
  };

  const alert = ({ title, description, onClose }: { title: string; description: string; onClose?: () => void }) => {
    setAttributes({ title, description, onClose });
  };

  const prompt = ({ title, children }: { title: string; children: React.ReactNode }) => {
    setAttributes({ title, children });
  };

  return {
    state,
    alert,
    prompt,
    close,
  };
};
