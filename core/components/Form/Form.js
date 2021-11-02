import React from 'react';
import cx from 'classnames';
import './Form.scss';

const Form = ({
  className,
  children,
  as: Component,
  ...props
}) => {
  const classNames = cx('ds-form', className);

  return (
    <Component {...props} className={classNames}>
      {children}
    </Component>
  )
};

Form.defaultProps = {
  as: 'form',
};

export default Form;
