import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { BookingDispatchContext } from "../contexts/BookingDispatchContext";
import { ActionTypeCurrentBooking } from "../reducers/CurrentBookingReducer";
import { CurrentBookingContext } from "../contexts/BookingsContext";
import { Button } from "./styled/Buttons";
import { Form } from "react-router-dom";
import { Input } from "./styled/Forms";
import { GuestBox, GuestBoxWrapper, GuestWrapper } from "./styled/GuestBox";

export interface IChooseGuests {
  goToCalendar: () => void;
  isAdmin: boolean;
}

export interface IGuest {
  guests: number;
  selected: boolean;
}
export const BookGuests = ({ goToCalendar, isAdmin }: IChooseGuests) => {
  // const numberOfGuests = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const [numberOfGuests, setNumberOfGuests] = useState<IGuest[]>([
    { guests: 1, selected: false },
    { guests: 2, selected: false },
    { guests: 3, selected: false },
    { guests: 4, selected: false },
    { guests: 5, selected: false },
    { guests: 6, selected: false },
    { guests: 7, selected: false },
    { guests: 8, selected: false },
    { guests: 9, selected: false },
    { guests: 10, selected: false },
    { guests: 11, selected: false },
    { guests: 12, selected: false },
  ]);

  const currentBooking = useContext(CurrentBookingContext);
  const dispatch = useContext(BookingDispatchContext);
  const [html, setHtml] = useState<JSX.Element>(<></>);
  const [guestsString, setGuestsString] = useState("");
  const [boxHtml, setBoxHtml] = useState<JSX.Element>(<></>);

  const handleClick = (guests: number) => {
    const updatedGuests = numberOfGuests.map((guest) => {
      if (guest.guests === guests) {
        return {
          ...guest,
          selected: true,
        };
      } else {
        return {
          ...guest,
          selected: false,
        };
      }
    });

    setNumberOfGuests(updatedGuests);

    dispatch({
      type: ActionTypeCurrentBooking.SET_NUMBER_OF_GUESTS,
      payload: guests,
    });

    let tables = guests / 6 + 0.4;
    tables = Math.round(tables);

    dispatch({
      type: ActionTypeCurrentBooking.SET_BOOKED_TABLES,
      payload: tables,
    });

    console.log("Antal bord ", tables);

    setHtml(<></>);
  };

  const checkNumberOfGuests = () => {
    if (currentBooking.numberOfGuests === 0 || guestsString === "0") {
      setHtml(<div>Du måste välja antalet gäster innan du går vidare</div>);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.type === "text") {
      setGuestsString(e.target.value);

      if (e.target.value === "" || e.target.value === "0") {
        setHtml(<div>Du måste välja antalet gäster innan du går vidare</div>);
      }
    }
  };

  const handleSubmit = (e: FormEvent) => {
    const guests = parseInt(guestsString);

    dispatch({
      type: ActionTypeCurrentBooking.SET_NUMBER_OF_GUESTS,
      payload: guests,
    });

    let tables = guests / 6 + 0.4;
    tables = Math.round(tables);

    dispatch({
      type: ActionTypeCurrentBooking.SET_BOOKED_TABLES,
      payload: tables,
    });

    console.log(tables);
    currentBooking.bookingId = JSON.stringify(new Date().getTime());
    goToCalendar();
  };

  if (!isAdmin) {
    return (
      <>
        <GuestWrapper>
          <p>Välj antalet gäster</p>
          <GuestBoxWrapper>
            {numberOfGuests.map((guest) => (
              <GuestBox
                selected={guest.selected}
                key={guest.guests}
                onClick={() => {
                  handleClick(guest.guests);

                  console.log(numberOfGuests);
                }}
              >
                {guest.guests}
              </GuestBox>
            ))}{" "}
          </GuestBoxWrapper>
          <Button
            type="button"
            onClick={() => {
              if (currentBooking.numberOfGuests !== 0) {
                goToCalendar();
              } else {
                checkNumberOfGuests();
              }
            }}
          >
            Nästa
          </Button>
          {html}
          <Button disabled={!isAdmin}>Is Admin</Button>
        </GuestWrapper>
      </>
    );
  } else {
    return (
      <>
        <div>
          <p>Här väljer du antalet gäster</p>
          <Form
            onSubmit={(e: FormEvent) => {
              e.preventDefault();
              if (currentBooking.numberOfGuests !== 0 || guestsString !== "0") {
                handleSubmit(e);
              } else {
                checkNumberOfGuests();
              }
            }}
          >
            <Input
              type="text"
              value={guestsString}
              onChange={handleChange}
              required
            />
            <Button>Nästa</Button>
          </Form>

          {html}
          <Button disabled={!isAdmin}>Is Admin</Button>
        </div>
      </>
    );
  }
};
