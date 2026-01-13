import { PrismaService } from '@infra/database/prisma.service';
import { User } from '@modules/users/domain/entities/user.entity';
import { IUserRepository } from '@modules/users/domain/repositories/user-repository.interface';
import { Injectable } from '@nestjs/common';
import { PrismaUserMapper } from '../mappers/prisma-user.mapper';

@Injectable()
export class PrismaUserRepository implements IUserRepository {
  constructor(private prisma: PrismaService) {}

  async findById(userId: string){
    const raw = await this.prisma.user.findUnique({ where: { id: userId } });

    return raw ? PrismaUserMapper.toDomain(raw) : null;
  }

  async findAll() {
    const users = await this.prisma.user.findMany();

    return users.map(PrismaUserMapper.toDomain);
  }

  async create(user: User) {
    const raw = PrismaUserMapper.toPrisma(user);
    await this.prisma.user.create({ data: raw });
  }

  async findByEmail(email: string) {
    const raw = await this.prisma.user.findUnique({ where: { email } });

    if (!raw) return null;

    return PrismaUserMapper.toDomain(raw);
  }

  async updateRefreshToken(userId: string, refreshToken: string | null) {
    await this.prisma.user.update({
      where: { id: userId },
      data: { refreshToken },
    });
  }
}
