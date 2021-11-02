import * as React from 'react';
import { DELAY_BEFORE_REMOVE_MSEC } from './constants';
import { ModalProps } from './types';

export const ActionType = {
  SHOW: '@react-modal-provider.show',
  HIDE: '@react-modal-provider.hide',
  REMOVE: '@react-modal-provider.remove',
};

export type ShowModalAction = {
  type: typeof ActionType.SHOW;
  component: React.ElementType<ModalProps>;
  props: object;
  delayBeforeRemoveMsec: number;
};

export type HideModalAction = {
  type: typeof ActionType.HIDE;
  id: number;
};

export type RemoveModalAction = {
  type: typeof ActionType.HIDE;
  id: number;
};

export type Actions = ShowModalAction | HideModalAction | RemoveModalAction;

export const showModal = <T extends {}>(
  component: React.ElementType<ModalProps>,
  props: T,
  delayBeforeRemoveMsec: number = DELAY_BEFORE_REMOVE_MSEC
): ShowModalAction | undefined => {
  if (!component) {
    return undefined;
  }

  return {
    type: ActionType.SHOW,
    component,
    props,
    delayBeforeRemoveMsec,
  };
};

export const hideModal = (id: number) => ({
  type: ActionType.HIDE,
  id,
});

export const removeModal = (id: number) => ({
  type: ActionType.REMOVE,
  id,
});
