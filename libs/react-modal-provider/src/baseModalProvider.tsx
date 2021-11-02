import * as React from 'react';
import eventEmitter from './eventEmitter';
import { State } from './reducer';
import { Modal } from './types';

type BaseModalProviderProps = {
  showModal: (...args: any[]) => void;
  hideModal: (...args: any[]) => void;
  state: State;
};

type ModalRendererProps = {
  modal: Modal;
  hideModal: (id: number, delayBeforeRemoveMsec: number) => void;
};

const ModalRenderer = React.memo(({ modal, hideModal }: ModalRendererProps) => {
  return (
    <modal.component
      {...modal.props}
      id={modal.id}
      hideModal={() => hideModal(modal.id, modal.delayBeforeRemoveMsec)}
      show={modal.show}
    />
  );
});

const BaseModalProvider = (props: BaseModalProviderProps) => {
  React.useEffect(() => {
    eventEmitter.on('showModal', (args: any[]) => props.showModal(...args));

    return () => {
      eventEmitter.removeListener('showModal');
    };
  }, []);

  return (
    <>
      {props.state.stack.map((modal) => (
        <ModalRenderer
          key={modal.id}
          modal={modal}
          hideModal={props.hideModal}
        />
      ))}
    </>
  );
};

export default BaseModalProvider;
