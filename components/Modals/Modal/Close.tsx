import * as React from 'react';
import { Icon } from '~/components/UI/Icon/Icon';
import css from './Close.module.scss';

export const Close = ({ onClick }) => {
  return (
    <button onClick={onClick} className={css.root} type='button'>
      <Icon name='close' size={14} />
    </button>
  );
};
