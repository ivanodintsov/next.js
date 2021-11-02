import * as React from 'react';
import { AuthProvider } from '~/core/Auth/AuthProvider';
import { authLoadingConfig } from '~/services/AuthService/authLoadingConfig';
import { Request } from '~/core/Api/Request';
import { Auth } from '~/core/Auth/Auth';

const AuthConfigure = ({ children }) => {
  const [authConfig, setAuthConfig] = React.useState<{
    userService: Request<any, any, any>;
    authService: Auth;
    permissions: any;
  }>(authLoadingConfig);

  const loadAuthServiceConfig = async () => {
    const { authConfig } = await import('~/services/AuthService/authConfig');
    setAuthConfig(authConfig);
  };

  React.useEffect(() => {
    loadAuthServiceConfig();
  }, []);

  return <AuthProvider {...authConfig}>{children}</AuthProvider>;
};

export default AuthConfigure;
