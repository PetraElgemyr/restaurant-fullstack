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
  const res = await axios.get<Booking[]>(
    `http://localhost:5000/api/v1/bakgarden/bookings/${date}`
  );
  return res.data;
};

export const addNewBooking = async (booking: Booking): Promise<Booking> => {
  const response = await axios.post(
    "http://localhost:5000/api/v1/bakgarden/bookings/",
    booking
  );
  return response.data;
};

export const updateBookingById = async (booking: Booking): Promise<Booking> => {
  const response = await axios.put(
    `http://localhost:5000/api/v1/bakgarden/bookings/${booking.bookingId}`,
    booking
  );
    return response.data;
}
