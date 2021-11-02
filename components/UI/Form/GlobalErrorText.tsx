import * as React from 'react';
import isNil from 'ramda/src/isNil';
import anyPass from 'ramda/src/anyPass';
import isEmpty from 'ramda/src/isEmpty';
import { useFormikContext } from 'formik';
import Form from 'react-bootstrap/Form';

export const GlobalErrorText = ({
  text = 'Пожалуйста, заполните все поля регистрационной формы.',
}) => {
  const formik = useFormikContext();
  const hasErrors =
    !!formik.submitCount && !anyPass([isNil, isEmpty])(formik.errors);

  if (!hasErrors) {
    return null;
  }

  return (
    <Form.Control.Feedback
      style={{ display: 'block', marginBottom: 20 }}
      type='invalid'
    >
      {hasErrors && text}
    </Form.Control.Feedback>
  );
};
