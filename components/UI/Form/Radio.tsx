import * as React from 'react';
import { useField, useFormikContext } from 'formik';
import Form from 'react-bootstrap/Form';
import css from './Radio.module.scss';

type TextFieldProps = {} & any;

export const Radio: React.ComponentType<TextFieldProps> = ({
  field,
  form,
  onAcceptMap,
  className,
  options,
  ...props
}) => {
  const [, meta] = useField({ name: field.name });
  const formik = useFormikContext();
  const showError = formik.submitCount || meta.touched;

  return (
    <Form.Check
      custom
      type='radio'
      isInvalid={showError && !!meta.error}
      className={css.root}
      {...props}
      {...field}
    />
  );
};
