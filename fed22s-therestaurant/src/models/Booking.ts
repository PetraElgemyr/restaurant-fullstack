import { IUser, User, defaultUser } from "./User";

export class Booking {
  constructor(
    public sitting: number,
    public bookedTables: number,
    public date: string,
    public user: User
  ) {}
}

export interface IBooking {
  sitting: number;
  bookedTables: number;
  date: string;
  user: IUser;
}

export const defaultBooking = new Booking(0, 0, "", defaultUser);
