import * as React from 'react';
import { useFormikContext } from 'formik';

export type ButtonFormikProps<Props> = React.PropsWithChildren<
  {
    name?: string;
    as?: React.ElementType;
  } & Props
>;

export function ButtonFormik<Props>({
  as: Button,
  ...props
}: ButtonFormikProps<Props>) {
  const formik = useFormikContext();

  return <Button disabled={formik.isSubmitting} {...props} />;
}

ButtonFormik.defaultProps = {
  type: 'submit',
  as: 'button',
};
