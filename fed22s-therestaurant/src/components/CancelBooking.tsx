import { Link, useParams } from "react-router-dom";
import { deleteBookingById, getAllBookings } from "../serivces/BookingServices";
import { useEffect, useState } from "react";
import { Booking } from "../models/Booking";
import { Button } from "./styled/Buttons";
import { Span } from "./styled/Span";
import { useConvertDateToISO8601 } from "../hooks/useConvertDateToISO8601";
import { H2 } from "./styled/Headings";
import { Container } from "./styled/Containers";
import { Loader } from "./Loader";

export const CancelBooking = () => {
  const { bookingId } = useParams<string>();
  const [booking, setBooking] = useState<Booking>();
  const [isLoading, setLoading] = useState(true);

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
      });
      console.log(bookingExists);
      setBooking(bookingExists);

      setTimeout(() => {
        setLoading(false);
      }, 100);
    };

    getBooking();
  }, []);

  if (isLoading) {
    return (
      <div></div>
    )
  }
  if(booking) {
      return (
        <>
          <Container>
          <H2>Avbokning</H2>
          <Span>Bokningsnummer: {booking.bookingId}</Span>
          </Container>
          <Span>Namn: {booking.user.name}</Span>
          <Span>Datum: {useConvertDateToISO8601(booking.date)}</Span>
          <Span>Sittning: {booking.sitting}</Span>
          <Span>Antal personer: {booking.numberOfGuests}</Span>
          
          <p>Är du säker på att du vill avboka din bokning?</p>

          <Link to="/cancel/confirmation">
            <Button type="button" onClick={handleDeleteClick}>
              Avboka
            </Button>
          </Link>
        </>
      )
  } else {
    return (
      <>
      <h4>Ojdå! Bokningen kunde inte hittas.</h4>
      <p>
        Vi ser inte att er bokning finns i vårt system. Vänligen kontakta
        oss vid frågor.
      </p>
      <span>Vänliga hälsningar, Bakgården</span>
    </>
    )
  }
}
