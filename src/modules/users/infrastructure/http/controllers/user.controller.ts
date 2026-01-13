import { CreateUserUseCase } from '@modules/users/application/use-cases/create-user.use-case';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserPresenter } from '../presenters/user.presenter';
import { ListUsersUseCase } from '@modules/users/application/use-cases/list-users.use-case';
import { GetUserByIdUseCase } from '@modules/users/application/use-cases/get-user-by-id.usecase';

@Controller('users')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly listUsersUseCase: ListUsersUseCase,
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
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

    return users.map(UserPresenter.toHTTP);
  }

  @Get(':id')
  async profile(@Param('id') userId: string) {
    const { user } = await this.getUserByIdUseCase.execute({ userId });

    return UserPresenter.toHTTP(user);
  }
}
