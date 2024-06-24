export interface Dialog {
  title: string;
  description?: string;
  children?: React.ReactNode;
  open: boolean;
  onClose?: () => void;
}
