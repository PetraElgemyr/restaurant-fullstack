import { useEffect, useReducer } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./Router";
import { BookingsReducer } from "./reducers/BookingsReducer";
import { BookingDispatchContext } from "./contexts/BookingDispatchContext";
import { BookingsContext } from "./contexts/BookingsContext";
import { defaultBooking } from "./models/Booking";

function App() {
  useEffect(() => {
    //hämta alla bokningar
  }, []);

  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
