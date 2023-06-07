import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { User, defaultUser } from "../models/User";
import { BookingDispatchContext } from "../contexts/BookingDispatchContext";
import { ActionTypeCurrentBooking } from "../reducers/CurrentBookingReducer";
import { CurrentBookingContext } from "../contexts/BookingsContext";
import { Link, Navigate, Outlet, useNavigate } from "react-router-dom";

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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch({ type: ActionTypeCurrentBooking.SET_USER, payload: currentUser });
    navigate("/confirmation");
  };

  return (
    <>
      <button type="button" onClick={() => goToCalendar()}>
        Tillbaka
      </button>
      {/* <p>
        Du har valt att boka bord för{" "}
        {context.currentBooking.user.numberOfGuests} pers den {"DATUM"}
      </p> */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Namn"
          name="name"
          onChange={handleChange}
          value={currentUser.name}
          required
        />
        <input
          type="email"
          placeholder="Mejl"
          name="email"
          onChange={handleChange}
          value={currentUser.email}
          required
        />
        <input
          type="number"
          placeholder="Mobilnummer"
          name="phonenumber"
          onChange={handleChange}
          value={currentUser.phonenumber}
          required
        />
        <div>
          <label>
            Godkänn sparande av personuppgifter.{" "}
            <button type="button" onClick={() => showGdprPage()}>
              Läs mer här
            </button>{" "}
            *Nödvändigt för att fortsätta
          </label>{" "}
          <input type="checkbox" required />{" "}
        </div>
        <button>Slutför bokning!</button>
      </form>
      {/* endast för att checka att contextet förändras efter inputstatet */}
      <p>Namn: {currentUser.name}</p>
      <p>Mejl: {currentUser.email}</p>
      <p>Mobilnr: {currentUser.phonenumber}</p>
      <p>Antalet gäster: {context.numberOfGuests} st</p>
    </>
  );
};
