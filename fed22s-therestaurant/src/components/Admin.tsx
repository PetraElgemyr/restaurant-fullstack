import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { BookingComponent } from "./BookingComponent";
import {
  deleteBookingById,
  getBookingsByDate,
} from "../serivces/BookingServices";
import { Booking } from "../models/Booking";
import { useConvertDateToString } from "../hooks/useConvertDateToString";
import { Button } from "./styled/Buttons";
import {
  AdminChangeWrapper,
  AdminTextWrapper,
  BottomMarginWrapper,
  ColToRowWrapper,
  TopMarginWrapper,
  WrapperColumn,
} from "./styled/Wrappers";
import { StyledParagraph } from "./styled/Texts";
import { ChangeBooking } from "./ChangeBooking";

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

  const handleAddBookingClick = () => {
    setCreateNewBooking(true);
  };

  const handleDeleteClick = async (bookingId: string) => {
    await deleteBookingById(bookingId);
    const bookingsFromApi = await getBookingsByDate(selectedDate);
    setBookingsAtDate(bookingsFromApi);
  };

  if (!createNewBooking) {
    return (
      <BottomMarginWrapper>
        <TopMarginWrapper>
          <Button onClick={handleAddBookingClick}>Lägg till ny bokning</Button>
          <ColToRowWrapper>
            <WrapperColumn>
              <h2>Välj datum för att se bokningar</h2>
              <Calendar onClickDay={(day) => handleDateClick(day)} />
            </WrapperColumn>
            <AdminTextWrapper>
              <StyledParagraph>
                För att se bokningarna, välj datum i kalendern.
              </StyledParagraph>
              <StyledParagraph>
                För att ta bort en bokning, tryck på ta bort.
              </StyledParagraph>
              <StyledParagraph>
                För att skapa en ny bokning, tryck på lägg till en bokning och
                följ instruktionerna.
              </StyledParagraph>
              <StyledParagraph>
                PS. Glöm inte att säga till kockarna om en större bokning görs.
              </StyledParagraph>
            </AdminTextWrapper>
          </ColToRowWrapper>

          <WrapperColumn>
            <h4>Bokningar för datumet {selectedDate}</h4>
            <ColToRowWrapper>
              <AdminChangeWrapper>
                <p>Sittning 1</p>
                {bookingsAtDate.map((booking) => {
                  if (booking.sitting === 1) {
                    return (
                      <ChangeBooking
                        key={booking.bookingId}
                        booking={booking}
                        handleDeleteClick={handleDeleteClick}
                      ></ChangeBooking>
                    );
                  }
                })}
              </AdminChangeWrapper>

              <AdminChangeWrapper>
                <p>Sittning 2</p>
                {bookingsAtDate.map((booking) => {
                  if (booking.sitting === 2) {
                    return (
                      <ChangeBooking
                        key={booking.bookingId}
                        booking={booking}
                        handleDeleteClick={handleDeleteClick}
                      ></ChangeBooking>
                    );
                  }
                })}
              </AdminChangeWrapper>
            </ColToRowWrapper>
          </WrapperColumn>
        </TopMarginWrapper>
      </BottomMarginWrapper>
    );
  } else {
    return (
      <>
        <BookingComponent isAdmin={isAdmin}></BookingComponent>
      </>
    );
  }
};
