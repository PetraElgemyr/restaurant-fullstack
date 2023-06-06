import { Dispatch, createContext } from "react";
import { IActionCurrentBooking } from "../reducers/CurrentBookingReducer";

export const BookingDispatchContext = createContext<Dispatch<IActionCurrentBooking>>(() => {
  return;
});
