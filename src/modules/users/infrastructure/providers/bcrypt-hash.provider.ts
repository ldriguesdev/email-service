import { hash, compare } from "bcryptjs";
import type { IHashProvider } from "../../application/providers/hash-provider.interface";
import { Injectable } from "@nestjs/common";

@Injectable()
export class BcryptHashProvider implements IHashProvider {
  async hash(payload: string): Promise<string> {
    return hash(payload, 8);
  }

  compare(payload: string, hashed: string): Promise<boolean> {
    return compare(payload, hashed);
  }
}