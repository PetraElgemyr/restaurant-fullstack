import { useContext, useState } from "react";
import { BookingsContext } from "../contexts/BookingsContext";

export interface IChooseGuests {
  goToCalendar: () => void;
}

export const BookGuests = ({ goToCalendar }: IChooseGuests) => {
  const context = useContext(BookingsContext);

  const setNumberOfGuests = (guests: number) => {
    context.currentBooking.user.numberOfGuests = guests; //sätt till talet
  };

  return (
    <>
      <div>
        <p>Här väljer du antalet gäster</p>
        <div
          onClick={() => {
            setNumberOfGuests(1);
            console.log("klickat");
          }}
        >
          1
        </div>
        <div onClick={() => setNumberOfGuests(2)}>2</div>
        {/* fixa map */}
        <button
          type="button"
          onClick={() => {
            goToCalendar();
          }}
        >
          Gå vidare
        </button>
      </div>
    </>
  );
};
