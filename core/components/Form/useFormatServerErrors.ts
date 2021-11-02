import { useTranslation } from 'react-i18next';
import * as R from 'ramda';

export const useFormatServerErrors = () => {
  const { t } = useTranslation();

  const format = R.mapObjIndexed((item: string[]) => {
    if (!R.is(Array, item)) {
      return item;
    }

    return R.map((error: string) => {
      if (!R.is(String, error)) {
        return error;
      }

      const i18nKey = `api|default|errors|${error}`;
      const textError = t([i18nKey, error], { keySeparator: '|' });
      return textError;
    }, item);
  });

  return {
    format,
  };
};
