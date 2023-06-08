import { useContext, useState } from "react";
import { BookingDispatchContext } from "../contexts/BookingDispatchContext";
import { ActionTypeCurrentBooking } from "../reducers/CurrentBookingReducer";

export interface IChooseGuests {
  goToCalendar: () => void;
  isAdmin: boolean;
}

export const BookGuests = ({ goToCalendar, isAdmin }: IChooseGuests) => {
  const numberOfGuests = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const numberOfGuestsAdmin = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 23, 24];

  const dispatch = useContext(BookingDispatchContext);

  const handleClick = (guests: number) => {

    dispatch({
      type: ActionTypeCurrentBooking.SET_NUMBER_OF_GUESTS,
      payload: guests,
    });

    let tables = (guests / 6) + 0.4;
    tables = Math.round(tables);

      dispatch({
        type: ActionTypeCurrentBooking.SET_BOOKED_TABLES,
        payload: tables,
      })

    console.log(tables)
  };
  
  if (!isAdmin) {
    return (
      <>
        <div>
          <p>Här väljer du antalet gäster</p>
          {numberOfGuests.map((guests) => (
            <div key={guests} onClick={() => handleClick(guests)}>
              {guests}
            </div>
          ))}
          <button
            type="button"
            onClick={() => {
              goToCalendar();
            }}
          >
            Nästa
          </button>
          <button disabled={!isAdmin}>Is Admin</button>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div>
          <p>Här väljer du antalet gäster</p>
          {numberOfGuestsAdmin.map((guests) => (
            <div key={guests} onClick={() => handleClick(guests)}>
              {guests}
            </div>
          ))}
          <button
            type="button"
            onClick={() => {
              goToCalendar();
            }}
          >
            Nästa
          </button>
          <button disabled={!isAdmin}>Is Admin</button>
        </div>
      </>
    );
  }


}
