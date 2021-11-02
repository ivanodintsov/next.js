import '~/core/polyfills.js';
import * as React from 'react';
import { I18nextProvider } from 'react-i18next';
import { StackableModalProvider } from '~/libs/react-modal-provider/src';
import { ToastContainer } from 'react-toastify';
import { ApiProvider } from './Api';
import { ApiProviderProps } from './Api/ApiProvider';
import i18n from './i18n';

type AppCoreProps = {
  api: ApiProviderProps;
};

const AppCore: React.FC<AppCoreProps> = ({ api, children }) => {
  return (
    <I18nextProvider i18n={i18n}>
      <ApiProvider {...api}>
        {children}
        <StackableModalProvider />
      </ApiProvider>
      <ToastContainer />
    </I18nextProvider>
  );
};

AppCore.defaultProps = {};

export default AppCore;
