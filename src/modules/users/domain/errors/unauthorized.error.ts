import { DomainError } from '@core/domain/errors/domain-error';

export class UnauthorizedError extends DomainError {
  constructor() {
    super('Unauthorized access');
  }
}
