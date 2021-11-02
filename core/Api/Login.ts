import { Network } from '../Network/Network';

export type LoginConfig = {
  network: Network<any, any>;
};

export abstract class Login {
  network: Network<any, any>;

  constructor({ network }: LoginConfig) {
    this.network = network;
  }

  abstract login(data): any;
  abstract logout(data): any;
}
