import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { BookingComponent } from "./BookingComponent";

export const Admin = () => {
  const isAdmin = true;
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const dateSelect = (date: Date | Date[]) => {
    if (Array.isArray(date)) {
      // Hantera flera datumval om det behövs
      setSelectedDate(date[0]);
    } else {
      setSelectedDate(date);
    }
  };

  const viewBookings = () => {
    // Implementera logiken för att hämta bokningar för den valda datumen från backenden
    if (selectedDate) {
      console.log("Hämta bokningar för datum:", selectedDate);
      // Anropa backenden eller utför andra åtgärder baserat på vald datum
    } else {
      console.log("Inget datum valt");
    }
  };

  return (
    <div>
      <h2>Välj datum för att se bokningar</h2>
      <Calendar/>
      <button onClick={viewBookings}>Visa bokningar</button>
      <BookingComponent isAdmin={isAdmin}></BookingComponent>
    </div>
  );
};
