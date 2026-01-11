import { User } from '@modules/users/domain/entities/user.entity';
import { IUserRepository } from '@modules/users/domain/repositories/user-repository.interface';
import { Injectable } from '@nestjs/common';

interface ListUsersResponse {
  users: User[];
}

@Injectable()
export class ListUsersUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(): Promise<ListUsersResponse> {
    const users = await this.userRepository.findAll();

    return { users };
  }
}
