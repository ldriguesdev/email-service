import { CreateUserUseCase } from '@modules/users/application/use-cases/create-user.use-case';
import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserPresenter } from '../presenters/user.presenter';
import { ListUsersUseCase } from '@modules/users/application/use-cases/list-users.use-case';

@Controller('users')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly listUsersUseCase: ListUsersUseCase,
  ) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async create(@Body() body: CreateUserDto) {
    const { name, email, password } = body;

    const { user } = await this.createUserUseCase.execute({
      name,
      email,
      password,
    });

    return UserPresenter.toHTTP(user);
  }

  @Get()
  async list() {
    const { users } = await this.listUsersUseCase.execute();

    return {
      users: users.map(UserPresenter.toHTTP),
    };
  }
}
