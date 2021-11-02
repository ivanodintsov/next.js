import * as React from 'react';
import { useField, useFormikContext } from 'formik';
import Form from 'react-bootstrap/Form';
import { TextHelper } from './TextHelper/TextHelper';

import { IMaskInputProps, IMaskMixin } from 'react-imask';

type TextFieldProps = {} & any;

const WithMask: React.ComponentType<TextFieldProps> = IMaskMixin(
  ({ inputRef, ...props }: any) => {
    return <Form.Control ref={inputRef} {...props} />;
  }
);

export const Input: React.ComponentType<TextFieldProps> = ({
  field,
  form,
  id,
  onAcceptMap,
  ...props
}) => {
  const [, meta] = useField({ name: field.name });
  const formik = useFormikContext();
  const showError = formik.submitCount || meta.touched;

  if (props.mask) {
    return (
      <Form.Group controlId={id}>
        <WithMask
          isValid={showError && !meta.error}
          isInvalid={showError && !!meta.error}
          {...props}
          {...field}
          lazy={true}
          onAccept={(value, mask) => {
            // @ts-ignore
            let data = onAcceptMap ? onAcceptMap(value, mask) : value;

            form.setFieldValue(field.name, data);
            // @ts-ignore
            mask.updateValue();
          }}
          onChange={undefined}
        />
        <TextHelper name={field.name} />
      </Form.Group>
    );
  }

  return (
    <Form.Group controlId={id}>
      <Form.Control
        isValid={showError && !meta.error}
        isInvalid={showError && !!meta.error}
        {...props}
        {...field}
      />
      <TextHelper name={field.name} />
    </Form.Group>
  );
};
