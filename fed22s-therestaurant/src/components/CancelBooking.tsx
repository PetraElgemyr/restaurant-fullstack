import { Link, useParams } from "react-router-dom";
import {
  deleteBookingById,
  getAllBookings,
  getBookingById,
} from "../serivces/BookingServices";
import { useEffect, useState } from "react";
import { Booking, defaultBooking } from "../models/Booking";
import { AxiosResponse } from "axios";

export const CancelBooking = () => {
  const { bookingId } = useParams<string>();
  const [bookingExists, setBookingExists] = useState<boolean>(false);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [bookingToCancel, setBookingToCancel] =
    useState<Booking>(defaultBooking);
  const [isLoading, setIsLoading] = useState(true);
  const [html, setHtml] = useState<JSX.Element>(<></>);

  const handleDeleteClick = async () => {
    if (bookingId) {
      deleteBookingById(bookingId);
    }
  };

  const findBooking = () => {
    return bookings.find((booking) => {
      return booking.bookingId === bookingId;
    });
  };

  const foundHtml = (
    <>
      <h4>Avbokning för bokning {bookingToCancel.bookingId}</h4>
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
      const response: Booking[] = await getAllBookings();
      console.log("Respons från api:et: ", response);
      setBookings(response);
      // setIsLoading(false);
      // console.log("loading blir false: ", isLoading);

      let bookingData: Booking | undefined = bookings.find((booking) => {
        return booking.bookingId === bookingId;
      });
      if (bookingData) {
        setBookingToCancel(bookingData);
        setHtml(<div>Bokningen hittades!</div>);
        setBookingExists(true);
      } else {
        setBookingExists(false);
        setHtml(<>Bokningen hittades tyvärr inte</>);
      }
    };

    getBooking();
  }, []);

  // if (isLoading) {
  //   return <div>Laddar...</div>;
  // }

  return <>{html}</>;
};
