import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./components/Home";
import Contact from "./components/Contact";
import Confirmation from "./components/Confirmation";
import { BookingComponent } from "./components/BookingComponent";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/booking",
        element: <BookingComponent></BookingComponent>,
      },
      {
        path: "/contact",
        element: <Contact></Contact>,
      },
      {
        path: "/confirmation",
        element: <Confirmation></Confirmation>,
      },
    ],
  },
]);
