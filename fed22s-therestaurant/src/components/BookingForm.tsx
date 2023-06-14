import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { User } from "../models/User";
import { BookingDispatchContext } from "../contexts/BookingDispatchContext";
import { ActionTypeCurrentBooking } from "../reducers/CurrentBookingReducer";
import { CurrentBookingContext } from "../contexts/BookingsContext";
import { useNavigate } from "react-router-dom";
import { addNewBooking } from "../serivces/BookingServices";
import { Booking } from "../models/Booking";
import { StyledForm, Input, CheckboxInput } from "./styled/Forms";
import { BackButton, Button } from "./styled/Buttons";
import {
  InputWrapperRow,
  TopMarginWrapper,
  WrapperColumn,
  WrapperRow,
} from "./styled/Wrappers";
import { FormBookingParagraph, StyledSpan } from "./styled/Texts";

interface IBookingFormProps {
  goToCalendar: () => void;
  showGdprPage: () => void;
}

export const BookingForm = ({
  goToCalendar,
  showGdprPage,
}: IBookingFormProps) => {
  const navigate = useNavigate();

  const dispatch = useContext(BookingDispatchContext);
  const context = useContext(CurrentBookingContext);
  const [currentUser, setCurrentUser] = useState<User>(context.user);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const propertyName = e.target.name;
    if (e.target.type === "text") {
      setCurrentUser({ ...currentUser, [propertyName]: e.target.value });
    }
    if (e.target.type === "email") {
      setCurrentUser({ ...currentUser, [propertyName]: e.target.value });
    }
    if (e.target.type === "number") {
      setCurrentUser({
        ...currentUser,
        [propertyName]: e.target.value.toString(),
      });
    }
    dispatch({ type: ActionTypeCurrentBooking.SET_USER, payload: currentUser });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    dispatch({ type: ActionTypeCurrentBooking.SET_USER, payload: currentUser });
    context.bookingId = JSON.stringify(new Date().getTime());
    let addedBooking: Booking = await addNewBooking(context);
    // dispatch({ type: ActionTypeCurrentBooking.ADDED, payload: context });
    console.log("Bokningen som lades till: ", addedBooking);

    navigate("/confirmation");
  };

  return (
    <TopMarginWrapper>
      <BackButton type="button" onClick={() => goToCalendar()}>
        Tillbaka
      </BackButton>
      {/* <p>
        Du har valt att boka bord för{" "}
        {context.currentBooking.user.numberOfGuests} pers den {"DATUM"}
      </p> */}
      <StyledForm onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Namn"
          name="name"
          onChange={handleChange}
          value={currentUser.name}
          required
        />
        <Input
          type="email"
          placeholder="Mejl"
          name="email"
          onChange={handleChange}
          value={currentUser.email}
          required
        />
        <Input
          type="number"
          placeholder="Mobilnummer"
          name="phonenumber"
          onChange={handleChange}
          value={currentUser.phonenumber}
          required
        />
        <WrapperColumn>
          <InputWrapperRow>
            <CheckboxInput type="checkbox" required />{" "}
            <StyledSpan>
              {" "}
              Godkänn sparande av personuppgifter. *Nödvändigt för att fortsätta
            </StyledSpan>
          </InputWrapperRow>
          <Button type="button" onClick={() => showGdprPage()}>
            Läs mer här
          </Button>{" "}
        </WrapperColumn>
        <Button>Slutför bokning!</Button>
      </StyledForm>
      {/* endast för att checka att contextet förändras efter inputstatet */}
      <FormBookingParagraph>Namn: {currentUser.name}</FormBookingParagraph>
      <FormBookingParagraph>Mejl: {currentUser.email}</FormBookingParagraph>
      <FormBookingParagraph>
        Mobilnr: {currentUser.phonenumber}
      </FormBookingParagraph>
      <FormBookingParagraph>
        Antalet gäster: {context.numberOfGuests} st
      </FormBookingParagraph>
    </TopMarginWrapper>
  );
};
