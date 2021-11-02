export class MemoryStorage implements Storage {
  private storage = {};

  get length(): number {
    return Object.keys(this.storage).length;
  }

  public clear(): void {
    this.storage = {};
  }

  public getItem(key: string): string | null {
    return this.storage[key];
  }

  public key(index: number): string | null {
    return Object.keys(this.storage)[index];
  }

  public removeItem(key: string): void {
    delete this.storage[key];
  }

  public setItem(key: string, value: string): void {
    this.setItem[key] = value;
  }
}
