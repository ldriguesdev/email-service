import { User } from '@modules/users/domain/entities/user.entity';
import { UserNotExistsError } from '@modules/users/domain/errors/user-not-exists.error';
import { IUserRepository } from '@modules/users/domain/repositories/user-repository.interface';
import { Injectable } from '@nestjs/common';

interface GetUserByIdUseCaseResponse {
  user: User;
}

interface GetUserByIdUseCaseRequest {
  userId: string;
}

@Injectable()
export class GetUserByIdUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute({
    userId,
  }: GetUserByIdUseCaseRequest): Promise<GetUserByIdUseCaseResponse> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new UserNotExistsError(userId);
    }

    return {
      user,
    };
  }
}
