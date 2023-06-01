import { useContext, useState } from "react";
import { BookingsContext } from "../contexts/BookingsContext";

export interface IChooseGuests {
  goToCalendar: (guests: number) => void;
}

export const BookGuests = ({ goToCalendar }: IChooseGuests) => {
  const context = useContext(BookingsContext);

  const setNumberOfGuests = (num: number) => {
    context.currentBooking.user.numberOfGuests = num; //sätt till talet
  };

  return (
    <>
      <div>
        <p>Här väljer du antalet gäster</p>
        <div onClick={() => setNumberOfGuests(1)}>1</div>
        <div onClick={() => setNumberOfGuests(2)}>2</div>
        {/* fixa map */}
        <button onClick={() => goToCalendar}>Gå vidare</button>
      </div>
    </>
  );
};
