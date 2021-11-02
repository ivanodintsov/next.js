import * as React from 'react';
import { ModalExample } from '~/components/Modals/ModalExample/ModalExample';
import showModal from '~/core/Modals/showModal';
import { HeroSection } from '~/components/Main/HeroSection';

const HeroSectionContainer = () => {
  const onOpenModalClickHandler = () => {
    showModal(ModalExample, {});
  };

  return <HeroSection onOpenModalClick={onOpenModalClickHandler} />;
};

export default HeroSectionContainer;
