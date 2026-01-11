export class User {
  constructor(
    public id: string,
    public email: string,
    public name: string | null,
    public passwordHash: string,
    public createdAt: Date,
  ) {}

}