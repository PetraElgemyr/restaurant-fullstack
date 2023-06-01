import { useContext } from "react";
import { BookingDispatchContext } from "../contexts/BookingDispatchContext";
import Calendar from "react-calendar";

interface ICalendarProps {
  goToGuests: () => void;
  goToForm: () => void;
}

export const CalendarPage = ({ goToGuests, goToForm }: ICalendarProps) => {
  const dispatch = useContext(BookingDispatchContext);

  return (
    <>
      <button
        type="button"
        onClick={() => {
          goToGuests();
        }}
      >
        Tillbaka
      </button>
      <Calendar
        onClickDay={(day) => {
          let chosenDate =
            day.getUTCFullYear().toString() +
            day.getMonth().toString() +
            day.getDate().toString();

          console.log("Datum:", chosenDate);
          //skicka datum till databas VIA reducer
          dispatch({ type: "", payload: chosenDate });
        }}
      ></Calendar>
      <div>Kl. 18:00 - 20:00</div>
      <div>Kl. 20:00 - 22:00</div>
      <button type="button" onClick={() => goToForm()}>
        Välj tid
      </button>
    </>
  );
};
