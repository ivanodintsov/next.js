import * as React from 'react';
import { ModalExample } from '~/components/Modals/ModalExample/ModalExample';
import showModal from '~/core/Modals/showModal';
import { HeroSection } from '~/components/Main/HeroSection';
import { CounterObservable } from '~/domain/Demo/Counter';

const counterList = [new CounterObservable(), new CounterObservable()].map(
  (counter, idx) => {
    counter.id = idx;

    return counter;
  }
);

const HeroSectionContainer = () => {
  const onOpenModalClickHandler = () => {
    showModal(ModalExample, {});
  };

  return (
    <HeroSection
      counterList={counterList}
      onOpenModalClick={onOpenModalClickHandler}
    />
  );
};

export default HeroSectionContainer;
