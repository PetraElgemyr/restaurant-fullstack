import { Booking } from "../models/Booking";


export interface IActionBookings {
  type: ActionTypeBookings;
  payload: any;
}

export enum ActionTypeBookings {

}

export const BookingsReducer = (bookings: Booking[] , action: IActionBookings)=> {
  switch (action.type) {

    default:
      break;
  }

  return bookings;
};
