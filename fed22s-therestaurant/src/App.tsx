import { useEffect, useReducer } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./Router";
import { BookingContext } from "./contexts/BookingContext";
import { BookingsReducer } from "./reducers/BookingsReducer";
import { BookingDispatchContext } from "./contexts/BookingDispatchContext";

function App() {
  const [bookings, dispatch] = useReducer(BookingsReducer, []);

  useEffect(() => {
    //hämta alla bokningar
  }, []);

  return (
    <>
      <BookingContext.Provider value={bookings}>
        <BookingDispatchContext.Provider value={dispatch}>
          <RouterProvider router={router}></RouterProvider>
        </BookingDispatchContext.Provider>
      </BookingContext.Provider>
    </>
  );
}

export default App;
