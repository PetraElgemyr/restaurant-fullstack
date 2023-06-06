import { JSXElementConstructor, useEffect, useReducer, useState } from "react";
import { BookGuests } from "./BookGuests";
import { BookingForm } from "./BookingForm";
import { CalendarPage } from "./CalendarPage";
import { BookingsContext, defaultSitting } from "../contexts/BookingsContext";
import { BookingDispatchContext } from "../contexts/BookingDispatchContext";
import { User } from "../models/User";
import { defaultBooking } from "../models/Booking";
import { BookingsReducer } from "../reducers/BookingsReducer";

export const BookingComponent = () => {
  const [bookingState, dispatch] = useReducer(BookingsReducer, {
    bookingsAtDate: [],
    currentBooking: defaultBooking,
    firstSitting: defaultSitting,
    secondSitting: defaultSitting,
  });

  const [showGuests, setShowGuests] = useState(true);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [html, setHtml] = useState<JSX.Element>(<></>);

  const goToCalendar = () => {
    setShowCalendar(true);
    setShowGuests(false);
    setShowForm(false);
  };

  const goToGuests = () => {
    setShowGuests(true);
    setShowCalendar(false);
    setShowForm(false);
  };

  const goToForm = () => {
    setShowForm(true);
    setShowCalendar(false);
    setShowGuests(false);
  };

  useEffect(() => {
    if (showGuests) {
      setHtml(<BookGuests goToCalendar={goToCalendar}></BookGuests>);
    }
    if (showCalendar) {
      setHtml(
        <CalendarPage
          goToGuests={goToGuests}
          goToForm={goToForm}
        ></CalendarPage>
      );
    }
    if (showForm) {
      setHtml(<BookingForm goToCalendar={goToCalendar}></BookingForm>);
    }
  }, [showGuests, showCalendar, showForm]);

  const endBooking = (user: User) => {};
  return (
    <>
      <BookingsContext.Provider value={bookingState}>
        <BookingDispatchContext.Provider value={dispatch}>
          {html}
          {/* <BookGuests goToCalendar={goToCalendar}></BookGuests> */}
          {/* <CalendarPage goToForm={}></CalendarPage> */}
          {/* <BookingForm endBooking={endBooking}></BookingForm> */}
        </BookingDispatchContext.Provider>
      </BookingsContext.Provider>
    </>
  );
};
