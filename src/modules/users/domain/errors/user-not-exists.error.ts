import { DomainError } from '../../../../core/domain/errors/domain-error';

export class UserNotExistsError extends DomainError {
  constructor(id: string) {
    super(`User not "${id}"  exists.`);
  }
}
