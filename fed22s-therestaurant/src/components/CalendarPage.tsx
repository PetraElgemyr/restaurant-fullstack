import { useContext } from "react";
import { BookingDispatchContext } from "../contexts/BookingDispatchContext";
import Calendar from "react-calendar";

export const CalendarPage = () => {
  const dispatch = useContext(BookingDispatchContext);

  return (
    <>
      <Calendar
        onClick={(day: string) => {
          dispatch({ type: "", payload: day });
        }}
      ></Calendar>
    </>
  );
};
