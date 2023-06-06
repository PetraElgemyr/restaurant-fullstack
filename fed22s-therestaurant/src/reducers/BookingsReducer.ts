import axios from "axios";
import { IBookingsContext } from "../contexts/BookingsContext";
import { Booking } from "../models/Booking";
import { getBookingsByDate } from "../serivces/BookingServices";
import { useContext } from "react";
import { BookingsContext } from "../contexts/BookingsContext";

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
    case "choseGuests": {
      const guests: number = parseInt(action.payload);
      bookingState = {
        ...bookingState,
        currentBooking: {
          ...bookingState.currentBooking,
          user: { ...bookingState.currentBooking.user, numberOfGuests: guests },
        },
      };

      //om det krävs ett bord, 1-6 pers, ändra context
      if (
        bookingState.currentBooking.user.numberOfGuests <= 6 &&
        bookingState.currentBooking.user.numberOfGuests > 0
      ) {
        bookingState.currentBooking = {
          ...bookingState.currentBooking,
          bookedTables: 1,
        };
        return bookingState;
      }
      //om det krävs 2 bord, 7-12 pers, ändra context
      if (
        bookingState.currentBooking.user.numberOfGuests <= 12 &&
        bookingState.currentBooking.user.numberOfGuests > 6
      ) {
        bookingState.currentBooking = {
          ...bookingState.currentBooking,
          bookedTables: 2,
        };
        return bookingState;
      }
      return bookingState;
    }

    case "gotBookingsForDate": {
      let dateString: string = action.payload; //tar emot datumsträng som ligger i min payload. ex 2023119
      let data: Booking[] = []; //skapar lista med bokningar DET DATUMET
      const checkDateBookings = async () => {
        data = await getBookingsByDate(dateString);
        console.log("Vår data: ", data);
        // bookingState.bookingsAtDate = data;
      };
      checkDateBookings();
      return (bookingState = {
        ...bookingState,
        bookingsAtDate: data,
        currentBooking: {
          ...bookingState.currentBooking,
          date: dateString,
        },
      });

      // if (response.length === 0) {
      //   bookingState = {
      //     ...bookingState,
      //     firstSitting: {
      //       ...bookingState.firstSitting,
      //       tablesLeft: 15,
      //       available: true,
      //     },
      //     secondSitting: {
      //       ...bookingState.secondSitting,
      //       tablesLeft: 15,
      //       available: true,
      //     },
      //     currentBooking: { ...bookingState.currentBooking, date: dateString },
      //   };
      //   return bookingState;
      // } else {
      //   return bookingState;
      // }
    }

    case "checkedBookings": {
      let contextState: IBookingsContext = JSON.parse(action.payload);
      let tablesBookedFirstSitting: number = 0;
      let tablesBookedSecondSitting: number = 0;
      console.log("I checkedBookings", contextState);

      if (contextState.bookingsAtDate.length === 0) {
        contextState = {
          ...contextState,
          firstSitting: {
            tablesLeft: 15,
            available: true,
          },
          secondSitting: {
            tablesLeft: 15,
            available: true,
          },
        };
        return contextState;
      } else {
        contextState.bookingsAtDate.map((booking) => {
          if (booking.sitting === 1) {
            contextState.firstSitting.tablesLeft += booking.bookedTables;
          }
          if (booking.sitting === 2) {
            contextState.secondSitting.tablesLeft += booking.bookedTables;
          }
        });

        //om det finns tillräckligt många bord kvar på sittning 1
        if (
          contextState.firstSitting.tablesLeft -
            contextState.currentBooking.bookedTables >=
          1
        ) {
          console.log("Det finns bord på sittning 1 kvar");
          contextState = {
            ...contextState,
            firstSitting: { ...contextState.firstSitting, available: true },
          };
          return contextState;
        }
        //om det finns tillräckligt många bord kvar på sittning 2
        if (
          contextState.secondSitting.tablesLeft -
            contextState.currentBooking.bookedTables >=
          1
        ) {
          console.log("Det finns bord på sittning 2 kvar");
          contextState = {
            ...contextState,
            secondSitting: { ...contextState.secondSitting, available: true },
          };
          return contextState;
        }

        //om det inte finns tillräckligt med bord på någon av sittningarna kvar
        if (
          contextState.firstSitting.tablesLeft -
            contextState.currentBooking.bookedTables <
            1 &&
          contextState.secondSitting.tablesLeft -
            contextState.currentBooking.bookedTables <
            1
        ) {
          contextState = {
            ...contextState,
            firstSitting: { ...contextState.firstSitting, available: false },
            secondSitting: { ...contextState.secondSitting, available: false },
          };
          return contextState;
        }
      }
    }

    // else {
    //   bookingsAtDate.map((booking) => {
    //     if (booking.sitting === 1) {
    //       firstSittingTablesBooked += booking.bookedTables;
    //     }
    //     if (booking.sitting === 2) {
    //       secondSittingTablesBooked += booking.bookedTables;
    //     }
    //   });

    //   if (firstSittingTablesBooked === 15) {
    //     console.log("Sittning 1 är fullbokad");
    //   } else {
    //     if (firstSittingTablesBooked < 15) {
    //       let tablesLeftFirstSitting = 15 - firstSittingTablesBooked;
    //       console.log(
    //         "Det finns: ",
    //         tablesLeftFirstSitting,
    //         " bord kvar detta datum denna tid"
    //       );
    //     }
    //   }
    //   if (secondSittingTablesBooked === 15) {
    //     console.log("Sittning 2 är fullbokad");
    //   } else {
    //     if (secondSittingTablesBooked < 15) {
    //       let tablesLeftSecondSitting = 15 - secondSittingTablesBooked;
    //       console.log(
    //         "Det finns: ",
    //         tablesLeftSecondSitting,
    //         " bord kvar detta datum denna tid"
    //       );
    //     }
    //   }
    // }

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
