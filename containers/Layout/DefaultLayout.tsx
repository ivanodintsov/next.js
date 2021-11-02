import * as React from 'react';
import { Container } from '~/components/Layout/DefaultLayout/Container';
import FooterContainer from './Footer';
import HeaderContainer from './Header';

const DefaultLayoutContainer = ({ children }) => {
  return (
    <Container>
      <HeaderContainer />
      {children}
      <FooterContainer />
    </Container>
  );
};

export default DefaultLayoutContainer;
