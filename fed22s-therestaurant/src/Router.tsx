import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./components/Home";
import { Booking } from "./components/Booking";
import Contact from "./components/Contact";
import Confirmation from "./components/Confirmation";
import Admin from "./components/Admin";

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
        element: <Booking></Booking>,
      },
      {
        path: "/contact",
        element: <Contact></Contact>,
      },
      {
        path: "/confirmation",
        element: <Confirmation></Confirmation>,
      },
      {
        path: "/admin",
        element: <Admin></Admin>,
      },
    ],
  },
]);
