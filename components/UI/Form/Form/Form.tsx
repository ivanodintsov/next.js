import * as React from 'react';
import { Form } from 'formik';
import { FormFormik as OhmForm } from 'ohm-form-formik';
import { FormFormikProps } from 'ohm-form-formik/dist/types';

type FormikFormProps<Values> = FormFormikProps<Values> & {
  form?: React.ElementType;
  className?: string;
  loading?: boolean;
};

export function FormikForm<Values>({
  loading,
  children,
  form: Form,
  className,
  autoComplete,
  ...props
}: FormikFormProps<Values>) {
  const formProps = {
    className,
    autoComplete,
  };

  if (loading) {
    return (
      <OhmForm key='loading' {...props}>
        <div>
          <Form {...formProps}>{children}</Form>
        </div>
      </OhmForm>
    );
  }

  return (
    <OhmForm key='ready' {...props}>
      <Form {...formProps}>{children}</Form>
    </OhmForm>
  );
}

FormikForm.defaultProps = {
  validateOnBlur: false,
  initialValues: undefined,
  onSubmit: undefined,
  form: Form,
};

export default Form;
