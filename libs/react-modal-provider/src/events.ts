import * as React from 'react';
import eventEmitter from './eventEmitter';
import { ModalProps } from './types';

export type ModalPropsArg<T> = T extends React.ElementType<infer P>
  ? [Omit<P, keyof ModalProps>]
  : [never?];

export const showModal = <T extends React.ElementType>(
  component: T,
  ...args: ModalPropsArg<T>
) => eventEmitter.emit('showModal', [component, ...args]);

export default showModal;
