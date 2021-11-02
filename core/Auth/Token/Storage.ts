export abstract class TokenStorage {
  protected storage: any;

  public abstract get token(): string;
  public abstract set token(token: string);
  public abstract removeToken(): void;
}
