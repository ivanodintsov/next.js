import * as EventEmitter from 'eventemitter3';
import { Network } from '../Network/Network';
import { Login } from '../Api/Login';
import { TokenStorage } from './Token/Storage';

type AuthOptions = {
  network: Network<any, any>;
  loginService: Login;
  tokenStorage: TokenStorage;
};

export abstract class Auth {
  public events: EventEmitter;
  public tokenStorage: TokenStorage;

  protected network: Network<any, any>;
  protected loginService: Login;

  constructor({ network, loginService, tokenStorage }: AuthOptions) {
    this.network = network;
    this.loginService = loginService;
    this.tokenStorage = tokenStorage;
    // @ts-ignore
    this.events = new EventEmitter.EventEmitter();
    this.createEventsSubscriptions();
  }

  public abstract authorize(data: any): Promise<any>;
  public abstract logout(data?: any): Promise<any>;

  protected abstract createEventsSubscriptions(): void;
}
