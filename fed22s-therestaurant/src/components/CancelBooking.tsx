import { Link, useParams } from "react-router-dom";
import {
  deleteBookingById,
  getAllBookings,
} from "../serivces/BookingServices";
import { useEffect, useState } from "react";
import { Booking } from "../models/Booking";


export const CancelBooking = () => {
  const { bookingId } = useParams<string>();
  const [booking, setBooking] = useState<Booking>();



  const handleDeleteClick = async () => {
    if (bookingId) {
      deleteBookingById(bookingId);
    }
  };


  useEffect(() => {
    const getBooking = async () => {
      const response: Booking[] = await getAllBookings();
      console.log("Respons från api:et: ", response);
      const bookingExists = response.find((booking) => {
        return booking.bookingId === bookingId;
      })
      console.log(bookingExists)
      setBooking(bookingExists)
    };

    getBooking();
  }, []);


    if (booking) {
      return (
        <>
        <h4>Avbokning för bokning {booking.bookingId}</h4>
        <p>Är du säker på att du vill avboka din bokning?</p>
  
        <Link to="/cancel/confirmation">
          <button type="button" onClick={handleDeleteClick}>
            Avboka
          </button>
        </Link>
      </>
      )
    } else {
      return (
        <>
        <h4>Ojdå! Bokningen kunde inte hittas.</h4>
        <p>
          Vi ser inte att er bokning finns i vårt system. Vänligen kontakta oss
          vid frågor.
        </p>
        <span>Vänliga hälsningar, Bakgården</span>
      </>
      )
    }

};
