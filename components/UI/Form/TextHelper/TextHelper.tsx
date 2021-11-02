import * as React from 'react';
import Form from 'react-bootstrap/Form';
import { useField, useFormikContext } from 'formik';

type TextHelperProps = {
  name: string;
};

const renderError = (error) => {
  if (Array.isArray(error)) {
    return error.join(', ');
  }

  return error;
};

export const TextHelper: React.FC<TextHelperProps> = ({ name, ...props }) => {
  const [, meta] = useField({ name });
  const formik = useFormikContext();
  const showError = formik.submitCount || meta.touched;

  let feedbackType;

  if (showError && !!meta.error) {
    feedbackType = 'invalid';
  }

  // return (
  //   <FormHelperText
  //     {...props}
  //     error={showError && !!meta.error}
  //   >
  //     {showError && meta.error}
  //   </FormHelperText>
  // );

  return (
    <Form.Control.Feedback type={feedbackType}>
      {showError && renderError(meta.error)}
    </Form.Control.Feedback>
  );
};
