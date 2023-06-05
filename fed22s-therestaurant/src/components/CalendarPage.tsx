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
          let month: string = (day.getMonth() + 1).toString();
          let dateDay: string = day.getDate().toString();
          if (month.length === 1) {
            month = "0" + month;
          }
          if (dateDay.length === 1) {
            dateDay = "0" + dateDay;
          }
          let chosenDate = day.getFullYear().toString() + month + dateDay;
          console.log("Datum:", chosenDate);
          //skicka datum till databas VIA reducer
          // dispatch({ type: "gotBookingsForDate", payload: chosenDate });
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
