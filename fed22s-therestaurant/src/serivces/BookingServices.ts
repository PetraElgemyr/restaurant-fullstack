/**********
GET by date      
axios.get(`http://localhost:5000/api/v1/bakgarden/bookings/${datumsträng}`);

GET all     
axios.get("http://localhost:5000/api/v1/bakgarden/bookings")

POST new booking    
axios.post(http://localhost:5000/api/v1/bakgarden/bookings, bookingObj)
 **********/

import axios from "axios";
import { Booking, IBooking } from "../models/Booking";

export const getBookingsByDate = async (date: string): Promise<IBooking[]> => {
  let url = `http://localhost:5000/api/v1/bakgarden/bookings/${date}`;

  try {
    // console.log("Datumet med api:t", date);
    // console.log("Url:n för anropet: ", url);

    return axios.get(url).then((response) => response.data);
  } catch (error) {
    console.log(error);
    return [];
  }
};
