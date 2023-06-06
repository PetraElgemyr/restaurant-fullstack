import axios from "axios";
import { IBookingsContext } from "../contexts/BookingsContext";
import { Booking, IBooking } from "../models/Booking";
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
  let data: IBooking[] = [];

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
      // let data: IBooking[] = []; //skapar lista med bokningar DET DATUMET
      const checkDateBookings = async (): Promise<IBookingsContext> => {
        data = await getBookingsByDate(dateString);
        console.log("Vår data: ", data);
        if (data.length > 0) {
          return (bookingState = {
            ...bookingState,
            bookingsAtDate: data,
            currentBooking: {
              ...bookingState.currentBooking,
              date: action.payload.toString(),
            },
          });
        } else {
          return bookingState;
        }
      };
      checkDateBookings();
      // return (bookingState = {
      //   ...bookingState,
      //   bookingsAtDate: data,
      //   currentBooking: {
      //     ...bookingState.currentBooking,
      //     date: dateString,
      //   },
      // });

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
      return bookingState;
    }

    case "checkedBookings": {
      let dateString: string = action.payload;
      let bookedTablesFirstSitting = 0;
      let bookedTablesSecondSitting = 0;

      if (bookingState.bookingsAtDate.length !== 0) {
        bookingState.bookingsAtDate.map((booking) => {
          if (booking.sitting === 1) {
            bookedTablesFirstSitting =
              bookedTablesFirstSitting + booking.bookedTables;
          }
          if (booking.sitting === 2) {
            bookedTablesSecondSitting =
              bookedTablesSecondSitting + booking.bookedTables;
          }
        });

        //om det finns tillräckligt många bord kvar för önskad bokning på sittning 1 men ej 2
        if (
          15 - bookedTablesFirstSitting >=
          bookingState.currentBooking.bookedTables
        ) {
          console.log("Det finns bord på sittning 1 kvar");
          bookingState = {
            ...bookingState,
            firstSitting: {
              ...bookingState.firstSitting,
              available: true,
              tablesLeft: 15 - bookedTablesFirstSitting,
            },
            // secondSitting: { ...bookingState.secondSitting, available: false },
            currentBooking: {
              ...bookingState.currentBooking,
              date: dateString,
            },
          };
        }
        //om det finns tillräckligt många bord kvar för önskad bokning på sittning 2
        if (
          15 - bookedTablesSecondSitting >=
          bookingState.currentBooking.bookedTables
        ) {
          console.log("Det finns bord på sittning 2 kvar");
          bookingState = {
            ...bookingState,
            secondSitting: {
              ...bookingState.secondSitting,
              available: true,
              tablesLeft: 15 - bookedTablesSecondSitting,
            },
            // firstSitting: { ...bookingState.firstSitting, available: false },
            currentBooking: {
              ...bookingState.currentBooking,
              date: dateString,
            },
          };
          console.log("Context i reducern", bookingState);
        }

        //om det inte finns tillräckligt med bord på någon av sittningarna kvar
        if (
          15 - bookedTablesFirstSitting <
            bookingState.currentBooking.bookedTables &&
          15 - bookedTablesSecondSitting <
            bookingState.currentBooking.bookedTables
        ) {
          bookingState = {
            ...bookingState,
            firstSitting: {
              ...bookingState.firstSitting,
              available: false,
              tablesLeft: 15 - bookedTablesFirstSitting,
            },
            secondSitting: {
              ...bookingState.secondSitting,
              available: false,
              tablesLeft: 15 - bookedTablesSecondSitting,
            },
          };
          console.log("Context i reducern", bookingState);

          return bookingState;
        }
      }
    }

    // case "added": {
    //   let newBooking: IBooking = JSON.parse(action.payload);
    //   axios.post("http://localhost:5000/api/v1/bakgarden/bookings", newBooking);
    //   //Ta emot ett färdigt BOOKING-obj i min action.payload
    //   //axios post till url:n, skicka med hela objektet i postrequestet.
    //   //Lägg till objektet i listan med bokningar
    // }

    //Payload är ett id, hitta id på bokning och ta bort från lista med bokningar
    case "deleted": {
      break;
    }

    default:
      break;
  }

  return bookingState;
};
