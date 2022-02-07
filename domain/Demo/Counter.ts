import { observable, makeObservable, action, computed } from 'mobx';

export class Counter {
  public id: number;
  public count: number = 0;

  public increment() {
    this.count++;
  }

  get multiplyTo5() {
    return this.count * 5;
  }
}

export class CounterObservable extends Counter {
  constructor() {
    super();

    makeObservable(this, {
      count: observable,
      increment: action,
      multiplyTo5: computed,
    });
  }
}
