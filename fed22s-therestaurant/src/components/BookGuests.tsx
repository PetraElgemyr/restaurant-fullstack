import { useContext, useState } from "react";
import { BookingDispatchContext } from "../contexts/BookingDispatchContext";
import { ActionTypeCurrentBooking } from "../reducers/CurrentBookingReducer";

export interface IChooseGuests {
  goToCalendar: () => void;
}

export const BookGuests = ({ goToCalendar }: IChooseGuests) => {
  const numberOfGuests = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  const dispatch = useContext(BookingDispatchContext);

  const handleClick = (guests: number) => {
    // sätt antal gäster via dispatch men förslagsvis ändra om hur bokningen ser ut så att numberOfGuests inte ligger inuti User
    // Här sätts bara antal bord man har bokat
    dispatch({
      type: ActionTypeCurrentBooking.SET_NUMBER_OF_GUESTS,
      payload: guests,
    });

    if (guests < 7) {
      dispatch({
        type: ActionTypeCurrentBooking.SET_BOOKED_TABLES,
        payload: 1,
      });
    }

    if (guests > 6) {
      dispatch({
        type: ActionTypeCurrentBooking.SET_BOOKED_TABLES,
        payload: 2,
      });
    }
  };

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
      </div>
    </>
  );
};
