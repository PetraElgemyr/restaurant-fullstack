import { createContext } from "react";
import { Booking, IBooking, defaultBooking } from "../models/Booking";

export interface IBookingsContext {
  bookingsAtDate: IBooking[];
  currentBooking: Booking;
  firstSitting: ISitting;
  secondSitting: ISitting;
}
export interface ISitting {
  tablesLeft: number;
  available: boolean;
}

export const defaultSitting: ISitting = {
  tablesLeft: 15,
  available: false,
};

export const BookingsContext = createContext<IBookingsContext>({
  bookingsAtDate: [],
  currentBooking: defaultBooking,
  firstSitting: defaultSitting,
  secondSitting: defaultSitting,
});
