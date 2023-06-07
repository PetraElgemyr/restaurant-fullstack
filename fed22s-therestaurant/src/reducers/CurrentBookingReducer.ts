import axios from "axios";
import { Booking } from "../models/Booking";
import { addNewBooking } from "../serivces/BookingServices";

export interface IActionCurrentBooking {
  type: ActionTypeCurrentBooking;
  payload: any;
}

export enum ActionTypeCurrentBooking {
  SET_NUMBER_OF_GUESTS,
  SET_SITTING,
  SET_BOOKED_TABLES,
  SET_DATE,
  SET_USER,
  ADDED,
  DELETED,
}

export const CurrentBookingReducer = (
  currentBooking: Booking,
  action: IActionCurrentBooking
) => {
  switch (action.type) {
    case ActionTypeCurrentBooking.SET_NUMBER_OF_GUESTS: {
      console.log("set number of guests", action.payload);
      return { ...currentBooking, numberOfGuests: action.payload };
    }

    case ActionTypeCurrentBooking.SET_SITTING: {
      console.log("set selected sitting", action.payload);
      return { ...currentBooking, sitting: action.payload };
    }

    case ActionTypeCurrentBooking.SET_BOOKED_TABLES: {
      console.log("set booked tables to booking", action.payload);
      return { ...currentBooking, bookedTables: action.payload };
    }

    case ActionTypeCurrentBooking.SET_DATE: {
      console.log("Set date to booking:", action.payload);
      return { ...currentBooking, date: action.payload };
    }

    case ActionTypeCurrentBooking.SET_USER: {
      console.log("setting user to booking", action.payload);
      return { ...currentBooking, user: action.payload };
    }

    case ActionTypeCurrentBooking.ADDED: {
      let newBooking: Booking = JSON.parse(action.payload);
      addNewBooking(newBooking);
      return newBooking;
    }

    case ActionTypeCurrentBooking.DELETED: {
      break;
    }

    default:
      break;
  }

  return currentBooking;
};
