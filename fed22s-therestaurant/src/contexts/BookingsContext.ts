import { createContext } from "react";
import { Booking, defaultBooking } from "../models/Booking";

export interface IBookingsContext {
  bookingsAtDate: Booking[];
  currentBooking: Booking;
  firstSitting: ISitting;
  secondSitting: ISitting;
}
export interface ISitting {
  tablesLeft: number;
  available: boolean;
}

export const defaultSitting: ISitting = {
  tablesLeft: 0,
  available: false,
};

export const BookingsContext = createContext<IBookingsContext>({
  bookingsAtDate: [],
  currentBooking: defaultBooking,
  firstSitting: defaultSitting,
  secondSitting: defaultSitting,
});
