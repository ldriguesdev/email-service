import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { Response } from 'express'; // ou fastify
import { DomainError } from '../../core/domain/errors/domain-error';
import { UserAlreadyExistsError } from '../../modules/users/domain/errors/user-already-exists.error';
import { UnauthorizedError } from '@modules/users/domain/errors/unauthorized.error';
import { UserNotExistsError } from '@modules/users/domain/errors/user-not-exists.error';

@Catch(DomainError)
export class DomainExceptionFilter implements ExceptionFilter {
  catch(exception: DomainError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;

    if (exception instanceof UserAlreadyExistsError) {
      status = HttpStatus.CONFLICT;
    } 

    if (exception instanceof UnauthorizedError) {
      status = HttpStatus.UNAUTHORIZED;
    }

    if (exception instanceof UserNotExistsError) {
      status = HttpStatus.NOT_FOUND;
    }

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      message: exception.message,
      error: exception.constructor.name,
    });
  }
}