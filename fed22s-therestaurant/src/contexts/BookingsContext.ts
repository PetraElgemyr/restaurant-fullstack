import { createContext } from "react";
import { Booking, defaultBooking } from "../models/Booking";

export interface IBookingsContext {
  bookings: Booking[];
  currentBooking: Booking;
}

export const BookingsContext = createContext<IBookingsContext>({
  bookings: [],
  currentBooking: defaultBooking,
});
