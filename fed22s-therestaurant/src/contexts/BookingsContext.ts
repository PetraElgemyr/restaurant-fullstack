import { createContext } from "react";
import { Booking, defaultBooking } from "../models/Booking";

export interface IBookingsContext {
  bookings: Booking[];
  currentBooking: Booking;
  firstSittingTablesLeft: number;
  secondSittingTablesLeft: number;
}

export const BookingsContext = createContext<IBookingsContext>({
  bookings: [],
  currentBooking: defaultBooking,
  firstSittingTablesLeft: 0,
  secondSittingTablesLeft: 0,
});
