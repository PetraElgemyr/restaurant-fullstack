import { useContext, useEffect, useState } from "react";
import { BookingDispatchContext } from "../contexts/BookingDispatchContext";
import Calendar from "react-calendar";
import { BookingsContext } from "../contexts/BookingsContext";
import { getBookingsByDate } from "../serivces/BookingServices";
import { IBooking } from "../models/Booking";

interface ICalendarProps {
  goToGuests: () => void;
  goToForm: () => void;
}

export const CalendarPage = ({ goToGuests, goToForm }: ICalendarProps) => {
  const dispatch = useContext(BookingDispatchContext);
  const context = useContext(BookingsContext);
  const [sittings, setSittings] = useState<number[]>([1, 2]);
  const [sittingHtml, setSittingHtml] = useState<JSX.Element>(<></>);
  const [html, setHtml] = useState<JSX.Element>(<></>);

  // const showSittings = () => {
  //   if (context.firstSitting.available && context.secondSitting.available) {
  //     setHtml(
  //       <>
  //         <div
  //           onClick={() => {
  //             chooseSitting(1);
  //           }}
  //         >
  //           Kl. 18:00 - 21:00
  //         </div>
  //         <div
  //           onClick={() => {
  //             chooseSitting(2);
  //           }}
  //         >
  //           Kl. 21:00 - 00:00
  //         </div>
  //       </>
  //     );
  //   }

  //   if (context.firstSitting.available && !context.secondSitting.available) {
  //     setHtml(
  //       <>
  //         <div
  //           onClick={() => {
  //             chooseSitting(1);
  //           }}
  //         >
  //           Kl. 18:00 - 21:00
  //         </div>
  //       </>
  //     );
  //   }
  //   if (context.secondSitting.available && !context.firstSitting.available) {
  //     setHtml(
  //       <>
  //         {" "}
  //         <div
  //           onClick={() => {
  //             chooseSitting(1);
  //           }}
  //         >
  //           Kl. 18:00 - 21:00
  //         </div>
  //       </>
  //     );
  //   }
  // };

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
    console.log("Detta är nuvarande context ", context);
  };

  const handleDateClick = async (dateString: string) => {
    let data: IBooking[] = await getBookingsByDate(dateString);
    context.bookingsAtDate = data;
    context.currentBooking = { ...context.currentBooking, date: dateString };

    if (data.length === 0) {
      context.firstSitting = { available: true, tablesLeft: 15 };
      context.secondSitting = { available: true, tablesLeft: 15 };
    }
    console.log(context);

    dispatch({ type: "checkedBookings", payload: dateString });
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
          let month: string = (day.getMonth() + 1).toString();
          let dateDay: string = day.getDate().toString();
          if (month.length === 1) {
            month = "0" + month;
          }
          if (dateDay.length === 1) {
            dateDay = "0" + dateDay;
          }
          let chosenDate = day.getFullYear().toString() + month + dateDay;
          handleDateClick(chosenDate);
          // dispatch({ type: "gotBookingsForDate", payload: chosenDate });
          // dispatch({
          //   type: "checkedBookings",
          //   payload: JSON.stringify(context),
          // });
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
