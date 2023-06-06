import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { BookingsContext } from "../contexts/BookingsContext";
import { User, defaultUser } from "../models/User";
import { BookingDispatchContext } from "../contexts/BookingDispatchContext";

interface IBookingFormProps {
  goToCalendar: () => void;
}

export const BookingForm = ({ goToCalendar }: IBookingFormProps) => {
  const context = useContext(BookingsContext);
  const dispatch = useContext(BookingDispatchContext);
  const [currentUser, setCurrentUser] = useState<User>({
    ...context.currentBooking.user,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const propertyName = e.target.name;
    if (e.target.type === "text") {
      setCurrentUser({ ...currentUser, [propertyName]: e.target.value });
    }
    context.currentBooking.user = currentUser;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    context.currentBooking.user = currentUser;
    dispatch({
      type: "added",
      payload: JSON.stringify(context.currentBooking),
    });
  };

  return (
    <>
      <button type="button" onClick={() => goToCalendar()}>
        Tillbaka
      </button>
      <p>
        Du har valt att boka bord för{" "}
        {context.currentBooking.user.numberOfGuests} pers den{" "}
        {context.currentBooking.date}
      </p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Namn"
          name="name"
          onChange={handleChange}
          value={currentUser.name}
        />
        <input
          type="text"
          placeholder="Mejl"
          name="email"
          onChange={handleChange}
          value={currentUser.email}
        />
        <input
          type="text"
          placeholder="Mobilnummer"
          name="phonenumber"
          onChange={handleChange}
          value={currentUser.phonenumber}
        />
        <button>Slutför bokning!</button>
      </form>

      {/* endast för att checka att contextet förändras efter inputstatet */}
      <p>Namn: {context.currentBooking.user.name}</p>
      <p>Mejl: {context.currentBooking.user.email}</p>
      <p>Mobilnr: {context.currentBooking.user.phonenumber}</p>
      <p>Antalet gäster: {context.currentBooking.user.numberOfGuests} st</p>
      <p>Required tables: {context.currentBooking.bookedTables}</p>
    </>
  );
};
