export abstract class IHashProvider {
  abstract hash(payload: string): Promise<string>;
  abstract compare(payload: string, hashed: string): Promise<boolean>;
}