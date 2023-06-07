export class User {
  constructor(
    public name: string,
    public email: string,
    public phonenumber: string
  ) {}
}

export const defaultUser = new User("", "", "");
