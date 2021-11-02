import React from 'react';
import cx from 'classnames';
import './SearchForm.scss';

const SearchForm = ({
  className,
  children,
  ...props
}) => {
  const classNames = cx('search-form', className);

  return (
    <form {...props} className={classNames}>
      {children}
    </form>
  )
};

export default SearchForm;
