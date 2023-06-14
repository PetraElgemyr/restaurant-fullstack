import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { User } from "../models/User";
import { BookingDispatchContext } from "../contexts/BookingDispatchContext";
import { ActionTypeCurrentBooking } from "../reducers/CurrentBookingReducer";
import { CurrentBookingContext } from "../contexts/BookingsContext";
import { useNavigate } from "react-router-dom";
import { addNewBooking } from "../serivces/BookingServices";
import { Booking } from "../models/Booking";
import { StyledForm, Input } from "./styled/Forms";
import { BackButton, Button, GdprButton } from "./styled/Buttons";
import {
  InputWrapperRow,
  TopMarginWrapper,
  WrapperColumn,
} from "./styled/Wrappers";
import { FormBookingParagraph, FormInfoSpan, StyledSpan } from "./styled/Texts";
import { CheckBox } from "./Checkbox";
import {
  ContactContainer,
  ContactInfoContainer,
} from "./styled/ContactContainer";
import { ImageContainer } from "./styled/Containers";
import { GuestWrapper } from "./styled/GuestBox";

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
    <ContactContainer>
      <ImageContainer img={"src/assets/plate-figgs.jpg"}>
        <img />
      </ImageContainer>
      <ContactInfoContainer>
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
                {/* <CheckboxInput type="checkbox" required />{" "} */}
                <CheckBox></CheckBox>
                <StyledSpan>
                  {" "}
                  Godkänn sparande av personuppgifter. *Nödvändigt för att
                  fortsätta
                </StyledSpan>
              </InputWrapperRow>
              <GdprButton type="button" onClick={() => showGdprPage()}>
                Läs mer
              </GdprButton>{" "}
            </WrapperColumn>
            <Button>Slutför bokning!</Button>
          </StyledForm>
          {/* endast för att checka att contextet förändras efter inputstatet */}
          <FormInfoSpan>Namn: {currentUser.name}</FormInfoSpan>
          <FormInfoSpan>Mejl: {currentUser.email}</FormInfoSpan>
          <FormInfoSpan>Mobilnr: {currentUser.phonenumber}</FormInfoSpan>
          <FormInfoSpan>
            Antalet gäster: {context.numberOfGuests} st
          </FormInfoSpan>
        </TopMarginWrapper>{" "}
      </ContactInfoContainer>
    </ContactContainer>
  );
};
