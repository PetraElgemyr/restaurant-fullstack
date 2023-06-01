export class User {
  constructor(
    public name: string,
    public email: string,
    public phonenumber: string,
    public numberOfGuests: number
  ) {}
}

export const defaultUser = new User("", "", "", 0);
