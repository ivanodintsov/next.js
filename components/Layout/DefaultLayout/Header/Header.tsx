import * as React from 'react';
import css from './Header.module.scss';

export const Header = () => {
  return (
    <header className={css.root}>
      <p className='h2'>Header</p>
    </header>
  );
};
