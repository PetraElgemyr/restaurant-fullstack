import { useContext, useState } from "react";
import { BookingDispatchContext } from "../contexts/BookingDispatchContext";
import Calendar from "react-calendar";
import { ActionTypeCurrentBooking } from "../reducers/CurrentBookingReducer";
import { Booking } from "../models/Booking";
import { getBookingsByDate } from "../serivces/BookingServices";
import { CurrentBookingContext } from "../contexts/BookingsContext";
import { useConvertDateToString } from "../hooks/useConvertDateToString";
import { BackButton, Button, SittingButton } from "./styled/Buttons";
import { WrapperColumn } from "./styled/Wrappers";
import "../calendar.css";
import { ContactContainer } from "./styled/ContactContainer";
import { ImageContainer } from "./styled/Containers";
import { GuestWrapper } from "./styled/GuestBox";

interface ICalendarProps {
  goToGuests: () => void;
  goToForm: () => void;
}

export interface ISittings {
  sitting: number;
  bookedTables: number;
  availabel: boolean;
}

export const CalendarPage = ({ goToGuests, goToForm }: ICalendarProps) => {
  const dispatch = useContext(BookingDispatchContext);
  const currentBooking = useContext(CurrentBookingContext);
  const [html, setHtml] = useState<JSX.Element>(<></>);
  const [firstSitting, setFirstSitting] = useState<ISittings>({
    sitting: 1,
    bookedTables: 0,
    availabel: true,
  });
  const [secondSitting, setSecondSitting] = useState<ISittings>({
    sitting: 2,
    bookedTables: 0,
    availabel: true,
  });
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedFirstSitting, setSelectedFirstSitting] = useState(false);
  const [selectedSecondSitting, setSelectedSecondSitting] = useState(false);

  const handleClick = (day: Date) => {
    const date = useConvertDateToString(day);
    setSelectedDate(date);
    setSelectedFirstSitting(false);
    setSelectedFirstSitting(false);
    const getData = async () => {
      const bookingsFromApi = await getBookingsByDate(date);
      countAvaibleTables(bookingsFromApi);
    };

    getData();
  };

  const countAvaibleTables = (bookingsOnSelectedDate: Booking[]) => {
    let bookedTablesFirstSitting = 0;
    let bookedTablesSecondSitting = 0;

    for (let i = 0; i < bookingsOnSelectedDate.length; i++) {
      const tables = bookingsOnSelectedDate[i].bookedTables;

      if (bookingsOnSelectedDate[i].sitting === 1) {
        bookedTablesFirstSitting = bookedTablesFirstSitting + tables;
      }

      if (bookingsOnSelectedDate[i].sitting === 2) {
        bookedTablesSecondSitting = bookedTablesSecondSitting + tables;
      }
    }

    setFirstSitting({
      ...firstSitting,
      bookedTables: bookedTablesFirstSitting,
      availabel:
        currentBooking.bookedTables <= 15 - bookedTablesFirstSitting
          ? true
          : false,
    });
    setSecondSitting({
      ...secondSitting,
      bookedTables: bookedTablesSecondSitting,
      availabel:
        currentBooking.bookedTables <= 15 - bookedTablesSecondSitting
          ? true
          : false,
    });
  };

  const checkCalenderValidation = () => {
    if (currentBooking.sitting === 0 || currentBooking.date === "") {
      setHtml(<div>Du måste välja ett datum samt tid!</div>);
    }
  };

  return (
    <ContactContainer>
      {" "}
      <ImageContainer img={"src/assets/plate-figgs.jpg"}>
        <img />
      </ImageContainer>
      <GuestWrapper>
        <BackButton
          type="button"
          onClick={() => {
            dispatch({ type: ActionTypeCurrentBooking.SET_DATE, payload: "" });
            dispatch({
              type: ActionTypeCurrentBooking.SET_SITTING,
              payload: 0,
            });
            goToGuests();
          }}
        >
          Tillbaka
        </BackButton>
        <Calendar
          onClickDay={(day) => {
            handleClick(day);
          }}
        ></Calendar>
        <SittingButton
          disabled={!firstSitting.availabel}
          selected={selectedFirstSitting}
          onClick={() => {
            dispatch({
              type: ActionTypeCurrentBooking.SET_SITTING,
              payload: 1,
            });
            dispatch({
              type: ActionTypeCurrentBooking.SET_DATE,
              payload: selectedDate,
            });
            setSelectedFirstSitting(true);
            setSelectedSecondSitting(false);
            console.log("Första sittingen selected");

            setHtml(<></>);
          }}
        >
          Kl. 18:00 - 20:00
        </SittingButton>

        <SittingButton
          disabled={!secondSitting.availabel}
          selected={selectedSecondSitting}
          onClick={() => {
            dispatch({
              type: ActionTypeCurrentBooking.SET_SITTING,
              payload: 2,
            });
            dispatch({
              type: ActionTypeCurrentBooking.SET_DATE,
              payload: selectedDate,
            });
            setSelectedFirstSitting(false);
            setSelectedSecondSitting(true);
            console.log("Andra sittingen selected");

            setHtml(<></>);
          }}
        >
          Kl. 20:00 - 22:00
        </SittingButton>
        <Button
          type="button"
          onClick={() => {
            if (currentBooking.date !== "" && currentBooking.sitting !== 0) {
              goToForm();
            } else {
              checkCalenderValidation();
            }
          }}
        >
          Nästa
        </Button>
        {html}
      </GuestWrapper>{" "}
    </ContactContainer>
  );
};
