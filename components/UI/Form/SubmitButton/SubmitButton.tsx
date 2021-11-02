import * as React from 'react';
import { ButtonFormik as ButtonFormikBase } from '~/core/components/FormFormik/ButtonFormik';
import Button, { ButtonProps } from 'react-bootstrap/Button';

type SubmitButtonProps = ButtonProps & {
  className?: string;
};

export const SubmitButton: React.FC<SubmitButtonProps> = (props) => {
  return <ButtonFormikBase as={Button} {...props} />;
};
