import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { BookingComponent } from "./BookingComponent";
import { getBookingsByDate } from "../serivces/BookingServices";
import { Booking } from "../models/Booking";

export const Admin = () => {
  const isAdmin = true;
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [bookingsAtDate, setBookingsAtDate] = useState<Booking[]>([]);
  const [firstSittingBookings, setFirstSittingBookings] = useState<Booking[]>(
    []
  );
  const [secondSittingBookings, setSecondSittingBookings] = useState<Booking[]>(
    []
  );

  const convertDateToString = (day: Date) => {
    let month: string = (day.getMonth() + 1).toString();
    let dateDay: string = day.getDate().toString();
    if (month.length === 1) {
      month = "0" + month;
    }
    if (dateDay.length === 1) {
      dateDay = "0" + dateDay;
    }
    let chosenDate = day.getFullYear().toString() + month + dateDay;
    return chosenDate;
  };

  const handleDateClick = async (day: Date) => {
    let date: string = convertDateToString(day);
    setSelectedDate(date);
    if (date !== "") {
      console.log("Hämta bokningar för datum:", date);
      const bookingsFromApi = await getBookingsByDate(date);
      setBookingsAtDate(bookingsFromApi);
      divideBookingsBySitting();
    } else {
      console.log("Inget datum valt");
    }
  };

  const divideBookingsBySitting = () => {
    bookingsAtDate.map((booking) => {
      if (booking.sitting === 1) {
        setFirstSittingBookings([...firstSittingBookings, booking]);
      }
      if (booking.sitting === 2) {
        setSecondSittingBookings([...secondSittingBookings, booking]);
      }
    });
  };

  console.log("Bokningar på datumet: ", selectedDate, bookingsAtDate);

  return (
    <div>
      <h2>Välj datum för att se bokningar</h2>
      <Calendar onClickDay={(day) => handleDateClick(day)} />
      <div>
        <h6>Bokningar för datumet {selectedDate}</h6>
        <div>
          <p>Sittning 1</p>
          {bookingsAtDate.map((booking, index) => {
            if (booking.sitting === 1) {
              return (
                <div key={index}>
                  <p>{booking.user.name}</p>
                  <span>{booking.user.email}</span>
                  <span>{booking.numberOfGuests} st gäster</span>
                </div>
              );
            }
          })}
        </div>
        <div>
          <p>Sittning 2</p>
          {bookingsAtDate.map((booking, index) => {
            if (booking.sitting === 2) {
              return (
                <div key={index}>
                  <p>{booking.user.name}</p>
                  <span>{booking.user.email}</span>
                  <span>{booking.numberOfGuests} st gäster</span>
                </div>
              );
            }
          })}
        </div>
      </div>
      <BookingComponent isAdmin={isAdmin}></BookingComponent>
    </div>
  );
};
