import { Module } from '@nestjs/common';
import { CreateUserUseCase } from './application/use-cases/create-user.use-case';
import { IHashProvider } from './application/providers/hash-provider.interface';
import { BcryptHashProvider } from './infrastructure/providers/bcrypt-hash.provider';
import { PrismaModule } from '@infra/database/prisma.module';
import { IUserRepository } from './domain/repositories/user-repository.interface';
import { PrismaUserRepository } from './infrastructure/database/prisma/repositories/prisma-user.repository';
import { UserController } from './infrastructure/http/controllers/user.controller';
import { ListUsersUseCase } from './application/use-cases/list-users.use-case';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [
    CreateUserUseCase,
    ListUsersUseCase,
    {
      provide: IHashProvider,
      useClass: BcryptHashProvider,
    },
    {
      provide: IUserRepository,
      useClass: PrismaUserRepository,
    },
  ],
  exports: [CreateUserUseCase, ListUsersUseCase],
})
export class UsersModule {}
