import LinkBase, { LinkProps } from 'next/link';
import * as React from 'react';

type RouterLinkProps = {
  linkProps?: Omit<LinkProps, 'href'>;
} & React.HTMLProps<HTMLAnchorElement>;

export const Link = ({
  href,
  linkProps,
  children,
  ...props
}: RouterLinkProps) => {
  return (
    <LinkBase href={href} prefetch={false} {...linkProps}>
      <a href={href} {...props}>
        {children}
      </a>
    </LinkBase>
  );
};
