import { Link, useParams } from "react-router-dom";
import { deleteBookingById, getBookingById } from "../serivces/BookingServices";
import { useEffect, useState } from "react";
import { Booking, defaultBooking } from "../models/Booking";

export const CancelBooking = () => {
  const { bookingId } = useParams();
  const [bookingExists, setBookingExists] = useState<boolean>(false);
  const [booking, setBooking] = useState<Booking>(defaultBooking);

  const handleDeleteClick = async () => {
    if (bookingId) {
      deleteBookingById(bookingId);
    }
  };

  const foundHtml = (
    <>
      <h4>Avbokning för bokning {booking.bookingId}</h4>
      <p>Är du säker på att du vill avboka din bokning?</p>

      <Link to="/cancel/confirmation">
        <button type="button" onClick={handleDeleteClick}>
          Avboka
        </button>
      </Link>
    </>
  );
  const notFoundHtml = (
    <>
      <h4>Ojdå! Bokningen kunde inte hittas.</h4>
      <p>
        Vi ser inte att er bokning finns i vårt system. Vänligen kontakta oss
        vid frågor.
      </p>
      <span>Vänliga hälsningar, Bakgården</span>
    </>
  );

  useEffect(() => {
    const getBooking = async () => {
      if (bookingId !== undefined) {
        const foundBooking: Booking = await getBookingById(bookingId);

        if (foundBooking.date !== "") {
          setBookingExists(true);
          setBooking(foundBooking);
        } else {
          setBookingExists(false);
          setBooking(defaultBooking);
        }
      }
    };

    getBooking();
  });

  return <>{bookingExists ? foundHtml : notFoundHtml}</>;
};
