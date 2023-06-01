import axios from "axios";
import { IBookingsContext } from "../contexts/BookingsContext";
import { Booking } from "../models/Booking";
import { getBookingsByDate } from "../serivces/BookingServices";

export interface IAction {
  type: string;
  payload: string /*Glöm ej att stringifya alla payloads som vi skickar med dispatch-anropet. Alla ska va samma datatyp.
    Glöm ej att parsa payload från string till json när vi tar emot och ska använda payload i vår reducer */;
}

export const BookingsReducer = (
  bookingState: IBookingsContext,
  action: IAction
): IBookingsContext => {
  switch (action.type) {
    case "gotBookingsForDate": {
      let dateString: string = action.payload; //tar emot datumsträng som ligger i min payload. ex 2023119
      let bookingsAtDate: Booking[] = []; //skapar lista med bokningar DET DATUMET
      const checkDateBookings = async () => {
        bookingsAtDate = await getBookingsByDate(dateString);
      };
      checkDateBookings();
      //gör apianrop till databasen, med datumet, få tillbaka ett objekt med antal bokade bord sittning 1 och 2. {first: number, second: number}
      //return { obj }
    }

    case "added": {
      let newBooking: Booking = JSON.parse(action.payload);
      axios.post("http://localhost:5000/api/v1/bakgarden/bookings", newBooking);
      //Ta emot ett färdigt BOOKING-obj i min action.payload
      //axios post till url:n, skicka med hela objektet i postrequestet.
      //Lägg till objektet i listan med bokningar
    }

    //Payload är ett id, hitta id på bokning och ta bort från lista med bokningar
    case "deleted": {
      break;
    }

    default:
      break;
  }

  return bookingState;
};
