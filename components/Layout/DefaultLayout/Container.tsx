import * as React from 'react';
import css from './Container.module.scss';

type ContainerProps = {};

export const Container: React.FC<ContainerProps> = ({ children }) => {
  return <div className={css.root}>{children}</div>;
};
