import * as React from 'react';
import { useField, useFormikContext } from 'formik';
import Form from 'react-bootstrap/Form';
import { TextHelper } from './TextHelper/TextHelper';

type TextFieldProps = {} & any;

export const CheckBox: React.ComponentType<TextFieldProps> = ({
  field,
  form,
  id,
  onAcceptMap,
  className,
  ...props
}) => {
  const [, meta] = useField({ name: field.name });
  const formik = useFormikContext();
  const showError = formik.submitCount || meta.touched;

  return (
    <Form.Group controlId={id} className={className}>
      <Form.Check
        custom
        type='checkbox'
        isValid={showError && !meta.error}
        isInvalid={showError && !!meta.error}
        {...props}
        {...field}
      />
      <TextHelper name={field.name} />
    </Form.Group>
  );
};
