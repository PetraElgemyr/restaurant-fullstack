import axios from "axios";
import { IBookingsContext } from "../contexts/BookingsContext";
import { Booking } from "../models/Booking";
import { getBookingsByDate } from "../serivces/BookingServices";
import { useContext } from "react";
import { BookingsContext } from "../contexts/BookingsContext";
import { first } from "lodash";

export interface IAction {
  type: string;
  payload: string /*Glöm ej att stringifya alla payloads som vi skickar med dispatch-anropet. Alla ska va samma datatyp.
    Glöm ej att parsa payload från string till json när vi tar emot och ska använda payload i vår reducer */;
}

export const BookingsReducer = (
  bookingState: IBookingsContext,
  action: IAction
): IBookingsContext => {
  let context = useContext(BookingsContext);

  switch (action.type) {
    case "gotBookingsForDate": {
      let dateString: string = action.payload; //tar emot datumsträng som ligger i min payload. ex 2023119
      let bookingsAtDate: Booking[] = []; //skapar lista med bokningar DET DATUMET
      let firstSittingTablesBooked = 0;
      let secondSittingTablesBooked = 0;
      const checkDateBookings = async () => {
        bookingsAtDate = await getBookingsByDate(dateString);
      };

      checkDateBookings();
      if (bookingsAtDate.length === 0) {
        console.log("Datumet är helt ledigt!");
        bookingState = {
          ...bookingState,
          firstSittingTablesLeft: 15,
          secondSittingTablesLeft: 15,
          currentBooking: { ...bookingState.currentBooking, date: dateString },
        };
        // bookingState.currentBooking.date = dateString;
        // bookingState.firstSittingTablesLeft = 15;
        // bookingState.secondSittingTablesLeft = 15;
        return bookingState;
      } else {
        bookingsAtDate.map((booking) => {
          if (booking.sitting === 1) {
            firstSittingTablesBooked += booking.bookedTables;
          }
          if (booking.sitting === 2) {
            secondSittingTablesBooked += booking.bookedTables;
          }
        });

        if (firstSittingTablesBooked === 15) {
          console.log("Sittning 1 är fullbokad");
        } else {
          if (firstSittingTablesBooked < 15) {
            let tablesLeftFirstSitting = 15 - firstSittingTablesBooked;
            console.log(
              "Det finns: ",
              tablesLeftFirstSitting,
              " bord kvar detta datum denna tid"
            );
          }
        }
        if (secondSittingTablesBooked === 15) {
          console.log("Sittning 2 är fullbokad");
        } else {
          if (secondSittingTablesBooked < 15) {
            let tablesLeftSecondSitting = 15 - secondSittingTablesBooked;
            console.log(
              "Det finns: ",
              tablesLeftSecondSitting,
              " bord kvar detta datum denna tid"
            );
          }
        }
      }
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
