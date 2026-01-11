import { IUserRepository } from '@modules/users/domain/repositories/user-repository.interface';
import { IHashProvider } from '../providers/hash-provider.interface';
import { ITokenProvider } from '../providers/token-provider.interface';
import { Injectable } from '@nestjs/common';
import { UnauthorizedError } from '@modules/users/domain/errors/unauthorized.error';

interface SignInRequest {
  email: string;
  password: string;
}

interface SignInResponse {
  accessToken: string;
  refreshToken: string;
}

@Injectable()
export class SignInUseCase {
  constructor(
    private userRepository: IUserRepository,
    private hashProvider: IHashProvider,
    private tokenProvider: ITokenProvider,
  ) {}

  async execute(req: SignInRequest): Promise<SignInResponse> {
    const user = await this.userRepository.findByEmail(req.email);

    if (!user) {
      throw new UnauthorizedError();
    }

    const passwordMatched = await this.hashProvider.compare(
      req.password,
      user.passwordHash,
    );

    if (!passwordMatched) {
      throw new UnauthorizedError();
    }

    const payload = { sub: user.id, email: user.email };

    const accessToken = this.tokenProvider.generateAccessToken(payload);
    const refreshToken = this.tokenProvider.generateRefreshToken(payload);

    const refreshTokenHash = await this.hashProvider.hash(refreshToken);
    await this.userRepository.updateRefreshToken(user.id, refreshTokenHash);

    return { accessToken, refreshToken };
  }
}
