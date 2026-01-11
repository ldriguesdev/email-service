import { User as PrismaUser } from '@prisma/client';
import { User } from 'src/modules/users/domain/entities/user.entity';

export class PrismaUserMapper {
  static toDomain(raw: PrismaUser): User {
    return new User(raw.id, raw.email, raw.name, raw.password, raw.createdAt);
  }

  static toPrisma(user: User) {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      password: user.passwordHash,
      createdAt: user.createdAt,
    };
  }
}
