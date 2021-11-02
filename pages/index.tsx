import * as React from 'react';
import HeadMeta from '~/components/HeadMeta/HeadMeta';
import DefaultLayoutContainer from '~/containers/Layout/DefaultLayout';
import HeroSectionContainer from '~/containers/MainPageExample/HeroSection';

const Home = () => {
  return (
    <DefaultLayoutContainer>
      <HeadMeta />
      <HeroSectionContainer />
    </DefaultLayoutContainer>
  );
};

export default Home;
