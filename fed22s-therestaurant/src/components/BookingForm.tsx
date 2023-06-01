import { useContext, useState } from "react";
import { BookingsContext } from "../contexts/BookingsContext";

export const BookingForm = () => {

{

  seating: "",
  user: {}
}

const currentBooking = useContext(BookingsContext)
  return (
    <>
      <form>
        <input onChange={}/>
        <button>Slutför bokning!</button>
      </form>
    </>
  );
};
