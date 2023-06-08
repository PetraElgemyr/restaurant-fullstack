import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { BookingComponent } from "./BookingComponent";
import { getBookingsByDate } from "../serivces/BookingServices";
import { Booking } from "../models/Booking";

export const Admin = () => {
  const isAdmin = true;
  // const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [bookingsAtDate, setBookingsAtDate] = useState<Booking[]>([]);
  const [html, setHtml] = useState<JSX.Element>(<></>);
  // const dateSelect = (date: Date | Date[]) => {
  //   if (Array.isArray(date)) {
  //     // Hantera flera datumval om det behövs
  //     setSelectedDate(date[0]);
  //   } else {
  //     setSelectedDate(date);
  //   }
  // };

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

  const getDataFromApi = async () => {
    const bookingsFromApi = await getBookingsByDate(selectedDate);
    setBookingsAtDate(bookingsFromApi);
  };

  const handleDateClick = (day: Date) => {
    let date: string = convertDateToString(day);
    setSelectedDate(date);
  };

  const viewBookings = () => {
    // Implementera logiken för att hämta bokningar för den valda datumen från backenden
    if (selectedDate !== "") {
      console.log("Hämta bokningar för datum:", selectedDate);
      getDataFromApi();

      // Anropa backenden eller utför andra åtgärder baserat på vald datum
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
      {bookingsAtDate.map((booking, index) => {
        return (
          <div key={index}>
            <span>{booking.date}</span>
            <span>{booking.user.name}</span>
          </div>
        );
      })}
      <BookingComponent isAdmin={isAdmin}></BookingComponent>
    </div>
  );
};
