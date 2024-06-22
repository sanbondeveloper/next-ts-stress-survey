export interface Dialog {
  title: string;
  description: string;
  open: boolean;
  onClose?: () => void;
}
