import { BaseModalProps } from 'react-overlays/Modal';

export interface BootstrapModalProps
  extends Omit<
    BaseModalProps,
    | 'role'
    | 'renderBackdrop'
    | 'renderDialog'
    | 'transition'
    | 'backdropTransition'
  > {
  size?: 'sm' | 'lg' | 'xl';
  bsPrefix?: string;
  centered?: boolean;
  backdropClassName?: string;
  animation?: boolean;
  dialogClassName?: string;
  contentClassName?: string;
  dialogAs?: React.ElementType;
  scrollable?: boolean;
}

export type ModalProps = Omit<BootstrapModalProps, 'open' | 'onHide'> & {
  show: boolean;
  closable?: boolean;
  hideModal: () => {};
  onClose?: (...args: any[]) => {};
};
