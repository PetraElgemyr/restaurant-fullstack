import { ChangeEvent, FormEvent, useState } from "react";
import { Booking } from "../models/Booking";
import Calendar from "react-calendar";
import { useConvertDateToString } from "../hooks/useConvertDateToString";
import { getBookingsByDate, updateBookingById } from "../serivces/BookingServices";
import { ISittings } from "./CalendarPage";
import { useConvertDateToISO8601 } from "../hooks/useConvertDateToISO8601";

interface IChangeBooking {
    booking: Booking
}

export const ChangeBooking = ({booking}: IChangeBooking) => {
    const [show, setShow] = useState(false);
    const [currentBooking, setCurrentBooking] = useState({...booking});
    const [selectedDate, setSelectedDate] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [bookingComplete, setBookingComplete] = useState(true);
    const [firstSitting, setFirstSitting] = useState<ISittings>({
        sitting: 1,
        bookedTables: 0,
        availabel: false,
      });
      const [secondSitting, setSecondSitting] = useState<ISittings>({
        sitting: 2,
        bookedTables: 0,
        availabel: false,
      });


    const handleShowFullView = () => {   
        setShow(!show);
        setSubmitted(false);
    }

    const handleChangeBooking = (e: ChangeEvent<HTMLInputElement>) => {
        const propertyName = e.target.name;
        
        if (e.target.type === "number") {
            const guests = e.target.valueAsNumber;

            let tables = (guests / 6) + 0.4;
            tables = Math.round(tables);
            
            setCurrentBooking({...currentBooking,[propertyName]: e.target.value, date: "", bookedTables: tables, sitting: 0});
            setFirstSitting({...firstSitting, availabel: false});
            setSecondSitting({...secondSitting, availabel: false})
        }  
    }


    const handleChangeUser = (e: ChangeEvent<HTMLInputElement>) => {
        const propertyName = e.target.name;

        if (e.target.type === "text") {
            setCurrentBooking({...currentBooking, user: {...currentBooking.user, [propertyName]: e.target.value}});
        }

        if (e.target.type === "email") {
            setCurrentBooking({...currentBooking, user: {...currentBooking.user, [propertyName]: e.target.value}});
        }

        if (e.target.type === "number") {
            setCurrentBooking({...currentBooking, user: {...currentBooking.user, [propertyName]: e.target.value.toString()}});
        }
    }

    const handleClickDate = (day: Date) => { 
        
        getBookingsOnDate(day);
    }


    const getBookingsOnDate = (day: Date) => {
        const date = useConvertDateToString(day);
        setSelectedDate(date);
    
        const getData = async () => {
          const bookingsFromApi = await getBookingsByDate(date);
          countAvaibleTables(bookingsFromApi);
        };
    
        getData();
    }
 
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
              currentBooking.bookedTables <= (15 - bookedTablesFirstSitting)
                ? true
                : false,
          });
          setSecondSitting({
            ...secondSitting,
            bookedTables: bookedTablesSecondSitting,
            availabel:
              currentBooking.bookedTables <= (15 - bookedTablesSecondSitting)
                ? true
                : false,
          });
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!currentBooking.sitting || !currentBooking.date) {
            setBookingComplete(false)
            return
        } 
        try {
            await updateBookingById(currentBooking);
        } catch (err) {
            console.log(err);
        }
        setSubmitted(true);
        setBookingComplete(true);
    }
    console.log(currentBooking)

    if (show) {
        return (
            <div>

                <button onClick={handleShowFullView}>Minimera</button>
                <div>{submitted? "Bokning är uppdaterad!" : ""}</div>
                <Calendar onClickDay={(day) => {handleClickDate(day);}}></Calendar>
                    <button
                        disabled={!firstSitting.availabel || submitted}
                        onClick={() => {setCurrentBooking({...currentBooking, sitting: 1, date: selectedDate})}}
                    >
                        Kl. 18:00 - 20:00
                    </button>

                    <button
                        disabled={!secondSitting.availabel || submitted}
                        onClick={() => {setCurrentBooking({...currentBooking, sitting: 2, date: selectedDate})}}
                    >
                        Kl. 20:00 - 22:00
                    </button>
                    <div>Datum: {currentBooking.date ? useConvertDateToISO8601(currentBooking.date) :  "Välj sittning för att se valt datum"}</div>
                    <div>Sittning: {currentBooking.sitting === 0 ? "Välj en sittning" : currentBooking.sitting}</div>

                <form onSubmit={handleSubmit}>
                        <label htmlFor="guests">Antal gäster</label>
                        <input
                            id="guests"
                            type="number"
                            placeholder=""
                            name="numberOfGuests"
                            onChange={handleChangeBooking}
                            value={currentBooking.numberOfGuests}
                            required
                            disabled={submitted}
                        />
                        <label htmlFor="username">Namn:</label>
                        <input
                            id="username"
                            type="text"
                            placeholder="Namn"
                            name="name"
                            onChange={handleChangeUser}
                            value={currentBooking.user.name}
                            required
                            disabled={submitted}
                        />
                        <label htmlFor="email">Mail:</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Mejl"
                            name="email"
                            onChange={handleChangeUser}
                            value={currentBooking.user.email}
                            required
                            disabled={submitted}
                        />
                        <label htmlFor="phonenumber">Telefonnummer:</label>
                        <input
                            id="phonenumber"
                            type="number"
                            placeholder="Mobilnummer"
                            name="phonenumber"
                            onChange={handleChangeUser}
                            value={currentBooking.user.phonenumber}
                            required
                            disabled={submitted}
                        />
                    <span>{bookingComplete? "" : "Vänligen fyll i alla fält och välj önskad sittning"}</span>
                    <button onClick={() => {setCurrentBooking(booking)}} disabled={submitted}>Ångra</button>
                    <button onSubmit={handleSubmit} disabled={submitted}>Spara</button>
                </form>

            </div>
        )
    } else {
        return (
           <div>
                <button onClick={handleShowFullView}>Ändra</button>
                <span>{booking.user.name}</span>
                <span>{booking.numberOfGuests}</span> 
                <button>Ta bort</button> 
           </div>
        )
    }
}


