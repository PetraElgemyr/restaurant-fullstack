/**********
GET by date      
axios.get(`http://localhost:5000/api/v1/bakgarden/bookings/${datumsträng}`);

GET all     
axios.get("http://localhost:5000/api/v1/bakgarden/bookings")

POST new booking    
axios.post(http://localhost:5000/api/v1/bakgarden/bookings, bookingObj)
 **********/

import axios from "axios";
import { Booking } from "../models/Booking";

export const getBookingsByDate = async (date: string): Promise<Booking[]> => {
  return await axios.get(
    `http://localhost:5000/api/v1/bakgarden/bookings/${date}`
  );
};
