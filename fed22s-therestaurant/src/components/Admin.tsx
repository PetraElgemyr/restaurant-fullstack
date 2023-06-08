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
    if (selectedDate !== "") {
      console.log("Hämta bokningar för datum:", selectedDate);
      getDataFromApi(date);
    } else {
      console.log("Inget datum valt");
      setHtml(<></>);
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

    // setHtml(
    //   <>
    //     <h5>Bokningar för datum: {selectedDate}</h5>
    //     <div>
    //       <p>Sittning 1: 18:00-20:00</p>
    //       {bookingsAtDate.map((booking, index) => {
    //         if (booking.sitting === 1) {
    //           return (
    //             <div key={index}>
    //               <p>{booking.user.name}</p>
    //               <span>{booking.user.email}</span>
    //               <span>{booking.numberOfGuests} st gäster</span>
    //             </div>
    //           );
    //         }
    //       })}
    //     </div>
    //     <div>
    //       <p>Sittning 2: 20:00-22:00</p>
    //       {bookingsAtDate.map((booking, index) => {
    //         if (booking.sitting === 2) {
    //           return (
    //             <div key={index}>
    //               <p>{booking.user.name}</p>
    //               <span>{booking.user.email}</span>
    //               <span>{booking.numberOfGuests} st gäster</span>
    //             </div>
    //           );
    //         }
    //       })}
    //     </div>
    //   </>
    // );
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
          {firstSittingBookings.map((booking, index) => (
            <div key={index}>
              <p>
                Namn: {booking.user.name}, antal gäster:{" "}
                {booking.numberOfGuests} st{" "}
              </p>
            </div>
          ))}
        </div>
        <div>
          <p>Sittning 2</p>
          {secondSittingBookings.map((booking, index) => (
            <div key={index}>
              <p>
                Namn: {booking.user.name}, antal gäster:{" "}
                {booking.numberOfGuests} st{" "}
              </p>
            </div>
          ))}
        </div>
      </div>
      <BookingComponent isAdmin={isAdmin}></BookingComponent>
    </div>
  );
};
