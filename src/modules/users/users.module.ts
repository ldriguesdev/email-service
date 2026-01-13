import { Module } from '@nestjs/common';
import { CreateUserUseCase } from './application/use-cases/create-user.use-case';
import { IHashProvider } from './application/providers/hash-provider.interface';
import { BcryptHashProvider } from './infrastructure/providers/bcrypt-hash.provider';
import { PrismaModule } from '@infra/database/prisma.module';
import { IUserRepository } from './domain/repositories/user-repository.interface';
import { PrismaUserRepository } from './infrastructure/database/prisma/repositories/prisma-user.repository';
import { UserController } from './infrastructure/http/controllers/user.controller';
import { ListUsersUseCase } from './application/use-cases/list-users.use-case';
import { JwtModule } from '@nestjs/jwt';
import { SignInUseCase } from './application/use-cases/sign-in.use-case';
import { ITokenProvider } from './application/providers/token-provider.interface';
import { JwtTokenProvider } from './infrastructure/providers/jwt-token.provider';
import { AuthController } from './infrastructure/http/controllers/auth.controller';
import { GetUserByIdUseCase } from './application/use-cases/get-user-by-id.usecase';

@Module({
  imports: [PrismaModule, JwtModule.register({})],
  controllers: [UserController, AuthController],
  providers: [
    CreateUserUseCase,
    ListUsersUseCase,
    SignInUseCase,
    GetUserByIdUseCase,
    {
      provide: IHashProvider,
      useClass: BcryptHashProvider,
    },
    {
      provide: IUserRepository,
      useClass: PrismaUserRepository,
    },
    { provide: ITokenProvider, useClass: JwtTokenProvider },
  ],
  exports: [ITokenProvider],
})
export class UsersModule {}
