import * as EventEmitter from 'eventemitter3';

export abstract class Network<Http, HttpConfig> {
  public events: EventEmitter;
  protected http: Http;

  constructor(options: HttpConfig) {
    this.createHttp(options);
    this.createEvents();
  }

  protected createEvents() {
    // @ts-ignore
    this.events = new EventEmitter.EventEmitter();
  }

  protected abstract createHttp(config: HttpConfig): void;

  abstract request(config: HttpConfig): Promise<any>;
}
