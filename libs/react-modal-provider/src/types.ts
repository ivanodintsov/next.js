export type ModalProps = {
  id: number;
  hideModal: () => void;
  show: boolean;
};

export type Modal = {
  id: number;
  component: React.ElementType<ModalProps>;
  props: object;
  show: boolean;
  delayBeforeRemoveMsec: number;
};

export type Stack = Modal[];
