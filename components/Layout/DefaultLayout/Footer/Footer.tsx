import * as React from 'react';
import css from './Footer.module.scss';

type FooterProps = {};

export const Footer: React.FC<FooterProps> = () => {
  return (
    <footer className={css.root}>
      <p className='h2'>Footer</p>
    </footer>
  );
};
