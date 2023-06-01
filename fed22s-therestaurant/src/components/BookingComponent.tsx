import { useState } from "react";
import { BookGuests } from "./BookGuests";
import { BookingForm } from "./BookingForm";
import { CalendarPage } from "./CalendarPage";

export const BookingComponent = () => {
  const [bookingState, dispatch] = useReducer(BookingsReducer, {
    bookings: [],
    currentBooking: defaultBooking,
  });

  const goToCalendar = (guests: number) => {
    console.log("Antalet önskade gäster:", guests);

    //show CalendarPage och dölj bookGuests
  };

  const goToForm = () => {
    //show Bookingform  och dölj kalender
  };

  const endBooking = (user: User) => {};

  return (
    <>
      <BookingsContext.Provider value={bookingState}>
        <BookingDispatchContext.Provider value={dispatch}>
          <BookGuests goToCalendar={goToCalendar}></BookGuests>
          <CalendarPage goToForm={}></CalendarPage>
          <BookingForm endBooking={endBooking}></BookingForm>
        </BookingDispatchContext.Provider>
      </BookingsContext.Provider>
    </>
  );
};
