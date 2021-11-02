import { TokenStorage } from './Storage';

export class TokenLocalStorage extends TokenStorage {
  protected storage: Storage = window?.localStorage;
  private TOKEN_KEY: string = 't';

  public set token(token: string) {
    this.storage.setItem(this.TOKEN_KEY, token);
  }

  public get token() {
    return this.storage.getItem(this.TOKEN_KEY);
  }

  public removeToken() {
    this.storage.removeItem(this.TOKEN_KEY);
  }
}
