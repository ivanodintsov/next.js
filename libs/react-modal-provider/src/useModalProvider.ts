import * as React from 'react';
import { DELAY_BEFORE_REMOVE_MSEC } from './constants';
import reducer, { initialState } from './reducer';
import * as actions from './action';

const useDispatch = (dispatch: React.Dispatch<any>, action: any, deps: any[]) =>
  React.useMemo(
    () =>
      (...args: any[]) =>
        dispatch(action(...args)),
    deps
  );

type useHideModalArgs = {
  dispatch: React.Dispatch<actions.Actions>;
};

const useHideModal = ({ dispatch }: useHideModalArgs) => {
  const hideModal = React.useMemo(() => {
    return (
      id: number,
      delayBeforeRemoveMsec: number = DELAY_BEFORE_REMOVE_MSEC
    ) => {
      dispatch(actions.hideModal(id));

      setTimeout(() => {
        dispatch(actions.removeModal(id));
      }, delayBeforeRemoveMsec);
    };
  }, []);

  return hideModal;
};

export const useModalProvider = () => {
  const [state, dispatch] = React.useReducer<typeof reducer>(
    reducer,
    initialState
  );

  const showModal = useDispatch(dispatch, actions.showModal, []);
  const hideModal = useHideModal({ dispatch });

  return {
    state,
    hideModal,
    showModal,
  };
};
