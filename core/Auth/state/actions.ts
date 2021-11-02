export const loadingAction = () => {
  return {
    type: 'LOADING',
  };
};

export const logoutAction = (payload) => {
  return {
    type: 'LOGOUT',
    payload,
  };
};

export const authenticateAction = (payload) => {
  return {
    type: 'SET_AUTHENTICATED',
    payload,
  };
};

export const setRejectedAction = (payload) => {
  return {
    type: 'REJECTED',
    payload,
  };
};
