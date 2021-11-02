import { FormikHelpers } from 'formik';
import { useFormatServerErrors } from '~/core/components/Form/useFormatServerErrors';
import * as R from 'ramda';
import filterNil from '~/domain/common/filterNil';

export const useFormatErrors = () => {
  const serverErrors = useFormatServerErrors();

  const formatErrors = (response, error, formik: FormikHelpers<any>) => {
    const message = R.path(['message'], response);
    const status = R.path(['response', 'status'], error);

    if (message === 'The given data was invalid.' || status == 422) {
      const errors = R.pipe(
        R.pathOr({}, ['errors']),
        filterNil,
        serverErrors.format,
      )(response);

      formik.setErrors(errors);
      return;
    }
  };

  return formatErrors;
};
