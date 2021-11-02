import {
  IDLE,
  AUTHENTICATED,
  LOADING,
  LOGGED_OUT,
  REJECTED,
} from './constants';
import { DefaultStatePayload, State } from './types';

export const getDefaultState = (payload: DefaultStatePayload): State => ({
  status: IDLE,
  user: {
    role: payload.defaultRole,
  },
});

export const reducer = (state: State, action): State => {
  switch (action.type) {
    case 'LOADING':
      return {
        ...state,
        status: LOADING,
      };

    case 'SET_AUTHENTICATED':
      return {
        ...state,
        ...action.payload,
        status: AUTHENTICATED,
      };

    case 'LOGOUT':
      return {
        ...state,
        ...action.payload,
        status: LOGGED_OUT,
        user: {
          role: action.payload.defaultRole,
        },
      };

    case 'REJECTED':
      return {
        ...state,
        status: REJECTED,
        error: action.payload.error,
        user: {
          role: action.payload.defaultRole,
        },
      };

    case 'reset':
      return getDefaultState(action.payload);

    default:
      throw new Error();
  }
};
