import { useContext, useEffect, useState } from "react";
import { BookingDispatchContext } from "../contexts/BookingDispatchContext";
import Calendar from "react-calendar";
import { BookingsContext } from "../contexts/BookingsContext";

interface ICalendarProps {
  goToGuests: () => void;
  goToForm: () => void;
  handleGetBookingsForDate: (date: string) => void;
  handleCheckedBookings: () => void;
}

export const CalendarPage = ({
  goToGuests,
  goToForm,
  handleGetBookingsForDate,
  handleCheckedBookings,
}: ICalendarProps) => {
  const dispatch = useContext(BookingDispatchContext);
  const context = useContext(BookingsContext);
  const [sittingHtml, setSittingHtml] = useState<JSX.Element>(<></>);
  const firstSitting = (
    <div
      onClick={() => {
        chooseSitting(1);
      }}
    >
      Kl. 18:00 - 21:00
    </div>
  );
  const secondSitting = (
    <div
      onClick={() => {
        chooseSitting(2);
      }}
    >
      Kl. 21:00 - 00:00
    </div>
  );

  const chooseSitting = (sittingNum: number) => {
    context.currentBooking.sitting = sittingNum;
    console.log(
      "Detta är nuvarande bokningen som skapas ",
      context.currentBooking
    );
  };

  const handleDateClick = (day: Date) => {
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

    //Hämta bokningar för datumet, sätt bokningar till bookingsAtDate
    // dispatch({ type: "gotBookingsForDate", payload: chosenDate });
    handleGetBookingsForDate(chosenDate);

    //Räkna antal bord lediga, kolla om det finns tillräckligt för bokning
    // dispatch({ type: "checkedBookings", payload: JSON.stringify(context) });
    handleCheckedBookings();
  };

  useEffect(() => {
    if (context.firstSitting.available && !context.secondSitting.available) {
      setSittingHtml(firstSitting);
    }
    if (context.secondSitting.available && !context.firstSitting.available) {
      setSittingHtml(secondSitting);
    }
    if (context.firstSitting.available && context.secondSitting.available) {
      setSittingHtml(
        <div>
          {firstSitting}
          {secondSitting}
        </div>
      );
    }
  }, [context]);

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
          handleDateClick(day);
        }}
      ></Calendar>
      {sittingHtml}
      <button type="button" onClick={() => goToForm()}>
        Välj tid
      </button>
      {context.bookingsAtDate.map((booking, index) => {
        return (
          <div key={index}>
            <p>Datum: {booking.date}</p>
            <span>Mejl: {booking.user.email}</span>
          </div>
        );
      })}{" "}
    </>
  );
};
