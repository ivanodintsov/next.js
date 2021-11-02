import * as React from 'react';
import Button from 'react-bootstrap/Button';

export const HeroSection = ({ onOpenModalClick }) => {
  return (
    <div>
      <h1>Hero</h1>
      <Button onClick={onOpenModalClick}>Open Modal</Button>
    </div>
  );
};
