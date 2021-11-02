import {
  Actions,
  ActionType,
  HideModalAction,
  RemoveModalAction,
  ShowModalAction,
} from './action';
import { Modal, Stack } from './types';

export type State = {
  stack: Stack;
};

export const initialState: State = {
  stack: [],
};

const showModalHandler = (state: State, action: ShowModalAction) => {
  return {
    ...state,
    stack: [
      ...state.stack,
      {
        id: new Date().valueOf(),
        component: action.component,
        props: action.props,
        show: true,
        delayBeforeRemoveMsec: action.delayBeforeRemoveMsec,
      },
    ],
  };
};

const hideModalHandler = (state: State, action: HideModalAction) => {
  const targetModal = state.stack.find(
    (modal: Modal) => modal.id === action.id
  );

  if (!targetModal) {
    return state;
  }

  return {
    ...state,
    stack: [
      ...state.stack.filter(
        (modal) => state.stack.indexOf(modal) < state.stack.indexOf(targetModal)
      ),
      {
        ...targetModal,
        show: false,
      },
      ...state.stack.filter(
        (modal) => state.stack.indexOf(modal) > state.stack.indexOf(targetModal)
      ),
    ],
  };
};

const removeModalHandler = (state: State, action: RemoveModalAction) => {
  return {
    ...state,
    stack: state.stack.filter((modal) => modal.id !== action.id),
  };
};

const reducer = (state: State, action: Actions): State => {
  switch (action?.type) {
    case ActionType.SHOW:
      return showModalHandler(state, action as ShowModalAction);

    case ActionType.HIDE:
      return hideModalHandler(state, action as HideModalAction);

    case ActionType.REMOVE:
      return removeModalHandler(state, action as RemoveModalAction);

    default:
      return state;
  }
};

export default reducer;
