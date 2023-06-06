import { useContext, useState } from "react";
import { BookingsContext } from "../contexts/BookingsContext";
import { BookingDispatchContext } from "../contexts/BookingDispatchContext";
import { json } from "react-router-dom";

export interface IChooseGuests {
  goToCalendar: () => void;
}

export const BookGuests = ({ goToCalendar }: IChooseGuests) => {
  const context = useContext(BookingsContext);
  const dispatch = useContext(BookingDispatchContext);
  const [amountOfGuests, setAmountOfGuests] = useState<number[]>([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
  ]);

  let html = amountOfGuests.map((amount, index) => {
    return (
      <div
        key={index}
        onClick={() => {
          dispatch({ type: "choseGuests", payload: amount.toString() });
        }}
      >
        {amount}
      </div>
    );
  });

  return (
    <>
      <div>
        <p>Här väljer du antalet gäster</p>
        {html}
        <p>
          Antalet valda gäster: {context.currentBooking.user.numberOfGuests}
        </p>
        <p>Antalet behövda bord: {context.currentBooking.bookedTables}</p>
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
