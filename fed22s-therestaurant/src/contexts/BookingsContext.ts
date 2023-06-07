import { createContext } from "react";
import { Booking, defaultBooking } from "../models/Booking";

export const CurrentBookingContext = createContext<Booking>(defaultBooking);
