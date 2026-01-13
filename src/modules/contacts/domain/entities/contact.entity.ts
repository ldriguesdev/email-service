export class Contact {
  constructor(
    public id: string,
    public userId: string,
    public name: string,
    public email: string,
    public createdAt: Date,
  ) {}
}
