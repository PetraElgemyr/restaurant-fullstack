import { ChangeEvent, useContext, useState } from "react";
import { BookingsContext } from "../contexts/BookingsContext";
import { User, defaultUser } from "../models/User";

interface IBookingFormProps {
  goToCalendar: () => void;
}

export const BookingForm = ({ goToCalendar }: IBookingFormProps) => {
  const context = useContext(BookingsContext);
  //context.currentBooking
  const [currentUser, setCurrentUser] = useState<User>(
    context.currentBooking.user
  );
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const propertyName = e.target.name;
    if (e.target.type === "text") {
      setCurrentUser({ ...currentUser, [propertyName]: e.target.value });
    }
  };

  const handleSubmit = () => {};

  return (
    <>
      <button type="button" onClick={() => goToCalendar()}>
        Tillbaka
      </button>
      <p>
        Du har valt att boka bord för{" "}
        {context.currentBooking.user.numberOfGuests} pers den {"DATUM"}
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
          placeholder="Email"
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
    </>
  );
};
