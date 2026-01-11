import { randomUUID } from 'crypto';
import { User } from '../../domain/entities/user.entity';
import { UserAlreadyExistsError } from '../../domain/errors/user-already-exists.error';
import { IUserRepository } from '../../domain/repositories/user-repository.interface';
import { IHashProvider } from '../providers/hash-provider.interface';
import { Inject, Injectable } from '@nestjs/common';

interface CreateUserUseCaseDTO {
  name: string;
  email: string;
  password: string;
}

interface CreateUserUseCaseResponse {
  user: User;
}

@Injectable()
export class CreateUserUseCase {
  constructor(
    private readonly hashProvider: IHashProvider,
    private readonly userRepository: IUserRepository,
  ) {}

  async execute({
    email,
    name,
    password,
  }: CreateUserUseCaseDTO): Promise<CreateUserUseCaseResponse> {
    const userAlreadyExist = await this.userRepository.findByEmail(email);

    if (userAlreadyExist) {
      throw new UserAlreadyExistsError(email);
    }

    const passwordHash = await this.hashProvider.hash(password);

    const user = new User(randomUUID(), email, name, passwordHash, new Date());

    await this.userRepository.create(user);

    return {
      user,
    };
  }
}
