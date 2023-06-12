import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { BookingDispatchContext } from "../contexts/BookingDispatchContext";
import { ActionTypeCurrentBooking } from "../reducers/CurrentBookingReducer";
import { CurrentBookingContext } from "../contexts/BookingsContext";

export interface IChooseGuests {
  goToCalendar: () => void;
  isAdmin: boolean;
}

export const BookGuests = ({ goToCalendar, isAdmin }: IChooseGuests) => {
  const numberOfGuests = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const currentBooking = useContext(CurrentBookingContext);
  const dispatch = useContext(BookingDispatchContext);
  const [html, setHtml] = useState<JSX.Element>(<></>);
  const [guestsString, setGuestsString] = useState("");

  const handleClick = (guests: number) => {
    dispatch({
      type: ActionTypeCurrentBooking.SET_NUMBER_OF_GUESTS,
      payload: guests,
    });

    let tables = guests / 6 + 0.4;
    tables = Math.round(tables);

    dispatch({
      type: ActionTypeCurrentBooking.SET_BOOKED_TABLES,
      payload: tables,
    });

    console.log(tables);
    setHtml(<></>);
  };

  const checkNumberOfGuests = () => {
    if (currentBooking.numberOfGuests === 0 || guestsString === "0") {
      setHtml(<div>Du måste välja antalet gäster innan du går vidare</div>);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.type === "text") {
      setGuestsString(e.target.value);

      if (e.target.value === "" || e.target.value === "0") {
        setHtml(<div>Du måste välja antalet gäster innan du går vidare</div>);
      }
    }
  };

  const handleSubmit = (e: FormEvent) => {
    const guests = parseInt(guestsString);

    dispatch({
      type: ActionTypeCurrentBooking.SET_NUMBER_OF_GUESTS,
      payload: guests,
    });

    let tables = guests / 6 + 0.4;
    tables = Math.round(tables);

    dispatch({
      type: ActionTypeCurrentBooking.SET_BOOKED_TABLES,
      payload: tables,
    });

    console.log(tables);
    currentBooking.bookingId = JSON.stringify(new Date().getTime());
    goToCalendar();
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
              if (currentBooking.numberOfGuests !== 0) {
                goToCalendar();
              } else {
                checkNumberOfGuests();
              }
            }}
          >
            Nästa
          </button>
          {html}
          <button disabled={!isAdmin}>Is Admin</button>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div>
          <p>Här väljer du antalet gäster</p>
          <form
            onSubmit={(e: FormEvent) => {
              e.preventDefault();
              if (currentBooking.numberOfGuests !== 0 || guestsString !== "0") {
                handleSubmit(e);
              } else {
                checkNumberOfGuests();
              }
            }}
          >
            <input
              type="text"
              value={guestsString}
              onChange={handleChange}
              required
            />
            <button>Nästa</button>
          </form>

          {html}
          <button disabled={!isAdmin}>Is Admin</button>
        </div>
      </>
    );
  }
};
