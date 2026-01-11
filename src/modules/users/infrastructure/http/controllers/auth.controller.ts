import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { SignInDto } from '../dtos/sign-in.dto';
import { SignInUseCase } from '@modules/users/application/use-cases/sign-in.use-case';

@Controller('auth')
export class AuthController {
  constructor(private readonly signInUseCase: SignInUseCase) {}

  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  async signIn(@Body() body: SignInDto) {
    const { accessToken, refreshToken } = await this.signInUseCase.execute({
      email: body.email,
      password: body.password,
    });

    return { accessToken, refreshToken };
  }
}
