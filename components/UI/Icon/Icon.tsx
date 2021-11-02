import * as React from 'react';

const param = (param) => (typeof param === 'object' ? param : [param, param]);

type IconProps = {
  name: string;
  size?: string | number | [number, number];
  viewbox?: string | number | [number, number];
  className?: string;
};

export const Icon = ({ name, size, viewbox, className }: IconProps) => {
  const sizes = param(size);
  const vbox = viewbox ? param(viewbox) : sizes;

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={sizes[0]}
      height={sizes[1]}
      viewBox={`0 0 ${vbox[0]} ${vbox[1]}`}
      className={className}
    >
      <use fill='currentColor' xlinkHref={`/images/icons/icons.svg#${name}`} />
    </svg>
  );
};

Icon.defaultProps = {
  size: [42, 42],
};
