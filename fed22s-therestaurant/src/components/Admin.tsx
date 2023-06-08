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
  const [html, setHtml] = useState<JSX.Element>(<></>);

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

  const getDataFromApi = async (chosenDate: string) => {
    const bookingsFromApi = await getBookingsByDate(chosenDate);
    setBookingsAtDate(bookingsFromApi);
    divideBookingsBySitting();
  };

  const handleDateClick = (day: Date) => {
    let date: string = convertDateToString(day);
    setSelectedDate(date);
  };

  const divideBookingsBySitting = () => {
    bookingsAtDate.map((booking) => {
      if (booking.sitting === 1) {
        return setFirstSittingBookings([...firstSittingBookings, booking]);
      }
      if (booking.sitting === 2) {
        return setSecondSittingBookings([...secondSittingBookings, booking]);
      }
    });

    setHtml(
      <>
        <h5>Bokningar för datum: {selectedDate}</h5>
        <div>
          <p>Sittning 1: 18:00-20:00</p>
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
          <p>Sittning 2: 20:00-22:00</p>
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
      </>
    );
  };

  const viewBookings = () => {
    // Implementera logiken för att hämta bokningar för den valda datumen från backenden
    if (selectedDate !== "") {
      console.log("Hämta bokningar för datum:", selectedDate);
      getDataFromApi(selectedDate);
    } else {
      console.log("Inget datum valt");
      setHtml(<></>);
    }
  };

  console.log("Bokningar på datumet: ", selectedDate, bookingsAtDate);

  return (
    <div>
      <h2>Välj datum för att se bokningar</h2>
      <Calendar onClickDay={(day) => handleDateClick(day)} />
      <button onClick={() => viewBookings()}>Visa bokningar</button>
      {html}
      <BookingComponent isAdmin={isAdmin}></BookingComponent>
    </div>
  );
};
