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
  const [amountOfGuests, setAmountOfGuests] = useState<number[]>([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
  ]);
  let html = amountOfGuests.map((amount, index) => {
    return (
      <div
        key={index}
        onClick={() => {
          setNumberOfGuests(amount);
          console.log("Valda gäster: ", amount);
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
