/**********
GET by date      
axios.get(`http://localhost:5000/api/v1/bakgarden/bookings/${datumsträng}`);

GET all     
axios.get("http://localhost:5000/api/v1/bakgarden/bookings")

POST new booking    
axios.post(http://localhost:5000/api/v1/bakgarden/bookings, bookingObj)
 **********/

import axios, { AxiosResponse } from "axios";
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

export const deleteBookingById = async (id: string): Promise<AxiosResponse> => {
  let response = await axios.delete(
    `http://localhost:5000/api/v1/bakgarden/bookings/${id}`
  );
  return response;
};

export const getBookingById = async (id: string): Promise<Booking> => {
  let response = await axios.get(
    `http://localhost:5000/api/v1/bakgarden/bookings/${id}`
  );
  return response.data;
};
