import * as React from 'react';
import Modal from 'react-bootstrap/Modal';
import { ModalProps } from './ModalProps';
export type { ModalProps } from './ModalProps';
import cx from 'classnames';
import css from './Modal.module.scss';
import { Close } from './Close';

export const ModalBase: React.FC<ModalProps> = ({
  children,
  show,
  hideModal,
  className,
  onClose,
  closable,
  ...props
}) => {
  const onCloseHandler = (...args) => {
    if (closable) {
      hideModal();
    }

    if (onClose) {
      onClose(...args);
    }
  };

  return (
    <Modal
      show={show}
      onHide={onCloseHandler}
      {...props}
      className={cx(css.root, className)}
    >
      <Close onClick={hideModal} />
      {children}
    </Modal>
  );
};

ModalBase.defaultProps = {
  closable: true,
};
