import * as React from 'react';
import Button from 'react-bootstrap/Button';
import { Counter } from '~/domain/Demo/Counter';
import { observer } from 'mobx-react-lite';

type HeroSectionProps = {
  onOpenModalClick: () => void;
  counterList: Counter[];
};

export const HeroSection = observer(
  ({ onOpenModalClick, counterList }: HeroSectionProps) => {
    return (
      <div>
        <h1>Hero</h1>
        {counterList.map((counter) => (
          <React.Fragment key={counter.id}>
            <p>Counter: {counter.count}</p>
            <p>multiplyTo5 computed: {counter.multiplyTo5}</p>
            <Button onClick={() => counter.increment()} block>
              Increment
            </Button>
          </React.Fragment>
        ))}
        <Button onClick={onOpenModalClick} block>
          Open Modal
        </Button>
      </div>
    );
  }
);
