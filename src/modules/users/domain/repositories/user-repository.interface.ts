import { User } from '../entities/user.entity';

export abstract class IUserRepository {
  abstract create(user: User): Promise<void>;
  abstract findByEmail(email: string): Promise<User | null>;
  abstract findAll(): Promise<User[]>;
  abstract updateRefreshToken(
    userId: string,
    refreshToken: string | null,
  ): Promise<void>;
  abstract findById(userId: string): Promise<User | null>;
}
