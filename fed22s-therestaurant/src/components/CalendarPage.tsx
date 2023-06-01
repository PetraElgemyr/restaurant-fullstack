import { useContext, useEffect, useState } from "react";
import { BookingDispatchContext } from "../contexts/BookingDispatchContext";
import Calendar from "react-calendar";
import { BookingsContext } from "../contexts/BookingsContext";

interface ICalendarProps {
  goToGuests: () => void;
  goToForm: () => void;
}

export const CalendarPage = ({ goToGuests, goToForm }: ICalendarProps) => {
  const dispatch = useContext(BookingDispatchContext);
  const context = useContext(BookingsContext);
  const [sittingHtml, setSittingHtml] = useState<JSX.Element>(<></>);
  const [firstSittingAvailable, setFirstSittingAvailable] = useState(false);
  const [secondSittingAvailable, setSecondSittingAvailable] = useState(false);

  // const checkSittingsAvailable = () => {
  //   console.log("context efter upd:", context);

  //   if (
  //     context.firstSittingTablesLeft === 15 &&
  //     context.secondSittingTablesLeft === 15
  //   ) {
  //     setFirstSittingAvailable(true);
  //     setSecondSittingAvailable(true);
  //   }
  // };

  const chooseSitting = (sittingNum: number) => {
    context.currentBooking.sitting = sittingNum;
    console.log(
      "Detta är nuvarande bokningen som skapas ",
      context.currentBooking
    );
  };

  useEffect(() => {
    if (firstSittingAvailable && !secondSittingAvailable) {
      setSittingHtml(
        <div
          onClick={() => {
            chooseSitting(1);
          }}
        >
          Kl. 18:00 - 20:00
        </div>
      );
    }
    if (secondSittingAvailable && !firstSittingAvailable) {
      setSittingHtml(
        <div
          onClick={() => {
            chooseSitting(2);
          }}
        >
          Kl. 20:00 - 22:00
        </div>
      );
    }
    if (firstSittingAvailable && secondSittingAvailable) {
      setSittingHtml(
        <div>
          <div
            onClick={() => {
              chooseSitting(1);
            }}
          >
            Kl. 18:00 - 20:00
          </div>
          <div
            onClick={() => {
              chooseSitting(2);
            }}
          >
            Kl. 20:00 - 22:00
          </div>
        </div>
      );
    }
  }, [firstSittingAvailable, secondSittingAvailable]);

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
          dispatch({ type: "gotBookingsForDate", payload: chosenDate });

          //om det är helt ledigt det datumet
          if (
            context.firstSittingTablesLeft === 15 &&
            context.secondSittingTablesLeft === 15
          ) {
            setFirstSittingAvailable(true);
            setSecondSittingAvailable(true);
          }
        }}
      ></Calendar>
      {sittingHtml}
      <button type="button" onClick={() => goToForm()}>
        Välj tid
      </button>
    </>
  );
};
