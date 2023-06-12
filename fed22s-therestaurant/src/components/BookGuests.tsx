import { useContext, useState } from "react";
import { BookingDispatchContext } from "../contexts/BookingDispatchContext";
import { ActionTypeCurrentBooking } from "../reducers/CurrentBookingReducer";
import { CurrentBookingContext } from "../contexts/BookingsContext";

export interface IChooseGuests {
  goToCalendar: () => void;
  isAdmin: boolean;
}

export const BookGuests = ({ goToCalendar, isAdmin }: IChooseGuests) => {
  const numberOfGuests = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const numberOfGuestsAdmin = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    23, 24,
  ];
  const currentBooking = useContext(CurrentBookingContext);
  const dispatch = useContext(BookingDispatchContext);
  const [html, setHtml] = useState<JSX.Element>(<></>);

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
    if (currentBooking.numberOfGuests === 0) {
      setHtml(<div>Du måste välja antalet gäster innan du går vidare</div>);
    }
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
          {numberOfGuestsAdmin.map((guests) => (
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
  }
};
