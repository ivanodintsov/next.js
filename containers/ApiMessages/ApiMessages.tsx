import * as React from 'react';
import * as R from 'ramda';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useApi } from '~/core/Api';

const IGNORE_STATUS_LIST = [];

const responseHandler = ({ notify, response, t }) => {
  const notification = (response, route) => {
    const successMessage: string = R.path(['data', 'message'], response);

    if (successMessage) {
      const i18nKey: string = `api|${route}|messages|${successMessage}`;
      const i18n = t([i18nKey, successMessage], { keySeparator: '|' });
      notify(i18n, { type: notify.TYPE.SUCCESS });
      return;
    }

    const i18nKey: string = `api|${route}|messages|default`;
    const i18n = t([i18nKey], { keySeparator: '|' });
    notify(i18n, { type: notify.TYPE.SUCCESS });
  };

  const success = R.path(['data', 'success'], response);

  if (success === false) {
    const error: any = new Error();
    error.response = response;
    throw error;
  }

  const route = response.config.url;
  const notifications = R.path(['config', 'notification', 'success'], response);

  if (notifications) {
    notification(response, route);
  }
};

const notification = ({ notify, error, t }) => {
  const message: string = R.path(['response', 'data', 'message'], error);
  const url = R.path(['response', 'config', 'url'], error);
  const status = R.path(['response', 'status'], error);

  const serverError = R.path(['response', 'data', 'error'], error);

  if (serverError) {
    const exception = R.path(['type'], serverError);
    const message = t(
      [`api.exceptions.${exception}`, 'api.default.messages.unknown'],
      { nsSeparator: '||' }
    );
    notify(message, { type: notify.TYPE.ERROR });
    return;
  }

  if (R.includes(status, IGNORE_STATUS_LIST)) {
    return;
  }

  if (message) {
    const i18nKey = `api|${url}|messages|${message}`;
    const i18n = t([i18nKey], { keySeparator: '|', nsSeparator: '||' });
    let messageText = i18n;

    if (messageText === i18nKey) {
      messageText = message;
    }

    notify(messageText, { type: notify.TYPE.ERROR });
    return;
  }
};

export const ApiMessages = (props) => {
  const api = useApi();
  const { t } = useTranslation();

  React.useEffect(() => {
    const onSuccess = (response) => {
      responseHandler({
        notify: toast,
        response,
        t,
      });
    };
    const onError = (error) => {
      if (error.response?.config?.notification?.failure === false) {
        return;
      }

      notification({
        notify: toast,
        error,
        t,
      });
    };

    api.network.events.on('error', onError);
    api.network.events.on('success', onSuccess);

    return () => {
      api.network.events.off('error', onError);
      api.network.events.off('success', onSuccess);
    };
  }, []);

  return props.children;
};
