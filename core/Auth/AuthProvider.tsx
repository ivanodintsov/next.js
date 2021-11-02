import * as React from 'react';
import { Auth } from './Auth';
import { AuthProvider as AuthProviderBase } from './authContext';
import { VISITOR } from './constants';
import { User } from '../Api/User';
import { getDefaultState, reducer } from './state/reducer';
import { AUTHENTICATED, IDLE, LOADING } from './state/constants';
import {
  authenticateAction,
  loadingAction,
  logoutAction,
  setRejectedAction,
} from './state/actions';
import { AuthLoadingServiceError } from './errors/AuthLoadingServiceError';
import { RequestNope } from '../Api/RequestNope';

const CHECK_TIMEOUT = 300000;

export type AuthProviderProps = {
  authService: Auth;
  permissions: any;
  userService: User<any, any, any>;
  defaultRole?: string;
};

const DefaultMutableState = {
  mounted: false,
  tokenExpire: null,
};

export const AuthProvider: React.FC<AuthProviderProps> = (props) => {
  const { authService, permissions, userService, defaultRole, children } =
    props;

  const [mutableState] = React.useState(DefaultMutableState);
  const [state, dispatch] = React.useReducer(reducer, {}, getDefaultState);

  const isAuthenticated = state.status === AUTHENTICATED;
  const loading = state.status === LOADING;

  const getUser = async () => {
    try {
      if (!authService.tokenStorage.token) {
        throw new Error('NO_TOKEN');
      }

      const user = await userService.request();
      setSession(user);
    } catch (error) {
      if (userService instanceof RequestNope) {
        throw error;
      }

      dispatch(
        setRejectedAction({
          error,
          defaultRole,
        })
      );
      throw error;
    }
  };

  const handleAuthentication = async () => {
    try {
      await getUser();
    } catch (error) {}
  };

  const initiateLogin = async (data) => {
    try {
      dispatch(loadingAction());
      await authService.authorize(data);
      await handleAuthentication();
    } catch (error) {
      if (error instanceof AuthLoadingServiceError) {
        throw error;
      }

      dispatch(
        setRejectedAction({
          error,
          defaultRole,
        })
      );
      throw error;
    }
  };

  React.useEffect(() => {
    const handle401 = async (error) => {
      dispatch(loadingAction());
      await authService.logout();
      dispatch(
        setRejectedAction({
          error,
          defaultRole,
        })
      );
    };

    authService.events.on('401', handle401);

    return () => {
      authService.events.removeListener('401', handle401);
    };
  }, [authService]);

  React.useEffect(() => {
    handleAuthentication();
  }, [authService]);

  React.useEffect(() => {
    const checkExpire = async () => {
      try {
        if (!mutableState.mounted) {
          mutableState.mounted = true;
        } else {
          await getUser();
        }
      } catch (error) {
      } finally {
        clearTimeout(mutableState.tokenExpire);
        mutableState.tokenExpire = setTimeout(checkExpire, CHECK_TIMEOUT);
      }
    };

    const clearTimer = () => {
      clearTimeout(mutableState.tokenExpire);
    };

    if (isAuthenticated) {
      window.addEventListener('focus', checkExpire);
      window.addEventListener('blur', clearTimer);
      checkExpire();
    }

    return () => {
      clearTimeout(mutableState.tokenExpire);
      window.removeEventListener('focus', checkExpire);
      window.removeEventListener('blur', clearTimer);
    };
  }, [isAuthenticated, authService]);

  const setLogoutState = () => {
    dispatch(
      logoutAction({
        defaultRole,
      })
    );
  };

  const logout = async () => {
    dispatch(loadingAction());
    await authService.logout();
    setLogoutState();
  };

  const setSession = (user) => {
    dispatch(
      authenticateAction({
        user,
      })
    );
  };

  const authProviderValue = React.useMemo(
    () => ({
      status: state.status,
      user: state.user,
      loading,
      isAuthenticated,
      initiateLogin,
      handleAuthentication,
      logout,
      permissions,
      setSession,
      authService,
    }),
    [state]
  );

  return (
    <AuthProviderBase value={authProviderValue}>{children}</AuthProviderBase>
  );
};

AuthProvider.defaultProps = {
  defaultRole: VISITOR,
};
