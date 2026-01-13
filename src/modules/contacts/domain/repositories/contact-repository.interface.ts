import type { Contact } from '../entities/contact.entity';

export abstract class IContactRepository {
  abstract create(contact: Contact): Promise<void>;
}
