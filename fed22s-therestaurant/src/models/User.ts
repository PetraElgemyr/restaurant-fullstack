export class User {
  constructor(
    public name: string,
    public email: string,
    public phonenumber: string,
    public numberOfGuests: number
  ) {}
}

export const defaultUser = new User("", "", "", 0);

export interface IUser {
  name: string;
  email: string;
  phonenumber: string;
  numberOfGuests: number;
}
