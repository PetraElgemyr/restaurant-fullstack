import { IBookingsContext } from "../contexts/BookingsContext";
import { Booking } from "../models/Booking";

export interface IAction {
  type: string;
  payload: string /*Glöm ej att stringifya alla payloads som vi skickar med dispatch-anropet. Alla ska va samma datatyp.
    Glöm ej att parsa payload från string till json när vi tar emot och ska använda payload i vår reducer */;
}

export const BookingsReducer = (
  bookingState: IBookingsContext,
  action: IAction
): IBookingsContext => {
  switch (action.type) {
    case "getBookingsForDate": {
      //tar emot datumsträng som payload från react calendar.
      //gör apianrop till databasen, med datumet, få tillbaka ett objekt med antal bokade bord sittning 1 och 2. {first: number, second: number}
      //return { obj }
    }

    case "added": {
      //Ta emot antalet gäster
      //Få datum från kalender
      //Se vilka bokningsobjekt vars "date" är det valda datumet
      //Kolla på sittning 1 och 2 det datumet om det är 15 bokade bord eller om det finns lediga.
      //(gör loop och if(sitting===1) addera booking.bookedTables och samma för sitting=2 för den dagen)???
      //Visa tillgänglig sittning ledig det datumet
      //Ta emot vilken sittning, 1 eller 2
      //Ta emot namn, mejl, mobilnr från payload till nytt User-objekt.
      //Skapa ett nytt bokningsobjeket
      //Lägg till objektet i listan med bokningar
    }

    //Payload är ett id, hitta id på bokning och ta bort från lista med bokningar
    case "deleted": {
      break;
    }

    default:
      break;
  }

  return bookingState;
};
