import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { BookingComponent } from "./BookingComponent";
import { getBookingsByDate } from "../serivces/BookingServices";
import { Booking } from "../models/Booking";
import { useConvertDateToString } from "../hooks/useConvertDateToString";
import { ChangeBooking } from "./changeBooking";

export const Admin = () => {
  const isAdmin = true;
  const [createNewBooking, setCreateNewBooking] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [bookingsAtDate, setBookingsAtDate] = useState<Booking[]>([]);

  const handleDateClick = async (day: Date) => {
    let date: string = useConvertDateToString(day);
    setSelectedDate(date);
    if (date !== "") {
      console.log("Hämta bokningar för datum:", date);
      const bookingsFromApi = await getBookingsByDate(date);
      setBookingsAtDate(bookingsFromApi);
    } else {
      console.log("Inget datum valt");
    }
  };

  console.log("Bokningar på datumet: ", selectedDate, bookingsAtDate);

  const handleClick = () => {
    setCreateNewBooking(true);
  };
  if (!createNewBooking) {
    return (
      <>
        <div>
          <button onClick={handleClick}>Lägg till ny bokning</button>
          <h2>Välj datum för att se bokningar</h2>
          <Calendar onClickDay={(day) => handleDateClick(day)} />
          <div>
            <h6>Bokningar för datumet {selectedDate}</h6>

            <div>
              <p>Sittning 1</p>
              {bookingsAtDate.map((booking) => {
                if (booking.sitting === 1) {
                  return (
                    <ChangeBooking
                      key={booking.bookingId}
                      booking={booking}
                    ></ChangeBooking>
                  );
                }
              })}
            </div>

            <div>
              <p>Sittning 2</p>
              {bookingsAtDate.map((booking) => {
                if (booking.sitting === 2) {
                  return (
                    <ChangeBooking
                      key={booking.bookingId}
                      booking={booking}
                    ></ChangeBooking>
                  );
                }
              })}
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <BookingComponent isAdmin={isAdmin}></BookingComponent>
      </>
    );
  }
};
