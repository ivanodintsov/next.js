import * as React from 'react';
import { ImageProps as ImagePropsBase } from 'next/image';
import cx from 'classnames';
import css from './Image.module.scss';

const VALID_LAYOUT_VALUES = [
  'fill',
  'fixed',
  'intrinsic',
  'responsive',
  undefined,
];
type LayoutValue = typeof VALID_LAYOUT_VALUES[number];

type ImageProps = ImagePropsBase & {
  layout?: LayoutValue;
};

export const Image = (props: ImageProps) => {
  const { className, ...rest } = props;
  return <img className={cx(css[props.layout], className)} {...rest} />;
};
